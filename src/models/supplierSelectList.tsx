import { apiOaSupplierList } from '@/services/ant-design-pro/api';
import { useRequest } from 'ahooks';

export default () => {
  const { data } = useRequest(apiOaSupplierList);
  const supplierSelectList = data.results.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  return supplierSelectList;
};
