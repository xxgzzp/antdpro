import ContractForm from '@/pages/Contract/ContractForm';
import {
  apiMaterialContractcategoryList,
  apiMaterialContractDelete,
  apiMaterialContractList,
  apiOaProjectList,
} from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import { Badge, Button, Modal, Radio } from 'antd';
import { keyBy } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
export default function Page() {
  const proTableRef = useRef<ActionType>();
  // 关闭和打开模态框
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [updateContract, setUpdateContract] = useState<API.Contract>();
  const [typeAddOrUpdate, setTypeAddOrUpdate] = useState<boolean>(true);
  // 删除用户中 控制删除model
  const [deleteModalVisit, setDeleteModalVisit] = useState<boolean>(false);
  const [deleteModalLoading, setDeleteModalLoading] = useState<boolean>(false);
  const [deleteContract, setDeleteContract] = useState<{ id: number | undefined; name: string }>();
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
    // 用于上方筛选
    apiOaProjectList().then((r) => {
      const res = r.results.map((r) => ({
        id: r.id,
        text: r.name,
      }));
      const resProjectEnum = keyBy(res, 'id');
      setProjectEnum(resProjectEnum);
    });
    // 用于选项卡筛选;
    apiMaterialContractcategoryList().then((r) => {
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
    setDeleteContract({
      id: row.id,
      name: row.name,
    });
    setDeleteModalVisit(true);
  };
  const handleUpdate = (row: API.Contract) => {
    setTypeAddOrUpdate(false); // 将表单方式切回更新
    setModalOpen(true);
    setUpdateContract(row);
  };
  const handleAdd = () => {
    setTypeAddOrUpdate(true);
    setModalOpen(true);
  };
  const handleMenuChange = (key) => {
    setActiveKey(key as string);
    if (toolbarEnumType === '项目') {
      setSearchParams({ project_name: key });
    } else {
      setSearchParams({ category: key });
    }
  };
  // 上方查询表单按钮
  const handleCategoryRadio = ({ target: { value } }) => {
    if (value === '项目') {
      setToolbarEnumType('项目');
    } else if (value === '材料单类别') {
      setToolbarEnumType('材料单类别');
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
      title: '合同名称',
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
      title: '施工员',
      dataIndex: 'principal_name',
      hideInSearch: true,
    },
    {
      title: '预算员',
      dataIndex: 'estimator_name',
      hideInSearch: true,
    },
    {
      title: '拍板人',
      dataIndex: 'end_by_name',
      hideInSearch: true,
    },
    {
      title: '创建者',
      dataIndex: 'created_by_name',
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
      renderFormItem: (_, { type, defaultRender, ...rest }) => {
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
      <ProTable<API.Contract>
        columns={columns}
        actionRef={proTableRef}
        request={(params) => apiMaterialContractList(handleSearchParams(params))}
        params={searchParams}
        pagination={{
          showQuickJumper: true,
          // "pageSize":10,
        }}
        rowKey="id"
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
            新增合同
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
          apiMaterialContractDelete({
            id: deleteContract?.id,
          } as unknown as API.apiMaterialContractDeleteParams).then(() => {
            setDeleteModalVisit(false);
            proTableRef.current?.reload();
            setDeleteModalLoading(false);
          });
        }}
      >
        <p>请问你是否要删除{deleteContract?.name}</p>
      </Modal>

      <ContractForm
        typeAddOrUpdate={typeAddOrUpdate}
        updateInit={updateContract}
        modalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        reload={proTableRef.current?.reload}
      />
    </>
  );
}
