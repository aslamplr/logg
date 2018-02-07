import * as React from 'react';
import { Affix, Card, Button, Input } from 'antd';
import { isMac, isWin } from '../utils';
import './LogCreator.less';

const { TextArea } = Input;

interface LogCreatorProps {
  onLogContent: (content: string) => void;
}
interface LogCreatorState {
  content?: string;
}

export default class LogCreator extends React.Component<LogCreatorProps, LogCreatorState> {
  constructor(props: LogCreatorProps) {
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
    if ((evt.ctrlKey || evt.metaKey ) && evt.keyCode === 13) {
      this.logContent();
    }
  }

  render() {
    const shortCut = isMac() ? '(⌘+⏎)' : (isWin() ? '(Ctrl+⏎)' : '');
    return (
      <Affix>
        <Card className="LogCreator">
          <TextArea
            autoFocus={true}
            className="LogTextArea"
            value={this.state.content}
            onChange={this.onContentChange}
            onKeyDown={this.onCtrlEnter}
            placeholder={`Enter any text to log ${shortCut}`}
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
