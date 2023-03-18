import { EditableCell, EditableRow } from '@/components/Utils/Editable';
import '@/pages/ContractItem/ContractItemList.less';
import ContractTop from '@/pages/ContractItem/ContractTop';
import useContractLocalStorage, {
  ContractLocal,
} from '@/pages/ContractItem/useContractLocalStorage';
import {
  apiMaterialContractItemList,
  apiMaterialContractUpdate,
} from '@/services/ant-design-pro/api';
import { useModel } from '@@/exports';
import { ProTable } from '@ant-design/pro-table';
import { request } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Form, Popconfirm, Table } from 'antd';
import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

const ContractItemList: React.FC = () => {
  // 请求订单项
  const {
    data: remoteDate,
    loading: contractRemoteLoading,
    run: getContractItemRemote,
  } = useRequest(apiMaterialContractItemList, { manual: true });
  // URL中的contract_id
  const { contract_id } = useParams<{ contract_id?: string }>();
  // 上方订单信息表单
  const [contractForm] = Form.useForm();
  // 操作LocalStorage
  const { getContractLocal, updateContractLocal, deleteContractLocal } = useContractLocalStorage();
  const contractLocal = getContractLocal(contract_id!); // 获取本地contract
  // 操作的数据源 并且新建初始数据，如果是新建contract就要用到
  const [dataSource, setDataSource] = useState<API.ContractItem[]>([]);
  // 重载
  const { reloadKey, setReloadKey } = useModel('tableReload');

  // TODO:读取数据
  useEffect(() => {
    getContractItemRemote({ contract: contract_id });
    // 如果有本地数据就读取
    if (typeof contractLocal !== undefined && contractLocal?.length) {
      setDataSource(contractLocal[0].items);
    }
  }, [reloadKey, contract_id]);

  // TODO:远程获取数据完毕,与本地数据比较，相等就删除本地数据
  useEffect(() => {
    // 若远程数据和本地数据相等就删除本地数据
    if (remoteDate && contractLocal?.length) {
      // 去除时间戳后比较
      const _localDate = contractLocal[0].items.map((item: API.ContractItem) => ({
        ...item,
        timestamp: undefined,
      }));
      const _remoteDate = remoteDate.results.map((item) => ({ ...item, timestamp: undefined }));
      if (isEqual(_localDate, _remoteDate)) {
        deleteContractLocal(contract_id!);
      }
    }
    // 没有本地数据就加载远程的
    if (remoteDate && !contractLocal?.length) {
      setDataSource(remoteDate.results);
    }
  }, [remoteDate]);

  // TODO:添加行
  const handleAdd = () => {
    if (dataSource) {
      // @ts-ignore
      const newData: API.ContractItem = {
        id: uuidv4(),
        sort: dataSource.length + 1,
        material_name: undefined,
        material_sku: undefined,
        material_unit: undefined,
        estimator_num: undefined,
        principal_num: undefined,
        end_num: undefined,
        timestamp: undefined,
      };
      setDataSource([...dataSource, newData]);
    }
  };

  // TODO:删除行
  const handleDelete = (id: string) => {
    if (dataSource) {
      const newData = dataSource.filter((item) => item.id !== id);
      setDataSource(newData);
      const updateContract: ContractLocal = { id: contract_id!, items: newData! };
      updateContractLocal(updateContract);
    }
  };

  // 保存行
  const handleSave = (row: API.ContractItem) => {
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
    });
    setDataSource(newData);
    // 保存本地数据
    const updateContract: ContractLocal = {
      id: contract_id!,
      items: newData!,
    };
    updateContractLocal(updateContract);
  };

  // 提交数据
  const [commitLoading, setCommitLoading] = useState<boolean>(false);
  const handleCommit = async () => {
    setCommitLoading(true);
    await apiMaterialContractUpdate({ id: contract_id! }, { ...contractForm.getFieldsValue() });
    await request('/api/material/contract_commit/', {
      method: 'POST',
      data: {
        contract_items: dataSource,
        contract_id: contract_id,
      },
    })
      .then(() => {
        // 重载
        setReloadKey(reloadKey + 1);
      })
      .catch(() => {
        // loading为false
        setCommitLoading(false);
      });
    setCommitLoading(false);
    // 提交了就在本地删除
    deleteContractLocal(contract_id!);
  };

  // TODO:请注意，其中的编辑逻辑被我提取到components/Utils中
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  // TODO:比较远程数据和本地数据，看是否展开远程数据的行
  const handleRowExpandable = (record: API.ContractItem) => {
    if (contractLocal?.length && remoteDate) {
      // 按时间戳判断，如果是修改了就展开
      const remoteItem = remoteDate.results.filter((item) => item.id === record.id);
      const timestamp = remoteItem.map((item) => item.timestamp)[0];
      const _localItem = { ...record, timestamp: undefined };
      const _remoteItem = { ...remoteItem[0], timestamp: undefined };
      const _isEqual = isEqual(_localItem, _remoteItem);
      // 修改了，并且修改后的内容不相等,就显示展开按钮
      return record.timestamp! > timestamp! && !_isEqual;
    }
    return false;
  };
  // TODO:展开渲染
  const handleExpendedRowRender = (record: API.ContractItem) => {
    if (remoteDate) {
      const newData = [...remoteDate.results];
      const index = newData.findIndex((item) => record.id === item.id);
      const item = newData[index];
      return (
        <tr className="editable-row">
          <td>系统数据:</td>
          <td style={{ padding: '5px 100px' }}>{item.material_name}</td>
          <td style={{ paddingRight: '50px' }}>{item.material_sku}</td>
          <td style={{ paddingRight: '50px' }}>{item.material_unit}</td>
          <td style={{ paddingRight: '50px' }}>{item.estimator_num}</td>
          <td style={{ paddingRight: '50px' }}>{item.principal_num}</td>
          <td style={{ paddingRight: '50px' }}>{item.end_num}</td>
        </tr>
      );
    }
    return <p>远程获取数据失败</p>;
  };

  type EditableTableProps = Parameters<typeof Table>[0];
  type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '序号',
      dataIndex: 'sort',
      width: '7%',
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
      width: '20%',
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
      title: '预算',
      width: '10%',
      dataIndex: 'estimator_num',
      editable: true,
      sorter: {
        // @ts-ignore
        compare: (a, b) => a.estimator_num - b.estimator_num,
        multiple: 3,
      },
    },
    {
      title: '施工员',
      width: '10%',
      dataIndex: 'principal_num',
      editable: true,
      sorter: {
        // @ts-ignore
        compare: (a, b) => a.principal_num - b.principal_num,
        multiple: 3,
      },
    },
    {
      title: '最终',
      width: '10%',
      dataIndex: 'end_num',
      editable: true,
      sorter: {
        // @ts-ignore
        compare: (a, b) => a.end_num - b.end_num,
        multiple: 3,
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '7%',
      // @ts-ignore
      render: (_, record: API.ContractItem) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="确认删除吗?" onConfirm={() => handleDelete(record.id!)}>
            <a>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: API.ContractItem) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <ContractTop contractForm={contractForm} contract_id={contract_id}></ContractTop>
      <ProTable
        style={{ paddingTop: '20px' }}
        rowKey="id"
        locale={{ emptyText: 'empty' }}
        // 有本地数据就不显示加载
        loading={contractLocal?.length ? false : contractRemoteLoading}
        components={components}
        rowClassName={() => 'editable-row'}
        bcontracted
        dataSource={dataSource}
        // @ts-ignore
        columns={columns as ColumnTypes}
        pagination={false}
        sticky={true}
        size="small" // 紧凑
        search={false}
        // 右上角按钮
        toolBarRender={() => [
          <div key="proTableOption">
            <span style={{ paddingRight: '10px' }}>
              <Button
                onClick={handleCommit}
                type="primary"
                style={{ marginBottom: 16 }}
                loading={commitLoading}
              >
                提交
              </Button>
            </span>
            <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
              增加一行
            </Button>
          </div>,
        ]}
        expandable={{
          expandedRowRender: handleExpendedRowRender,
          rowExpandable: handleRowExpandable,
        }}
      />
    </div>
  );
};

export default ContractItemList;
