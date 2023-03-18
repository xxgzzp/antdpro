import { Button } from 'antd';
import React from 'react';
const InfoCard: React.FC = () => {
  const url =
    'https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect?appid=ww43a1b769b5588d58&redirect_uri=120.46.180.93&state=web_login@gyoss9&usertype=admin';

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
