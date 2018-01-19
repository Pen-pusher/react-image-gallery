import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'react-toolbox';
import Style from './ShareDialog.css';

class ShareDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      isLinkCopied: false
    };
    this.actions = [
      { label: '取消', onClick: props.onCloseClick },
      { label: '複製連結', onClick: () => this.handleLinkCopy() }
    ];
    this.newAction = [
      { label: '好', onClick: props.onCloseClick }
    ];
    if (props.type === 'album') {
      this.type = '相簿';
    } else if (props.type === 'photo') {
      this.type = '照片';
    }
    this.handleLinkCopy = this.handleLinkCopy.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      this.setState({
        isLinkCopied: false
      });
    }
    this.setState({
      active: nextProps.active
    });
  }

  handleLinkCopy() {
    // run copy to clipboard function
    const textField = document.createElement('textarea');
    textField.innerText = this.props.link;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    // text is copied
    this.setState({
      isLinkCopied: true
    });
  }

  render() {
    return (
      <Dialog
        title={`分享${this.type}給別人`}
        active={this.state.active}
        actions={this.state.isLinkCopied ? this.newAction : this.actions}
        onOverlayClick={this.props.onCloseClick}
        onEscKeyDown={this.props.onCloseClick}
        theme={Style}
      >
        <p className={Style.link}>{this.props.link}</p>
        { this.state.isLinkCopied && <p className={Style.success}>此連結已複製到剪貼簿！</p> }
      </Dialog>
    );
  }
}

ShareDialog.propTypes = {
  active: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default ShareDialog;
