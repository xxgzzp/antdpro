import { apiOaUserList } from '@/services/ant-design-pro/api';
import { useRequest } from 'ahooks';

export default () => {
  const { data } = useRequest(apiOaUserList);
  const userSelectList =
    data?.results.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];
  return userSelectList;
};
