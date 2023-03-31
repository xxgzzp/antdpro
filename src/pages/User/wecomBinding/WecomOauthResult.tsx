import { Result } from 'antd';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const msg = searchParams.get('message');
  // TODO:企业微信扫码登录失效 回显
  useEffect(() => {
    if (msg) {
      toast.success(msg);
    }
  }, [msg]);

  return <Result status="success" title="成功" subTitle={msg} />;
};
export default InfoCard;
