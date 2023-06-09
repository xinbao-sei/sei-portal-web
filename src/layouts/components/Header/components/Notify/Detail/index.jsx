import React from 'react';
import { Skeleton, Button, Modal } from 'antd';
import Iframe from '@/layouts/components/Tab/Iframe';
import { hasKonwn } from '@/services/message';

export default class index extends React.Component {
  state = {
    loading: true,
  };

  // componentDidMount() {
  //   const { id, } = this.props;
  //   if (id) {
  //     this.setState({
  //       loading: true,
  //     });
  //   }
  // }

  handleBtn = () => {
    const { toggleView } = this.props;
    if (toggleView) {
      toggleView();
    }
  };

  handleLoaded = () => {
    this.setState({
      loading: false,
    });
  };

  handleHaveKnown = () => {
    const { id: msgId, msgCategory, afterHasKnown } = this.props;
    this.handleBtn();
    hasKonwn({ msgId, category: msgCategory }).then(result => {
      const { success } = result;
      if (success) {
        afterHasKnown();
      }
    });
  };

  getModalProps = () => {
    const { loading } = this.state;
    const { title = '消息明细', isFirst } = this.props;

    return {
      title,
      forceRender: isFirst,
      visible: isFirst ? !loading : true,
      // style: { display: loading ? 'none':'', },
      width: '80%',
      bodyStyle: {
        height: 400,
        overflow: 'auto',
      },
      okText: '知道了',
      onCancel: () => {
        this.handleBtn();
      },
      footer: [
        <Button key="submit" type="primary" onClick={this.handleHaveKnown}>
          知道了
        </Button>,
      ],
    };
  };

  render() {
    const { loading } = this.state;
    const { id, msgCategory } = this.props;

    return (
      <Modal {...this.getModalProps()}>
        <Skeleton loading={loading} active></Skeleton>
        <div style={{ display: loading ? 'none' : '', height: '100%' }}>
          <Iframe
            visible
            title="message-detail"
            url={`/sei-notify-web/#/sei-notify-web/message/msgDetail?detailId=${id}&category=${msgCategory}`}
            id="message-detail"
            onLoaded={this.handleLoaded}
          />
        </div>
      </Modal>
    );
  }
}
