import * as React from 'react';
import { Affix, Card, Button, Input } from 'antd';
import './LogCreator.less';

const { TextArea } = Input;

interface P {
  onLogContent: (content: string) => void;
}
interface S {
  content: string | undefined;
}

export default class LogCreator extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    content: undefined
  })

  onContentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      content: evt.currentTarget.value
    });
  }

  logContent = () => {
    const { content } = this.state;
    if (content) {
      this.props.onLogContent(content);
      this.setState(this.getInitialState());
    }
  }

  onLogContent = (evt: React.MouseEvent<HTMLButtonElement>) => {
    this.logContent();
  }

  onCtrlEnter = (evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (evt.ctrlKey && evt.keyCode === 13) {
      this.logContent();
    }
  }

  render() {
    return (
      <Affix>
        <Card className="LogCreator" bordered={false}>
          <TextArea
            autoFocus={true}
            className="LogTextArea"
            value={this.state.content}
            onChange={this.onContentChange}
            onKeyDown={this.onCtrlEnter}
            placeholder="Enter item to log (Ctrl+Enter)"
            autosize={{ minRows: 2, maxRows: 6 }}
          />
          <Button
            className="LogButton"
            onClick={this.onLogContent}
            type="primary"
          >
            Enter
          </Button>
        </Card>
      </Affix>
    );
  }
}
