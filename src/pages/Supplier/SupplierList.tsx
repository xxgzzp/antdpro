import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {ProTable,} from '@ant-design/pro-components';
import React, { useRef, useState} from 'react';
import {apiOaSupplierDelete, apiOaSupplierList} from "@/services/ant-design-pro/api";
import {Button, Modal,} from "antd";
import SupplierForm from "@/pages/Supplier/SupplierForm";
export default function SupplierList() {
  const proTableRef = useRef<ActionType>();
  // 关闭和打开SupplierForm模态框
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [updateSupplier, setUpdateSupplier] = useState<API.Supplier>()
  const [typeAddOrUpdate, setTypeAddOrUpdate] = useState<boolean>(true);
  // 删除中 控制删除model
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteModalLoading, setDeleteModalLoading] = useState<boolean>(false);
  const [deleteSupplier, setDeleteSupplier] = useState<{id:number | undefined,name:string}>();
  // 在 onSearch 方法中更新搜索条件
  const [searchParams, setSearchParams] = useState({});

  const handleSearch = (value: string) => {
    setSearchParams({ search: value });
  };

  const handleUpdate = (row:API.Supplier)=>{
    setModalOpen(true);
    setTypeAddOrUpdate(false);  // 将表单方式切回更新
    setUpdateSupplier(row);
  };
  const handleAdd = ()=>{
    setModalOpen(true);
    setTypeAddOrUpdate(true);
  };
  // 点击删除时
  const handleDelete = (row:API.Supplier)=>{
    setTypeAddOrUpdate(true) // 将表单方式切回删除
    setDeleteSupplier({
      id:row.id,
      name:row.name,
    });
    setDeleteModalOpen(true)
  }
  // 在模态框里点击确认删除时
  const handleDeleteOk = () => {
    setDeleteModalLoading(true)
    // 删除用户
    apiOaSupplierDelete({id: deleteSupplier?.id} as API.apiOaSupplierDeleteParams).then(
      () => {
        setDeleteModalOpen(false)
        proTableRef.current?.reload()
        setDeleteModalLoading(false)
      })
  }

  // ProTable 的 columns定义
  const columns: ProColumns[] = [
    {
      key: 'name',
      title: '名称',
      dataIndex: 'name',
      search: false,
    },
    {
      key: 'service',
      title: '经营业务',
      dataIndex: 'service',
      search: false,
    },
    {
      key: 'category',
      title: '类别',
      dataIndex: 'category',
      onFilter: true,
      valueEnum:{
        "消防": {text: '消防' },
        "土建": {text: '土建', status: 'Error',},
        "电缆": {text: '电缆', status: 'Success'},//disabled: true,可以让它不能选择
        "其他": {text: '其他', status: 'Processing',},
      },
    },
    {
      key: 'phone',
      title: '公司联系电话',
      dataIndex: 'phone',
      search: false,
    },
    {
      key: 'manager_name',
      title: '负责人',
      dataIndex: 'manager_name',
      search: false,
    },
    {
      key: 'manager_phone',
      title: '负责人电话',
      dataIndex: 'manager_phone',
      search: false,
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, row) => [
        <Button size="small" key='update' onClick={()=>handleUpdate(row)}>修改</Button>,
        <Button size="small" key='delete' onClick={() =>handleDelete(row)} danger>删除</Button>,
      ],
    }
  ];

  return (
    <>
      <ProTable<API.Supplier>
        rowKey="id"
        key="id"
        headerTitle="供应商管理"
        columns={columns}
        actionRef={proTableRef}
        request={apiOaSupplierList}
        params={searchParams}
        pagination={{
          showQuickJumper: true,
          "pageSize":10,
        }}
        // 右上角三个调整按钮
        options={{
          search: true,
        }}
        // 左上角搜索栏
        toolbar={{
          multipleLine: true,
          search: {
            onSearch: handleSearch,
            placeholder:'搜索'
          }}}
        // 右上角按钮
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleAdd}>
            新增供应商
          </Button>
        ]}>
      </ProTable>
      <Modal
        title="供应商-删除"
        open={deleteModalOpen}
        onCancel={() => {setDeleteModalOpen(false)}}
        confirmLoading={deleteModalLoading}
        onOk={handleDeleteOk}
      >
        <p>请问你是否要删除{deleteSupplier?.name}</p>
      </Modal>
      <SupplierForm
        typeAddOrUpdate={typeAddOrUpdate}
        updateInit={updateSupplier}
        modalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        reload={proTableRef.current?.reload}
      />
    </>
  )
}
