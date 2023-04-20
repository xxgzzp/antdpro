import { EditableCell, EditableRow } from '@/components/Utils/Editable';
import ContractSelectAdd from '@/pages/Contract/ContractSelectAdd';
import '@/pages/Order/OrderItem/OrderItem.less';
import useOrderLocalStorage, { OrderLocal } from '@/pages/Order/OrderItem/useOrderLocalStorage';
import {
  apiMaterialOrderArrivalOneOrderItem,
  apiMaterialOrderArrivalOrderItem,
  apiMaterialOrderItemModifyContractFields,
  apiMaterialOrderOrderItems,
  apiMaterialOrderPermissionCreate,
} from '@/services/ant-design-pro/api';
import { history } from '@@/core/history';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-table';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Drawer, Modal, Popconfirm, Result, Space, Switch, Table } from 'antd';
import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Search from '@/pages/BigData/Search';

const OrderItem: React.FC<{
  order_id: string;
  isToolBal?: boolean;
  dataSourceCommit?: API.OrderItem[];
  setDataSourceCommit?: React.Dispatch<React.SetStateAction<API.OrderItem[]>>;
}> = ({ order_id, isToolBal = true, setDataSourceCommit }) => {
  // 操作的数据源 并且新建初始数据，如果是新建order就要用到
  const [dataSource, setDataSource] = useState<API.OrderItem[]>([]);

  // 因为提交数据的逻辑被抽离到index，所以要set回去
  useEffect(() => {
    if (setDataSourceCommit) {
      setDataSourceCommit(dataSource);
    }
  }, [dataSource, setDataSourceCommit]);

  const {
    data: remoteDate,
    loading: orderRemoteLoading,
    run: getOrderItemRemote,
    error,
  } = useRequest(() => apiMaterialOrderOrderItems({ id: order_id }), { manual: true });

  // 操作LocalStorage
  const { getOrderLocal, updateOrderLocal, deleteOrderLocal } = useOrderLocalStorage();
  const orderLocal = getOrderLocal(order_id!); // 获取本地order

  const { reloadKey, setReloadKey } = useModel('tableReload');

  const [searchText, setSearchText] = useState<string>();
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const { isSelect, setIsSelect, selectSku, rowSelect, setRowSelect } = useModel('productSelect');
  // TODO:加载数据
  useEffect(() => {
    // TODO:如果有prop数据，就加载prop的 ，
    //  没有就加载本地的(同时发起网络请求)，
    //  网络请求完毕就比较本地和远程数据，如果相等就删除本地数据
    getOrderItemRemote();
    // 如果有本地数据就读取
    if (typeof orderLocal !== undefined && orderLocal?.length) {
      setDataSource(orderLocal[0].items);
    }
  }, [reloadKey, order_id]);

  // TODO:远程数据加载完毕:
  useEffect(() => {
    if (remoteDate && orderLocal?.length) {
      // 去除时间戳后比较
      const _localDate = orderLocal[0].items.map((item) => ({ ...item, timestamp: undefined }));
      const _remoteDate = remoteDate?.results.map((item: any) => ({
        ...item,
        timestamp: undefined,
      }));
      if (isEqual(_localDate, _remoteDate)) {
        // TODO:若远程数据和本地数据相等就删除本地数据
        deleteOrderLocal(order_id!);
      }
    }

    // TODO:没有本地数据就加载远程的
    if (remoteDate && !orderLocal?.length) {
      setDataSource(remoteDate.results);
    }
  }, [remoteDate]);

  // TODO:删除行
  const handleDelete = (id: React.Key) => {
    if (dataSource) {
      const newData = dataSource.filter((item) => item.id !== id);
      setDataSource(newData);
      const updateOrder: OrderLocal = { id: order_id!, items: newData! };
      updateOrderLocal(updateOrder);
    }
  };

  // TODO:新增行
  const handleAdd = () => {
    if (dataSource) {
      const newData: API.OrderItem = {
        id: uuidv4(),
        material_name: undefined,
        material_sku: undefined,
        material_unit: undefined,
        need_time: undefined,
        buy_num: undefined,
        used_site: undefined,
        sort: dataSource.length + 1,
        is_arrival: false,
        timestamp: undefined,
        order: '',
        material: 0,
        contract: undefined,
        receipt: undefined,
      };
      newData.id = uuidv4();
      newData.sort = dataSource.length + 1;
      setDataSource([...dataSource, newData]);
    }
  };

  // TODO:保存行
  const handleSave = (row: API.OrderItem) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];

    // 修改当前时间缀
    // const newTimestamp = new Date().toLocaleString({ timeZone: 'Asia/Shanghai' });
    const dateTime = new Date(+new Date() + 8 * 3600 * 1000);
    const newTimestamp = new Date(dateTime).toISOString();
    const newRow = { ...row, timestamp: newTimestamp };
    newData.splice(index, 1, {
      ...item,
      ...newRow,
      // https://ant.design/components/table-cn#components-table-demo-expand
      // children: [{ ...item }] 这样子可以设置展开可是效果不好
    });
    setDataSource(newData);
    // 保存本地数据
    const updateOrder: OrderLocal = {
      id: order_id!,
      items: newData!,
    };
    updateOrderLocal(updateOrder);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  type EditableTableProps = Parameters<typeof Table>[0];
  type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '序号',
      dataIndex: 'sort',
      width: '10%',
      editable: true,
      sorter: {
        // @ts-ignore
        compare: (a, b) => a.sort - b.sort,
        multiple: 3,
      },
    },
    // @ts-ignore
    Table.EXPAND_COLUMN,
    {
      title: '材料与设备名称',
      dataIndex: 'material_name',
      width: '30%',
      editable: true,
      sorter: {
        // @ts-ignore
        compare: (a, b) => a.material_name?.length - b.material_name?.length,
        multiple: 3,
      },
    },
    {
      title: '规格',
      width: '30%',
      dataIndex: 'material_sku',
      editable: true,
      sorter: {
        // @ts-ignore
        compare: (a, b) => a.material_sku?.length - b.material_sku?.length,
        multiple: 3,
      },
    },
    {
      title: '使用部位',
      width: '20%',
      dataIndex: 'used_site',
      editable: true,
    },
    {
      title: '申购数量',
      width: '10%',
      dataIndex: 'buy_num',
      editable: true,
      sorter: {
        // @ts-ignore
        compare: (a, b) => a.buy_num - b.buy_num,
        multiple: 3,
      },
    },
    {
      title: '单位',
      width: '10%',
      dataIndex: 'material_unit',
      editable: true,
      sorter: {
        // @ts-ignore
        compare: (a, b) => a.material_unit?.length - b.material_unit?.length,
        multiple: 3,
      },
    },
    {
      title: '合同',
      width: '10%',
      hideInTable: true,
      dataIndex: 'contract_name',
      render: (_, row) => [
        <a
          key="rowName"
          onClick={() => {
            // @ts-ignore
            history.push(`/contract/${row?.contract}/contractitems`);
          }}
        >
          {row?.contract_name}
        </a>,
      ],
    },
    {
      title: '是否到货',
      width: '10%',
      dataIndex: 'is_arrival',
      render: (_, row) => [
        <Switch
          key="arrival"
          checkedChildren="到货"
          unCheckedChildren="未到货"
          checked={row?.is_arrival}
          onChange={async (checked) => {
            await apiMaterialOrderArrivalOneOrderItem(
              { id: order_id },
              { order_item_id: row?.id, is_arrival: checked },
            ).then(() => {
              // setReloadKey(reloadKey + 1);
              // 更新 ProTable 数据
              const newData = [...dataSource];
              const index = newData.findIndex((item) => item.id === row?.id);
              if (index > -1) {
                newData[index].is_arrival = checked;
                setDataSource(newData);
              }
            });
          }}
        />,
      ],
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '15%',
      // @ts-ignore
      render: (_, record: { id: React.Key; material_name: string }) =>
        dataSource.length >= 1 ? (
          <div>
            <a
              style={{ paddingRight: 10 }}
              onClick={() => {
                setRowSelect(record);
                setSearchText(record?.material_name);
                setSearchOpen(true);
              }}
            >
              详情
            </a>
            <Popconfirm title="确认删除吗?" onConfirm={() => handleDelete(record.id)}>
              <a>删除</a>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: API.OrderItem) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  // 是否展开远程数据的行
  const handleRowExpandable = (record: API.OrderItem) => {
    if (orderLocal?.length && remoteDate) {
      // 按时间戳判断，如果是修改了就展开
      const remoteItem = remoteDate.results.filter((item: any) => item.id === record.id);
      const timestamp = remoteItem.map((item: any) => item.timestamp)[0];
      const _localItem = { ...record, timestamp: undefined };
      const _remoteItem = { ...remoteItem[0], timestamp: undefined };
      const _isEqual = isEqual(_localItem, _remoteItem);

      // 修改了，并且修改后的内容不相等
      return record.timestamp! > timestamp! && !_isEqual;
    }
    return false;
  };

  const [contractModel, setContractModel] = useState(false);
  const [contractSelectValue, setContractSelectValue] = useState();
  const [selectRow, setSelectRow] = useState<API.OrderItem[]>();
  const [contractCommitLoading, setContractCommitLoading] = useState(false);
  const handleContractCommit = async () => {
    setContractCommitLoading(true);
    await apiMaterialOrderItemModifyContractFields({
      // @ts-ignore
      contract_id: contractSelectValue,
      order_items: selectRow,
    })
      .then(() => {
        setContractModel(false);
      })
      .catch(() => {
        setContractModel(false);
      });
    setContractCommitLoading(false);
  };

  // 展开渲染
  const handleExpendedRowRender = (record: API.OrderItem) => {
    if (remoteDate) {
      const newData = [...remoteDate.results];
      const index = newData.findIndex((item) => record.id === item.id);
      const item = newData[index];
      return (
        <tr className="editable-row">
          <td>系统数据:</td>
          <td style={{ padding: '5px 100px' }}>{item.sort}</td>
          <td style={{ padding: '5px 100px' }}>{item.material_name}</td>
          <td style={{ paddingRight: '50px' }}>{item.material_sku}</td>
          <td style={{ paddingRight: '50px' }}>{item.used_site}</td>
          <td style={{ paddingRight: '50px' }}>{item.buy_num}</td>
          <td style={{ paddingRight: '50px' }}>{item.material_unit}</td>
        </tr>
      );
    }
    return <p>远程获取数据失败</p>;
  };

  const { user } = useModel('user');
  const [permLoading, setPermLoading] = useState(false);
  const handlePermissions = async () => {
    setPermLoading(true);
    await apiMaterialOrderPermissionCreate({ user: user?.id, order: order_id })
      .then(() => {
        toast.success('申请成功');
      })
      .catch(() => {
        toast.error('申请失败');
      });
    setPermLoading(false);
  };
  if (error) {
    return (
      <Result
        status="warning"
        title="您没有权限访问"
        extra={
          <Button type="primary" key="console" loading={permLoading} onClick={handlePermissions}>
            {`申请权限`}
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <ProTable
        columnSetting={{ visible: true }} // 启用列设置菜单
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: [1],
        }}
        tableAlertOptionRender={(_) => {
          return (
            <div>
              <Space size={16} style={{ marginRight: 10 }}>
                <a
                  onClick={() => {
                    console.log(_?.selectedRows.map((row) => row.id));
                    apiMaterialOrderArrivalOrderItem(
                      { id: order_id! },
                      { order_item_ids: _?.selectedRows.map((row) => row.id) },
                    ).then(() => {
                      setReloadKey(reloadKey + 1);
                    });
                  }}
                >
                  签收
                </a>
              </Space>
              ,
              <Space size={16}>
                <a
                  onClick={() => {
                    setContractModel(true);
                    setSelectRow(_?.selectedRows);
                  }}
                >
                  导入合同
                </a>
              </Space>
            </div>
          );
        }}
        style={{ paddingTop: '20px' }}
        rowKey="id"
        locale={{ emptyText: 'empty' }}
        // 有本地数据就不显示加载
        loading={orderLocal?.length ? false : orderRemoteLoading}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        // @ts-ignore
        columns={columns as ColumnTypes}
        pagination={false}
        // 吸顶
        sticky
        // scroll={{ x: 'max-content', y: 'calc(100vh - 300px)' }}
        // size="small" // 紧凑
        search={false}
        options={
          isToolBal
            ? {
                // 全屏
                fullScreen: true,
              }
            : false
        }
        // 右上角按钮
        toolBarRender={() =>
          isToolBal
            ? [
                <div key="proTableOption">
                  <span style={{ paddingRight: '10px' }}>
                    {/*<Button*/}
                    {/*  onClick={handleCommit}*/}
                    {/*  type="primary"*/}
                    {/*  style={{ marginBottom: 16 }}*/}
                    {/*  loading={commitLoading}*/}
                    {/*>*/}
                    {/*  提交*/}
                    {/*</Button>*/}
                    <Button
                      onClick={handleAdd}
                      type="primary"
                      style={{ marginBottom: 16, marginLeft: 10 }}
                    >
                      增加一行
                    </Button>
                  </span>
                </div>,
              ]
            : []
        }
        expandable={{
          expandedRowRender: handleExpendedRowRender,
          rowExpandable: handleRowExpandable,
        }}
      />
      {isToolBal && (
        <Button type="dashed" onClick={handleAdd} style={{ width: '100%', marginBottom: 8 }}>
          <PlusOutlined />
          添加一行
        </Button>
      )}
      <Modal
        title="请选择 或 创建 合同"
        open={contractModel}
        confirmLoading={contractCommitLoading}
        onOk={handleContractCommit}
        onCancel={() => {
          setContractModel(false);
        }}
      >
        <ContractSelectAdd
          onChange={(_) => {
            setContractSelectValue(_);
          }}
          style={{ width: '200px' }}
        ></ContractSelectAdd>
      </Modal>
      <Drawer
        placement="top"
        height={500}
        open={searchOpen}
        onClose={() => {
          setSearchOpen(false);
        }}
      >
        <Search search_text={searchText}></Search>
      </Drawer>
      <Drawer
        placement="bottom"
        open={isSelect && rowSelect}
        height="200"
        onClose={() => {
          setIsSelect(false);
        }}
      >
        <Space size={10}>
          <Button
            onClick={() => {
              const item = dataSource.find((item) => item?.id === rowSelect?.id);
              if (item) {
                item.material_name = selectSku?.itemName;
              }
            }}
          >
            &ldquo;材料与设备名称&ldquo;:{selectSku?.itemName}
          </Button>
          <Button
            onClick={() => {
              const item = dataSource.find((item) => item?.id === rowSelect?.id);
              if (item) {
                item.material_sku = selectSku?.itemName;
              }
            }}
          >
            &ldquo;规格&ldquo;:{selectSku?.model}
          </Button>
          <Button
            onClick={() => {
              const item = dataSource.find((item) => item?.id === rowSelect?.id);
              if (item) {
                item.material_unit = selectSku?.unitName;
              }
            }}
          >
            &ldquo;单位&ldquo;:{selectSku?.unitName}
          </Button>
          <Button
            onClick={() => {
              const item = dataSource.find((item) => item?.id === rowSelect?.id);
              if (item) {
                item.material_name = selectSku?.itemName;
                item.material_sku = selectSku?.itemName;
                item.material_unit = selectSku?.unitName;
              }
            }}
          >
            全部载入
          </Button>
        </Space>
      </Drawer>
    </div>
  );
};

export default OrderItem;
