import { observable, computed } from 'mobx';
import { LogItem } from '../models/LogItem';
import { saveLogItem, getLatestLogs, getLoadMore, subscribeForNewLogs } from '../service/logService';
import * as _ from 'lodash';

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
  public get SortedByLatest(): LogItem[] {
    return _.orderBy(this.logs, ['timestamp'], ['desc']);
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
    const latestLogs = await getLatestLogs();
    if (latestLogs) {
      this.logs = latestLogs;
    }
    subscribeForNewLogs((newLogs) => {
      this.logs = this.logs.concat(newLogs);
    });
  }

  public async getLoadMore() {
    const moreLogs = await getLoadMore();
    if (moreLogs) {
      this.logs = this.logs.concat(moreLogs);
    }
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
