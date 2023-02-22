import Material from '@/components/Material';
import { apiMaterialMaterialList } from '@/services/ant-design-pro/api';
import { request, Service, useRequest } from '@umijs/max';
import React from 'react';
import styles from './index.less';

export default () => {
  const { data, error, loading } = useRequest(() => {
    return apiMaterialMaterialList()
  });
  console.log(data)
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  
  // console.log(data)
  // request('/api/material//', {
  //   params: {
  //     name: 1,
  //   },
  //   skipErrorHandler: true,
  // }).then();

  return <Material></Material>
  // <ProTable<API.Material> request={apiMaterialMaterialList} />;
};
