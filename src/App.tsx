import * as React from 'react';
import LogCreator from './components/LogCreator';
import LogList from './components/LogList';
import LogStore from './store/LogStore';
import { Button } from 'antd';
import './App.less';

class App extends React.Component {
  private logStore: LogStore;
  // tslint:disable-next-line:no-any
  constructor(props: any) {
    super(props);
    this.logStore = new LogStore();
  }
  render() {
    return (
      <div className="App">
        <LogCreator onLogContent={this.logStore.addLog}/>
        <LogList store={this.logStore} />
        <div style={{ textAlign: 'center' }}>
          <Button onClick={() => this.logStore.fetchMore()}>More</Button>
        </div>
      </div>
    );
  }
}

export default App;
