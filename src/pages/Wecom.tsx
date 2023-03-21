import { Button } from 'antd';
import React from 'react';
const InfoCard: React.FC = () => {
  const url =
    'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=ww43a1b769b5588d58&agentid=1000003&redirect_uri=http://zengzeping.com/api/wecom&state=STATE';

  return (
    <div>
      <Button
        onClick={() => {
          window.open(url);
        }}
      ></Button>
    </div>
  );
};

export default InfoCard;
