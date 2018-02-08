import { LogItem } from '../models/LogItem';
import { getFirestoreDb } from './firebase';
import { firestore } from 'firebase';

const pageLimit = 10;

let firstVisible: firebase.firestore.DocumentSnapshot;
let lastVisible: firebase.firestore.DocumentSnapshot;
const realtimeCache: string[] = [];

const getCollection = (name: string) => {
  const db = getFirestoreDb();
  return db.collection(name);
};

const executeQuery = async (query: firestore.Query, limit?: number) => {
  const latestLogs: LogItem[] = [];
  try {
    const docSnapshots = await query.limit(limit || pageLimit).get();
    if (firstVisible === undefined && docSnapshots.docs.length > 0) {
      firstVisible = docSnapshots.docs[0];
    }
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

export const getLatestLogs = async (limit?: number) => {
  return await executeQuery(getBaseQuery(), limit);
};

export const fetchMore = async (limit?: number) => {
  if (lastVisible) {
    return await executeQuery(getBaseQuery().startAfter(lastVisible), limit);
  }
  return null;
};

export const subscribeForNewLogs = (onNewLogs: (newItems: LogItem[]) => void) => {
  getBaseQuery().endBefore(firstVisible).onSnapshot((snapshot) => {
    const newItems: LogItem[] = [];
    snapshot.docChanges.forEach(change => {
      if (
        change.type === 'added' &&
        realtimeCache.indexOf(change.doc.id) === -1
      ) {
        newItems.push(change.doc.data() as LogItem);
        realtimeCache.push(change.doc.id);
      }
    });
    if (newItems.length > 0) {
      onNewLogs(newItems);
    }
  });
};
