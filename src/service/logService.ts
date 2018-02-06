import { LogItem } from '../models/LogItem';
import { getFirestoreDb } from './firebase';

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

export const getAllLogs = async () => {
  const allLogs: LogItem[] = [];
  const logs = getCollection('log');
  try {
    const resp = await logs.get();
    resp.forEach((rec) => {
      allLogs.push(rec.data() as LogItem);
    });
    return allLogs;
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log('[E] Error fetching logs', error);
    return null;
  }
};
