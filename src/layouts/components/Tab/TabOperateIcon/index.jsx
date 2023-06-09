import React, { Component } from 'react';
import { Icon, Popover } from 'antd';
import PropTypes from 'prop-types';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';

class TabOperateIcon extends Component {
  static propTypes = {
    onReloadCurrent: PropTypes.func.isRequired,
    onCloseCurrent: PropTypes.func.isRequired,
    onCloseAll: PropTypes.func.isRequired,
  };

  state = {
    visible: false,
  };

  handleClick = () => {
    this.setState({ visible: false });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    const { onCloseCurrent, onCloseAll, onReloadCurrent } = this.props;
    const { visible } = this.state;
    return (
      <div className={styles['custom-tabs-operate']}>
        <Popover
          placement="bottomRight"
          visible={visible}
          content={
            <div onClick={this.handleClick}>
              <div className="operate-item" onClick={onReloadCurrent}>
                {formatMessage({ id: 'current.refresh', defaultMessage: '刷新当前' })}
              </div>
              <div className="operate-item" onClick={onCloseCurrent}>
                {formatMessage({ id: 'current.close', defaultMessage: '关闭当前' })}
              </div>
              <div className="operate-item" onClick={onCloseAll}>
                {formatMessage({ id: 'all.close', defaultMessage: '关闭所有' })}
              </div>
            </div>
          }
          trigger="click"
          overlayClassName={styles['custom-tabs-operate-popover']}
          onVisibleChange={this.handleVisibleChange}
          arrowPointAtCenter
        >
          <Icon type="down-circle" />
        </Popover>
      </div>
    );
  }
}

export default TabOperateIcon;
