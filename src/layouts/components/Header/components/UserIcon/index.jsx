import React from 'react';
import { connect } from 'dva';
import cls from 'classnames';
import { Icon, Menu, Avatar } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import ExtDropdown from '@/components/ExtDropdown';
import { userInfoOperation } from '@/utils';

import styles from './index.less';

const { getCurrentUser } = userInfoOperation;

@connect(() => ({}))
export default class UserIcon extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = getCurrentUser();
  }

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/userLogout',
    });
  };

  dropdownRender = () => {
    const menu = (
      <Menu selectedKeys={[]}>
        <Menu.Item key="logout" onClick={this.handleClick}>
          <Icon type="logout" />
          {formatMessage({ id: 'app.logout', desc: '退出' })}
        </Menu.Item>
      </Menu>
    );

    return menu;
  };

  render() {
    console.log(styles['user-icon-wrapper']);
    return (
      <ExtDropdown overlay={this.dropdownRender()}>
        <span className={cls(styles['user-icon-wrapper'], 'trigger')}>
          <Avatar icon="user" size="13" />
          <span className={cls('username')}>{this.currentUser && this.currentUser.userName}</span>
        </span>
      </ExtDropdown>
    );
  }
}
