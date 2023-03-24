import { useState } from 'react';

export default () => {
  // 因为初始全局数据，会在加载首页时发起请求，所以用ready来停止请求，用setRight来发起请求
  const [userModalOpen, setUserModalOpen] = useState(false);

  return {
    userModalOpen,
    setUserModalOpen,
  };
};
