import * as React from 'react';
import './App.css';
import LogCreator from './components/LogCreator';
import LogList from './components/LogList';
import LogStore from './store/LogStore';

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
      </div>
    );
  }
}

export default App;
