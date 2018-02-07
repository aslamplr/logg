import * as React from 'react';
import { observer } from 'mobx-react';
import LogStore from '../store/LogStore';
import { Timeline, Card, Avatar } from 'antd';
import { getRandColorHex } from '../utils';
import './LogList.less';

const { Item } = Timeline;

interface LogListProps {
  store: LogStore;
}

export default observer((props: LogListProps) => (
  <Timeline className="LogList">
    {props.store.SortedByLatest.map((log, i) =>
      <Item key={i}>
        <span className="LogItemTime">{log.timestamp.toLocaleString()}</span>
        <Card className="LogItemCard" hoverable={true}>
          <Card.Meta
            avatar={
              <Avatar
                style={{
                  backgroundColor: getRandColorHex(),
                  color: getRandColorHex()
                }}
              >
                {log.content.substr(0, 3).toUpperCase()}
              </Avatar>}
            description={
              <div className="LogItemContent">
                {log.content}
              </div>}
          />
        </Card>
      </Item>)}
  </Timeline>
));
