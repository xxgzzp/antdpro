import { apiOaCurrentuserList } from '@/services/ant-design-pro/api';
import { useRequest, useToggle } from 'ahooks';

export default () => {
  // 因为初始全局数据，会在加载首页时发起请求，所以用ready来停止请求，用setRight来发起请求
  const [ready, { setRight: toggleUser }] = useToggle(false);

  const { data: user } = useRequest(
    () =>
      apiOaCurrentuserList({
        // skipErrorHandler: true,
      }),
    {
      ready,
    },
  );

  return {
    user,
    toggleUser,
  };
};
