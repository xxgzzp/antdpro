import styles from '@/pages/User/Register/style.less';
import { request } from '@@/exports';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Alert, Button, Image, QRCode, Result, Skeleton, Steps } from 'antd';
import { getUUID } from 'rc-select/es/hooks/useId';
import React, { useEffect, useState } from 'react';

const InfoCard: React.FC<{
  propCurrent?: number;
}> = ({ propCurrent }) => {
  const { user, toggleUser, ready } = useModel('user');
  const [current, setCurrent] = useState(0);
  const [qrcode, setQrcode] = useState();
  const { data: wecomUser, run: getWecomUser } = useRequest(
    () => {
      return request(`api/oa/user/${user?.id}/wecom_user/`);
    },
    { manual: true },
  );
  const [qrcodeLoading, setQrcodeLoading] = useState(false);
  const uuid = getUUID();
  useEffect(() => {
    console.log(uuid);
    // 如果没有请求用户就先请求
    if (!ready) {
      toggleUser();
    }
    setQrcodeLoading(true);
    request('/api/wecom/get_join_qrcode', { skipErrorHandler: true })
      .then((res) => {
        setQrcode(res?.qrcode);
        setQrcodeLoading(false);
      })
      .catch((err) => {
        setQrcodeLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user?.id) {
      getWecomUser();
    }

    if (user?.userid) {
      setCurrent(1);
    } else {
      setCurrent(0);
    }
  }, [user]);

  useEffect(() => {
    if (wecomUser?.id) {
      setCurrent(3);
    }
  }, [wecomUser]);

  const [bindingLoading, setBindingLoading] = useState(false);
  const handleBinding = () => {
    setBindingLoading(true);
    request(`api/wecom/binding_state?user_id=${user?.id}`)
      .then((res) => {
        window.open(
          `https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=ww43a1b769b5588d58&agentid=1000003&redirect_uri=http://zengzeping.com/api/wecom/login&state=${user?.id}${res.state}`,
        );
      })
      .then(() => {
        setBindingLoading(false);
      })
      .catch(() => {
        setBindingLoading(false);
      });
  };

  return (
    <div>
      <Steps
        direction={'horizontal'}
        percent={50}
        labelPlacement="horizontal"
        current={propCurrent ? propCurrent : current}
        items={[
          {
            title: '加入企业微信',
          },
          {
            title: '绑定企业微信账号',
          },
          {
            title: '完善信息',
          },
          {
            title: '完成',
          },
        ]}
      />
      {current == 0 && (
        <div className={styles.result}>
          <Alert
            closable
            showIcon
            message="请用微信扫码，加入企业微信"
            style={{ marginBottom: 24 }}
          />
          <Skeleton active={true} loading={qrcodeLoading}>
            <div>
              <Image src={qrcode} style={{ paddingLeft: '100px' }}></Image>
            </div>
          </Skeleton>
          <Button onClick={() => setCurrent(current + 1)} block>
            {'下一步>'}
          </Button>
        </div>
      )}
      {current == 1 && (
        <div className={styles.result}>
          <Button onClick={handleBinding} loading={bindingLoading} block>
            点击前往企业微信绑定
          </Button>
          <div>
            <Button onClick={() => setCurrent(current - 1)}>{'<上一步'}</Button>
            <Button onClick={() => setCurrent(current + 1)}>{'下一步>'}</Button>
          </div>
        </div>
      )}
      {current == 2 && (
        <div className={styles.result}>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Alert
              closable
              showIcon
              message="请用企业微信扫码，并授权完善信息"
              style={{ marginBottom: 24 }}
            />

            <div>
              <QRCode
                size={300}
                style={{ marginBottom: 16 }}
                value={`https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww43a1b769b5588d58&redirect_uri=http%3A%2F%2Fzengzeping.com%2Fapi%2Fwecom%2Foauth&state=STATE&response_type=code&scope=snsapi_privateinfo&state=STATE&agentid=1000003#wechat_redirect`}
              />
            </div>
            <div>
              <Button onClick={() => setCurrent(current - 1)}>{'<上一步'}</Button>
              <Button onClick={() => setCurrent(current + 1)}>{'下一步>'}</Button>
            </div>
          </div>
        </div>
      )}
      {current == 3 && (
        <div className={styles.result}>
          <Result
            status="success"
            title="成功"
            subTitle="您已完成企业微信对接"
            extra={[
              <Button type="primary" key="console" onClick={() => setCurrent(current - 1)}>
                {'<上一步'}
              </Button>,
            ]}
          />
        </div>
      )}
    </div>
  );
};
export default InfoCard;
