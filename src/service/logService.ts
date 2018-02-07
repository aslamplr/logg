import { LogItem } from '../models/LogItem';
import { getFirestoreDb } from './firebase';
import { firestore } from 'firebase';

const pageLimit = 10;

export const getCollection = (name: string) => {
  const db = getFirestoreDb();
  return db.collection(name);
};

export const saveLogItem = async (item: LogItem) => {
  const logs = getCollection('log');
  try {
    const resp = await logs.add(item);
    return resp.id;
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log('[E] Error saving log', error);
    return null;
  }
};

let lastVisible: firebase.firestore.DocumentSnapshot;

export const executeQuery = async (query: firestore.Query, limit?: number) => {
  const latestLogs: LogItem[] = [];
  try {
    const docSnapshots = await query.limit(limit || pageLimit).get();
    lastVisible = docSnapshots.docs[docSnapshots.docs.length - 1];
    docSnapshots.forEach((rec) => {
      latestLogs.push(rec.data() as LogItem);
    });
    return latestLogs;
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log('[E] Error fetching logs', error);
    return null;
  }
};

const getBaseQuery = () => {
  const logs = getCollection('log');
  return logs.orderBy('timestamp', 'desc');
};

export const getLatestLogs = async (limit?: number) => {
  return await executeQuery(getBaseQuery(), limit);
};

export const getLoadMore = async (limit?: number) => {
  if (lastVisible) {
    return await executeQuery(getBaseQuery().startAfter(lastVisible), limit);
  }
  return null;
};
