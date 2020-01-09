import React from 'react';
import cls from 'classnames';
import { router } from 'umi';
import { connect } from 'dva';
import { Icon, Menu, Avatar } from 'antd';
import FullScreen from '@/components/FullScreen';
import MenuSearch from '@/components/MenuSearch';
import HeaderDropdown from './components/HeaderDropdown';
import ExtList from './components/List';

import styles from './index.less';

class Header extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/getMenus',
    });
  }

  /** 获取个人下拉菜单项 */
  getDropdownMenus = () => {
    const { onMenuClick } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          用户
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting" />
          设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出
        </Menu.Item>
      </Menu>
    );

    return menu;
  };

  dropdownRender = () => {
    const { menu, dispatch } = this.props;
    const { modules } = menu;

    return (
      <ExtList
        dataSource={modules}
        onItemClick={item => {
          dispatch({
            type: 'menu/toggleModule',
            payload: {
              currModule: item,
            },
          });
        }}
      />
    );
  };

  handleHomeClick = () => {
    const { onHomeClick } = this.props;
    if (onHomeClick) {
      onHomeClick();
    }
  };

  render() {
    const { onCollapse, collapsed, children, menu } = this.props;
    const { currModule } = menu;

    return (
      <section className={cls(styles['header-layout'])}>
        <div
          style={{
            float: 'left',
          }}
        >
          <span
            className={cls('trigger')}
            onClick={() => {
              if (onCollapse) {
                onCollapse();
              }
            }}
          >
            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
          </span>
          <HeaderDropdown overlay={this.dropdownRender()} trigger={['click']}>
            <span className={cls('trigger')}>
              <span className="title">{currModule.name || ''}</span>
              <Icon type="caret-down" style={{ fontSize: '12px', marginLeft: '4px' }} />
            </span>
          </HeaderDropdown>
          <span className={cls('trigger')} onClick={this.handleHomeClick}>
            <Icon type="home" theme="filled" size="14" />
          </span>
        </div>
        <div className={cls('header-layout-right')}>
          <MenuSearch
            className={cls('trigger')}
            onSelect={item => {
              router.push(item.featureUrl);
            }}
          />
          <HeaderDropdown overlay={this.getDropdownMenus()}>
            <span className={`${cls('action', 'account')} ${styles.account}`}>
              <Avatar icon="user" size="13" />
              <span className={cls('username')}>张盼</span>
            </span>
          </HeaderDropdown>
          <FullScreen className={cls('trigger')} />
        </div>
        <div
          style={{
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </section>
    );
  }
}

export default connect(state => ({ menu: state.menu }))(Header);
