import React from 'react';
import { connect } from 'dva';
import cls from 'classnames';
import { get, cloneDeep } from 'lodash';
import { Icon, Menu, Avatar, Result, Button, Rate } from 'antd';
import { Space, ExtIcon } from 'suid';
import { formatMessage } from 'umi-plugin-react/locale';
import ExtDropdown from '@/components/ExtDropdown';
import { userInfoOperation, CONSTANTS } from '@/utils';
import { Driver, steps } from '../../../Guide';

import styles from './index.less';

const { NoMenuPages } = CONSTANTS;
const { getCurrentUser } = userInfoOperation;

@connect(({ user, loading }) => ({ user, loading }))
class UserIcon extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = getCurrentUser();
  }

  refreshCredit = () => {
    const { dispatch, loading, user } = this.props;
    const { enableCredit } = user;
    if (enableCredit) {
      const creditLoading = loading.effects['user/refreshCredit'];
      if (creditLoading) {
        return false;
      }
      dispatch({
        type: 'user/refreshCredit',
      });
    }
  };

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/userLogout',
    });
  };

  handleSetting = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/openTab',
      payload: {
        activedMenu: Object.assign(cloneDeep(NoMenuPages[0]), {
          title: formatMessage({ id: 'app.user.setting', defaultMessage: '个人设置' }),
        }),
      },
    });
    // .then(({ activedMenu }) => {
    //   router.push(activedMenu.url);
    // });
  };

  handlerDashboardCustom = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/openTab',
      payload: {
        activedMenu: {
          id: 'my-dashboard-home',
          title: '自定义首页',
          url: '/sei-dashboard-web/scene/myHome',
        },
      },
    });
  };

  handleGuilde = () => {
    this.guide = new Driver({
      doneBtnText: formatMessage({ id: 'app.guide.done', defaultMessage: '完成' }), // Text on the final button
      closeBtnText: formatMessage({ id: 'app.guide.close', defaultMessage: '关闭' }), // Text on the close button for this step
      nextBtnText: `${formatMessage({ id: 'app.guide.next', defaultMessage: '下一个' })} →`, // Next button text for this step
      prevBtnText: `← ${formatMessage({ id: 'app.guide.pre', defaultMessage: '上一个' })}`,
      // doneBtnText: '完成', // Text on the final button
      // closeBtnText: '关闭', // Text on the close button for this step
      // nextBtnText: '下一个 →', // Next button text for this step
      // prevBtnText: '← 上一个',
      padding: 0,
      overlayClickNext: true,
    });
    this.guide.defineSteps(steps);
    this.guide.start();
  };

  getCreditProps = () => {
    const creditProps = {};
    return creditProps;
  };

  handlerShowLog = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/updateState',
      payload: {
        showLog: true,
      },
    });
  };

  getStateProps = () => {
    const { loading } = this.props;
    const creditLoading = loading.effects['user/refreshCredit'];
    const stateProps = {
      className: 'btn-resfresh done',
      type: 'check-circle',
      tooltip: {
        title: formatMessage({ id: 'credit.loaded.tip', defaultMessage: '信用分已最新' }),
      },
    };
    if (creditLoading) {
      Object.assign(stateProps, {
        className: 'btn-resfresh',
        type: 'sync',
        spin: true,
        tooltip: {
          title: formatMessage({ id: 'credit.loaded.doing', defaultMessage: '正在更新信用...' }),
        },
      });
    } else {
      Object.assign(stateProps, { theme: 'filled' });
    }
    return stateProps;
  };

  renderUserCredit = () => {
    const {
      user: { userInfo },
    } = this.props;
    const rating = get(userInfo, 'credit.rating') || 0;
    const ratingName = get(userInfo, 'credit.ratingName') || '--';
    const score = get(userInfo, 'credit.score') || 0;
    const creditLogCount = get(userInfo, 'credit.creditLogCount') || 0;
    return (
      <Result
        icon={
          <div className="icon-box">
            <div className="rate-desc">{ratingName}</div>
            <Rate value={rating} disabled />
            <div className="tip">
              {formatMessage({ id: 'credit.tip', defaultMessage: '每一次用心 都是信用的积累' })}
            </div>
          </div>
        }
        title={formatMessage({ id: 'creditRecord.rating', defaultMessage: '信用等级' })}
        subTitle={
          <Space className="credit-box" size={42}>
            <Space direction="vertical" size={0}>
              <div className="score">{score}</div>
              <div className="title">
                {formatMessage({ id: 'creditRecord.score', defaultMessage: '信用分' })}
                <ExtIcon {...this.getStateProps()} antd />
              </div>
            </Space>
            <Space direction="vertical" size={0}>
              <div className="score">{creditLogCount}</div>
              <div className="title">
                <Button type="link" onClick={this.handlerShowLog} size="small">
                  {formatMessage({ id: 'my.credit.log', defaultMessage: '信用记录' })}
                </Button>
              </div>
            </Space>
          </Space>
        }
      />
    );
  };

  dropdownRender = () => {
    const {
      user: { enableCredit },
    } = this.props;
    const menu = (
      <Menu
        onClick={({ key }) => {
          switch (key) {
            case 'setting':
              this.handleSetting();
              break;
            case 'my-dashboard-home':
              this.handlerDashboardCustom();
              break;
            case 'user-guide':
              this.handleGuilde();
              break;
            case 'logout':
              this.handleClick();
              break;
            default:
              break;
          }
        }}
        selectedKeys={[]}
        className={cls(styles['user-menu-item'])}
      >
        {enableCredit && (
          <Menu.Item key="credit" className="credit-box">
            {this.renderUserCredit()}
          </Menu.Item>
        )}
        <Menu.Item key="setting">
          <Icon type="setting" />
          {formatMessage({ id: 'app.user.setting', defaultMessage: '个人设置' })}
        </Menu.Item>
        <Menu.Item key="my-dashboard-home">
          <Icon type="home" />
          {formatMessage({ id: 'app.dashboard.custom', desc: '自定义首页' })}
        </Menu.Item>
        <Menu.Item key="user-guide">
          <Icon type="question-circle" />
          {formatMessage({ id: 'app.user.guide.title', defaultMessage: '新手引导' })}
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />
          {formatMessage({ id: 'app.logout', desc: '退出' })}
        </Menu.Item>
      </Menu>
    );
    return menu;
  };

  render() {
    return (
      <ExtDropdown overlay={this.dropdownRender()} trigger={['click']} onShow={this.refreshCredit}>
        <span id="user-icon-wrapper" className={cls(styles['user-icon-wrapper'], 'trigger')}>
          <Avatar
            icon={<img alt="" src={get(this.currentUser, 'preferences.portrait')} />}
            size="13"
          />
          <span className={cls('username')}>{this.currentUser && this.currentUser.userName}</span>
        </span>
      </ExtDropdown>
    );
  }
}

export default UserIcon;
