import { apiOaProjectList } from '@/services/ant-design-pro/api';
import { useRequest } from 'ahooks';

export default () => {
  const { data } = useRequest(apiOaProjectList);
  const projectSelectList = data.results.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  return projectSelectList;
};
