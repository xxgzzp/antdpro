import { apiOaCurrentuserList } from '@/services/ant-design-pro/api';
import { useRequest, useToggle } from 'ahooks';
import { useState } from 'react';

export default () => {
  // 因为初始全局数据，会在加载首页时发起请求，所以用ready来停止请求，用setRight来发起请求
  const [ready, { setRight: toggleUser }] = useToggle(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  const { data: user,loading } = useRequest<API.User, any>(
    () =>
      apiOaCurrentuserList({
        // skipErrorHandler: true,
      }),
    {
      ready,
    },
  );

  return {
    loading,
    ready,
    user,
    toggleUser,
    userModalOpen,
    setUserModalOpen,
  };
};
