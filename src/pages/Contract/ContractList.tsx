import renderBadge from '@/components/Utils/renderBadge';
import ContractForm from '@/pages/Contract/ContractForm';
import {
  apiMaterialContractcategoryList,
  apiMaterialContractDelete,
  apiMaterialContractList,
} from '@/services/ant-design-pro/api';
import { history } from '@@/core/history';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import { useModel } from '@umijs/max';
import { useToggle } from 'ahooks';
import { Button, Popconfirm, Radio } from 'antd';
import { keyBy } from 'lodash';
import { Key, useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
export default function Page() {
  const proTableRef = useRef<ActionType>();

  // 关闭和打开表单模态框
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [updateContract, setUpdateContract] = useState<API.Contract>();
  const [typeAddOrUpdate, setTypeAddOrUpdate] = useState<boolean>(true);

  // 在 onSearch 方法中更新搜索条件
  const [searchParams, setSearchParams] = useState({});

  // 上面的菜单中的project下拉选择
  const { projectEnumKeyBy } = useModel('selector');

  // 标签页分类
  const [categoryEnum, setCategoryEnum] = useState({});
  // https://ahooks.js.org/zh-CN/hooks/use-toggle
  const [radioState, { toggle }] = useToggle('类别', '项目');
  const [activeKey, setActiveKey] = useState('tab1');

  useEffect(() => {
    // 用于标签切换;
    apiMaterialContractcategoryList().then((r) => {
      const res = r.results.map((r: any) => ({
        id: r.category,
        text: r.category,
        count: r.count,
      }));
      const resCategoryEnum = keyBy(res, 'id');
      setCategoryEnum(resCategoryEnum);
    });
  }, []);

  // TODO:增
  const handleAdd = () => {
    setTypeAddOrUpdate(true);
    setModalOpen(true);
  };

  // TODO:删
  const handleDelete = async (id: string) => {
    await apiMaterialContractDelete({
      id: id,
    } as unknown as API.apiMaterialContractDeleteParams).then(() => {
      proTableRef.current?.reload();
    });
  };

  // TODO:查
  const handleSearch = (value: string) => {
    setSearchParams({ search: value });
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

  // TODO:改
  const handleUpdate = (row: API.Contract) => {
    setTypeAddOrUpdate(false); // 将表单方式切回更新
    setModalOpen(true);
    setUpdateContract(row);
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

  // ProTable 的 columns定义
  const columns: ProColumns<API.Contract>[] = [
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
      title: '合同名称',
      dataIndex: 'name',
      search: false,
      render: (_, row) => [
        <a
          key="rowName"
          onClick={() => {
            history.push(`contract/${row.id}/contractitems`);
          }}
        >
          {row.name}
        </a>,
      ],
    },
    {
      title: '类别',
      dataIndex: 'category',
      onFilter: true,
      filters: true,
      valueType: 'select',
      hideInSearch: true,
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
      valueEnum: projectEnumKeyBy,
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
        <Button key="update" size="small" type="link" onClick={() => handleUpdate(row)}>
          修改
        </Button>,
        <Popconfirm
          key="delete"
          title={`确认删除${row.name}吗?`}
          onConfirm={() => handleDelete(row.id!)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // TODO:渲染表格上方的选项
  function getItems() {
    const enumObject = radioState === '项目' ? projectEnumKeyBy : categoryEnum;
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
  return (
    <>
      <ProTable<API.Contract>
        columns={columns}
        rowKey="id"
        actionRef={proTableRef}
        request={(params) => apiMaterialContractList(handleSearchParams(params))}
        params={searchParams}
        pagination={{
          showQuickJumper: true,
        }}
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              history.push(`/contract/${record.id}/contractitems`);
            },
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
            新增合同
          </Button>,
        ]}
        // 在这个例子中，`search` 属性控制了每个查询表单元素的大小，
        // `searchConfig` 属性控制了它们的排列方式和样式。注意，这里使用了 `labelWidth: 'auto'` 来自适应不同长度的标签文字。
        search={{
          span: 6,
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
      />

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
