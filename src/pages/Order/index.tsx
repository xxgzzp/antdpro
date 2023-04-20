import renderBadge from '@/components/Utils/renderBadge';
import OrderForm from '@/pages/Order/OrderForm';
import OrderItem from '@/pages/Order/OrderItem/OrderItem';
import {
  apiMaterialOrdercategoryList,
  apiMaterialOrderDelete,
  apiMaterialOrderList,
} from '@/services/ant-design-pro/api';
import { useModel } from '@@/exports';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import { useToggle } from 'ahooks';
import { Button, Popconfirm, Radio, Table } from 'antd';
import { keyBy } from 'lodash';
import { Key, useEffect, useRef, useState } from 'react';
import { history } from 'umi';

export default function Page() {
  const proTableRef = useRef<ActionType>();

  // 关闭和打开"用户"模态框
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [updateOrder, setUpdateOrder] = useState<API.Order>();
  const [typeAddOrUpdate, setTypeAddOrUpdate] = useState<boolean>(true);

  // 在 onSearch 方法中更新搜索条件
  const [searchParams, setSearchParams] = useState({});

  // 标签页分类
  const [categoryEnum, setCategoryEnum] = useState({});
  const [radioState, { toggle }] = useToggle('类别', '项目');
  const [activeKey, setActiveKey] = useState('tab1');
  const { projectEnumKeyBy } = useModel('selector');

  useEffect(() => {
    // 用于上方筛选项目的订单
    // 用于选项卡筛选;
    apiMaterialOrdercategoryList().then((r) => {
      const res = r.results.map((r: any) => ({
        id: r.category,
        text: r.category,
        count: r.count,
      }));
      const resCategoryEnum = keyBy(res, 'id');
      setCategoryEnum(resCategoryEnum);
    });
  }, []);

  //  TODO:增
  const handleAdd = () => {
    setTypeAddOrUpdate(true);
    setModalOpen(true);
  };

  // TODO:删
  const handleDelete = (id: string) => {
    apiMaterialOrderDelete({
      id: id,
    }).then(() => {
      proTableRef.current?.reload();
    });
  };

  // TODO:查
  const handleSearch = (value: string) => {
    setSearchParams({ search: value });
  };

  // TODO:改
  const handleUpdate = (row: API.Order) => {
    setTypeAddOrUpdate(false); // 将表单方式切回更新
    setModalOpen(true);
    setUpdateOrder(row);
  };

  const handleRowClick = (record: API.Order) => {
    history.push(`/order/${record.id}/orderitems`);
  };

  // 转化时间请求参数
  const handleSearchParams = (params: any) => {
    if (params.created_time_range) {
      const [startDate, endDate] = params.created_time_range;
      params.created_time_before = endDate;
      params.created_time_after = startDate;
      delete params.created_time_range;
    }
    return params;
  };

  // 表格上方的menu的选择更改
  const handleMenuChange = (activeKey?: Key | undefined) => {
    setActiveKey(activeKey as string);
    if (radioState === '项目') {
      setSearchParams({ project__name: activeKey });
    } else {
      setSearchParams({ category: activeKey });
    }
  };

  function getItems() {
    interface EnumObject {
      [key: string]: { text: string; count: number };
    }
    const enumObject: EnumObject | undefined =
      radioState === '项目' ? projectEnumKeyBy : categoryEnum;
    return [
      {
        key: '',
        label: (
          <span>
            {'全部'}
            {renderBadge(0, activeKey === '')}
          </span>
        ),
      },
      ...(enumObject
        ? Object.keys(enumObject).map((key) => {
            const value = enumObject[key];
            return {
              key: value.text,
              label: (
                <span>
                  {value.text}
                  {renderBadge(value.count, activeKey === key)}
                </span>
              ),
            };
          })
        : []),
    ];
  }

  // ProTable 的 columns定义
  const columns: ProColumns<API.Order>[] = [
    {
      title: '分类方式',
      hideInTable: true,
      renderFormItem: () => {
        return (
          <Radio.Group
            options={[
              { label: '项目', value: '项目' },
              { label: '类别', value: '类别' },
            ]}
            onChange={toggle}
            value={radioState}
            optionType="button"
            buttonStyle="solid"
          />
        );
      },
    },
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      dataIndex: 'id',
      search: false,
      hideInTable: true,
    },
    {
      title: '材料单名称',
      dataIndex: 'name',
      search: false,
      render: (_, row) => [
        <a
          key="rowName"
          onClick={() => {
            history.push(`/order/${row.id}/orderitems`);
          }}
        >
          {row.name}
        </a>,
      ],
    },
    Table.EXPAND_COLUMN,
    {
      title: '类别',
      dataIndex: 'category',
      onFilter: true,
      filters: true,
      valueType: 'select',
      hideInSearch: true,
      // valueEnum: categoryEnum,
    },
    {
      title: '供应商',
      dataIndex: 'supplier_name',
      hideInSearch: true,
    },
    {
      title: '项目',
      dataIndex: 'project_name',
      onFilter: true,
      filters: true,
      valueType: 'select',
      search: {
        // @ts-ignore
        key: 'project',
      },
      valueEnum: projectEnumKeyBy,
    },
    {
      title: '创建者',
      dataIndex: 'created_by_name',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_time_range',
      valueType: 'dateRange',
      hideInTable: true,
      renderFormItem: (_, { type, defaultRender }) => {
        if (type === 'form') {
          return (
            <ProFormDateRangePicker style={{ marginLeft: 0 }} name="dateRange_1" label="日期" />
          );
        }
        return defaultRender(_);
      },
    },
    {
      title: '操作',
      width: 120,
      key: 'options',
      valueType: 'option',
      render: (_, row) => [
        // eslint-disable-next-line react/jsx-key
        <Button size="small" key="update" type="link" onClick={() => handleUpdate(row)}>
          修改
        </Button>,
        <Popconfirm key="delete" title="确认删除吗?" onConfirm={() => handleDelete(row.id!)}>
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.Order>
        columns={columns}
        actionRef={proTableRef}
        request={(params) => apiMaterialOrderList(handleSearchParams(params))}
        params={searchParams}
        pagination={{
          showQuickJumper: true,
          // "pageSize":10,
        }}
        rowKey="id"
        // onRow={(record) => {
        //   return {
        //     onDoubleClick: () => handleRowClick(record),
        //   };
        // }}
        expandable={{
          expandedRowRender: (record) => {
            return <OrderItem order_id={record.id!} isToolBal={false}></OrderItem>;
          },
        }}
        // 右上角三个调整按钮
        options={{
          // fullScreen: true,
          search: true,
        }}
        // 表格上方栏
        // toolbar={false}
        toolbar={{
          multipleLine: true,
          search: {
            onSearch: handleSearch,
            placeholder: '搜索',
          },
          // 控制台报的错误是这个menu里的
          menu: {
            type: 'tab',
            activeKey: activeKey,
            items: getItems(),
            onChange: handleMenuChange,
          },
        }}
        // 右上角按钮
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleAdd}>
            新增材料单
          </Button>,
        ]}
        //   在这个例子中，`search` 属性控制了每个查询表单元素的大小，
        // `searchConfig` 属性控制了它们的排列方式和样式。注意，这里使用了 `labelWidth: 'auto'` 来自适应不同长度的标签文字。
        search={{
          span: 6,
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
      ></ProTable>

      <OrderForm
        typeAddOrUpdate={typeAddOrUpdate}
        updateInit={updateOrder}
        modalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        reload={proTableRef.current?.reload}
      />
    </>
  );
}
