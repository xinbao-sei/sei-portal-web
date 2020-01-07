import React from 'react';
import { Menu, Icon } from 'antd';
import { navigateToUrl } from 'single-spa';
import { Link } from 'umi';
import cls from 'classnames';
import PropTypes from 'prop-types';
import logo from '../../../assets/logo@2x.png';
import collapsed_logo from '../../../assets/logo_notxt@2x.png';

import styles from './index.less';

const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component {

  static propTypes = {
    /** 页签打开模式 */
    mode: PropTypes.string,
  };

  static defaultProps = {
    mode: 'iframe',
  };

  constructor(props) {
    super(props);

    this.state = {
      currentSelectedKeys: [props.activedMenuKey],
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activedMenuKey } = this.props;
    if (activedMenuKey !== nextProps.activedMenuKey) {
      this.updateCurrentSelected(nextProps.activedMenuKey);
    }
  }

  handleMenuClick = (item) => {
    const { onMenuClick } = this.props;
    this.updateCurrentSelected(item.id);
    onMenuClick && onMenuClick(item);
  }

  updateCurrentSelected = (key) => {
    this.setState({
      currentSelectedKeys: [key]
    });
  }

  /** 根据页签模式获取页面 */
  getMenuNavItemByMode = (item) => {
    const { mode } = this.props;

    if (mode !== 'iframe') {
      return (
        <Link to={item.path}>
          <Icon type={item.iconType} />
          <span>{item.title}</span>
        </Link>
      );
       // aExtraProps = {
       //   href: item.path,
       //   onClick: navigateToUrl,
       // };
    }

    return (
      <a>
        <Icon type={item.iconType} />
        <span>{item.title}</span>
      </a>
    );
  }

  // 递归渲染树形菜单
  renderMenu =(data)=>{
    return data.map((item)=>{

      if(item.children) {
        let title = (
          <span>
            <Icon type={item.iconType} />
            <span>{item.title}</span>
          </span>
        );

        return (
          <SubMenu title={title} key={item.id}>
            { this.renderMenu(item.children) }
          </SubMenu>
        )
      }


      return (
        <Menu.Item
          title={item.title}
          key={item.id}
          onClick={() => { this.handleMenuClick(item)}}
        >
          {this.getMenuNavItemByMode(item)}
        </Menu.Item>
      );
    });
  }

  componentDidMount() {
    /** todo */
  }

  render() {
    const { currentSelectedKeys } = this.state;
    const { collapsed, menuConfig=[] } = this.props;

    return (
      <div className={cls({
        [styles["nav-left-wrapper"]]: true,
        [styles["nav-left-wrapper-collapsed"]]: collapsed,
      })}>
        <div className="layout-logo">
          <img src={collapsed ? collapsed_logo : logo} alt="logo"/>
        </div>
        <Menu
          selectedKeys={currentSelectedKeys}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          {this.renderMenu(menuConfig)}
        </Menu>
      </div>
    );
  }
}

export default NavLeft;
