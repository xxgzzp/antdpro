import MaterialAll from '@/pages/Material/MaterialAll';
import { apiOaProjectList } from '@/services/ant-design-pro/api';
import { ApartmentOutlined, BranchesOutlined, FolderOpenOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { useRequest } from 'ahooks';
import { Menu, MenuProps } from 'antd';
import React, { useState } from 'react';

const InfoCard: React.FC = () => {
  const { data } = useRequest(apiOaProjectList);
  const [searchParams, setSearchParams] = useState({});

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      onClick: (e) => {
        setSearchParams({ project: e.keyPath[1], department: e.key });
      },
    } as MenuItem;
  }

  const oneAllItem = {
    label: (
      <div>
        <FolderOpenOutlined />
        <span>全部</span>
      </div>
    ),
    onClick: () => setSearchParams({}),
  };

  const items: MenuItem[] = (data?.results || [])?.map((item) => {
    // @ts-ignore
    const departmentItems = item?.departments?.slice(1).map(
      (department: API.Department) =>
        getItem(department?.name, department?.id, <BranchesOutlined />, undefined), // 将部门的值作为参数传递给 getItem
    );

    return getItem(
      <div
        onClick={() => {
          setSearchParams({ now_project: item.id });
        }}
      >
        <ApartmentOutlined />
        <span>{item.name}</span>
      </div>,
      item.id,
      null,
      departmentItems,
    );
  });

  // @ts-ignore
  items.unshift(oneAllItem); // 在数组开头添加新项

  return (
    <ProCard split="vertical" style={{ height: '600px' }}>
      <ProCard colSpan="200px" ghost>
        <Menu
          style={{ width: 200, paddingTop: '20px' }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
      </ProCard>
      <ProCard>
        <MaterialAll searchParams={searchParams} setSearchParams={setSearchParams}></MaterialAll>
      </ProCard>
    </ProCard>
  );
};
export default InfoCard;
