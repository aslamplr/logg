import { observable, computed } from 'mobx';
import { LogItem } from '../models/LogItem';
import { saveLogItem, getAllLogs } from '../service/logService';

/**
 * LogStore
 */
export default class LogStore {
  @observable
  private logs: LogItem[];

  @computed
  public get Logs(): LogItem[] {
    return this.logs;
  }

  @computed
  public get Reversed(): LogItem[] {
    return this.logs.reverse();
  }

  @computed
  public get Count(): number {
    return this.logs.length;
  }

  constructor() {
    this.logs = [];
    this.getLogItems();
  }

  public async getLogItems() {
    const allLogs = await getAllLogs();
    if (allLogs) {
      allLogs.forEach((log) => this.logs.push(log));
    }
    setInterval(() => {
      this.getLogItems();
    // tslint:disable-next-line:align
    }, 900000);
  }

  public addLog = (content: string) => {
    const logItem = {
      content,
      timestamp: new Date(),
    };
    this.logs.push(logItem);
    saveLogItem(logItem);
  }
}
