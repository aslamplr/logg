import * as React from 'react';
import { observer } from 'mobx-react';
import LogStore from '../store/LogStore';
import { Timeline, Card, Avatar } from 'antd';
import './LogList.less';

const { Item } = Timeline;

interface P {
  store: LogStore;
}

export default observer((props: P) => (
  <Timeline className="LogList">
    {props.store.Reversed.map((log, i) =>
      <Item key={i}>
        <span className="LogItemTime">{log.timestamp.toLocaleString()}</span>
        <Card className="LogItemCard" hoverable={true}>
          <Card.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            description={<div className="LogItemContent">{log.content}</div>}
          />
        </Card>
      </Item>)}
  </Timeline>
));
