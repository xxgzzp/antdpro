import OrderForm from '@/pages/Order/OrderForm';
import {
  apiMaterialOrdercategoryList,
  apiMaterialOrderDelete,
  apiMaterialOrderList,
  apiOaProjectList,
} from '@/services/ant-design-pro/api'
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import { Badge, Button, Modal, Radio, RadioChangeEvent } from 'antd';
import { keyBy } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { history } from 'umi';
export default function Page() {
  const proTableRef = useRef<ActionType>();
  // 关闭和打开"用户"模态框
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [updateOrder, setUpdateOrder] = useState<API.Order>();
  const [typeAddOrUpdate, setTypeAddOrUpdate] = useState<boolean>(true);
  // 删除用户中 控制删除model
  const [deleteModalVisit, setDeleteModalVisit] = useState<boolean>(false);
  const [deleteModalLoading, setDeleteModalLoading] = useState<boolean>(false);
  const [deleteOrder, setDeleteOrder] = useState<{
    id: number | undefined;
    name: string | undefined;
  }>();
  // 在 onSearch 方法中更新搜索条件
  const [searchParams, setSearchParams] = useState({});
  // 上面的菜单中的project下拉选择
  const [projectEnum, setProjectEnum] = useState({});
  // 标签页分类
  const [categoryEnum, setCategoryEnum] = useState({});
  const [activeKey, setActiveKey] = useState('tab1');
  // 用于上方筛选方式 默认是 项目
  const [toolbarEnumType, setToolbarEnumType] = useState('类别');

  useEffect(() => {
    // 用于上方筛选项目的订单
    apiOaProjectList().then((r) => {
      const res = r.results.map((r) => ({
        id: r.id,
        text: r.name,
      }));
      const resProjectEnum = keyBy(res, 'id');
      setProjectEnum(resProjectEnum);
    });
    // 用于选项卡筛选;
    apiMaterialOrdercategoryList().then((r) => {
      const res = r.results.map((r) => ({
        id: r.category,
        text: r.category,
        count: r.count,
      }));
      const resCategoryEnum = keyBy(res, 'id');
      setCategoryEnum(resCategoryEnum);
    });
  }, []);

  const handleSearch = (value: string) => {
    setSearchParams({ search: value });
  };
  const handleDelete = (row: API.Order) => {
    setTypeAddOrUpdate(true);
    setDeleteOrder({
      id: row.id,
      name: row.name,
    });
    setDeleteModalVisit(true);
  };
  const handleUpdate = (row: API.Order) => {
    setTypeAddOrUpdate(false); // 将表单方式切回更新
    setModalOpen(true);
    setUpdateOrder(row);
  };
  const handleAdd = () => {
    setTypeAddOrUpdate(true);
    setModalOpen(true);
  };
  const handleRowClick = (record: API.Order) => {
    history.push(`/order/${record.id}/orderitems`);
  };
  const handleMenuChange = (key: React.Key| undefined) => {
    setActiveKey(key as string);
    if (toolbarEnumType === '项目') {
      setSearchParams({ project_name: key });
    } else {
      setSearchParams({ category: key });
    }
  };
  // 上方查询表单按钮
  const handleCategoryRadio = (e: RadioChangeEvent) => {
    const value = e.target.value;
    if (value === '项目') {
      setToolbarEnumType('项目');
    } else if (value === '类别') {
      setToolbarEnumType('类别');
    }
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
            onChange={handleCategoryRadio}
            value={toolbarEnumType}
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
    },
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
      valueEnum: projectEnum,
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
          // return <ProFormDateRangePicker  {...rest}/>;
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
        <Button size="small" key="delete" type="link" onClick={() => handleDelete(row)} danger>
          删除
        </Button>,
      ],
    },
  ];
  const renderBadge = (count: number, active = false) => {
    return (
      <Badge
        count={count}
        style={{
          marginBlockStart: -2,
          marginInlineStart: 4,
          color: active ? '#1890FF' : '#999',
          backgroundColor: active ? '#E6F7FF' : '#eee',
        }}
      />
    );
  };

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
        onRow={(record) => {
          return {
            onDoubleClick: () => handleRowClick(record),
          };
        }}
        // 右上角三个调整按钮

        options={{
          search: true,
        }}
        // 表格上方栏
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
            items: [
              {
                key: '',
                label: (
                  <span>
                    {'全部'}
                    {renderBadge(0, activeKey === '')}
                  </span>
                ),
              },
              ...Object.keys(toolbarEnumType === '项目' ? projectEnum : categoryEnum).map((key) => {
                // @ts-ignore
                const value = toolbarEnumType === '项目' ? projectEnum[key] : categoryEnum[key];
                return {
                  key: value.text,
                  label: (
                    <span>
                      {value.text}
                      {renderBadge(value.count, activeKey === key)}
                    </span>
                  ),
                };
              }),
            ],
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

      <Modal
        title="删除订单"
        open={deleteModalVisit}
        onCancel={() => {
          setDeleteModalVisit(false);
        }}
        confirmLoading={deleteModalLoading}
        key="userModal"
        onOk={() => {
          setDeleteModalLoading(true);
          // 删除订单
          apiMaterialOrderDelete({
            id: deleteOrder?.id,
          }).then(() => {
            setDeleteModalVisit(false);
            proTableRef.current?.reload();
            setDeleteModalLoading(false);
          });
        }}
      >
        <p>请问你是否要删除{deleteOrder?.name}</p>
      </Modal>

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
