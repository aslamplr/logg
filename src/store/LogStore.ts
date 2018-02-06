import { observable, computed } from 'mobx';
import { LogItem } from '../models/LogItem';

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
    }

    public addLog = (content: string) => {
        this.logs.push({
          content,
          timestamp: new Date(),
        });
    }
}
