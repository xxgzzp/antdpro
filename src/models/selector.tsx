import { apiSelectorList } from '@/services/ant-design-pro/api';
import { useRequest } from 'ahooks';
import { Dictionary } from 'express-serve-static-core';
import { keyBy } from 'lodash';
import { useEffect, useState } from 'react';

export default () => {
  const { data: allSelectorEnum } = useRequest(() => apiSelectorList({ select_type: 'all' }));
  const [projectEnumKeyBy, setProjectEnumKeyBy] = useState<Dictionary<any>>();
  const [supplierEnumKeyBy, setSupplierEnumKeyBy] = useState<Dictionary<any>>();
  const [userEnumKeyBy, setUserEnumKeyBy] = useState<Dictionary<any>>();
  // @ts-ignore
  const { projectEnum, supplierEnum, userEnum } = allSelectorEnum?.results ?? {};
  useEffect(() => {
    if (projectEnum) {
      const projectEnumKeyBy = keyBy(
        projectEnum.map((r: any) => ({ id: r.value, text: r.label })),
        'id',
      );
      setProjectEnumKeyBy(projectEnumKeyBy);
    }

    if (supplierEnum) {
      const supplierEnumKeyBy = keyBy(
        supplierEnum.map((r: any) => ({ id: r.value, text: r.label })),
        'id',
      );
      setSupplierEnumKeyBy(supplierEnumKeyBy);
    }

    if (userEnum) {
      const userEnumKeyBy = keyBy(
        userEnum.map((r: any) => ({ id: r.value, text: r.label })),
        'id',
      );
      setUserEnumKeyBy(userEnumKeyBy);
    }
  }, [projectEnum, supplierEnum, userEnum]);

  return {
    projectEnum,
    supplierEnum,
    userEnum,
    projectEnumKeyBy,
    supplierEnumKeyBy,
    userEnumKeyBy,
  };
};
