import ProjectForm from '@/pages/Project/ProjectForm';
import { apiOaProjectDelete, apiOaProjectList } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
export default function SupplierList() {
  const proTableRef = useRef<ActionType>();
  // 关闭和打开SupplierForm模态框
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [updateProject, setUpdateProject] = useState<API.Project>();
  const [typeAddOrUpdate, setTypeAddOrUpdate] = useState<boolean>(true);
  // 删除中 控制删除model
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteModalLoading, setDeleteModalLoading] = useState<boolean>(false);
  const [deleteProject, setDeleteProject] = useState<{ id: number | undefined; name: string }>();
  // 在 onSearch 方法中更新搜索条件
  const [searchParams, setSearchParams] = useState({});

  const handleSearch = (value: string) => {
    setSearchParams({ search: value });
  };
  const handleUpdate = (row: API.Project) => {
    setModalOpen(true);
    setTypeAddOrUpdate(false); // 将表单方式切回更新
    setUpdateProject(row);
  };
  const handleAdd = () => {
    setModalOpen(true);
    setTypeAddOrUpdate(true);
  };
  // 点击删除时
  const handleDelete = (row: API.Supplier) => {
    setTypeAddOrUpdate(true); // 将表单方式切回删除
    setDeleteProject({
      id: row.id,
      name: row.name,
    });
    setDeleteModalOpen(true);
  };
  // 在模态框里点击确认删除时
  const handleDeleteOk = () => {
    setDeleteModalLoading(true);
    // 删除用户
    apiOaProjectDelete({ id: deleteProject?.id } as API.apiOaProjectDeleteParams).then(() => {
      setDeleteModalOpen(false);
      proTableRef.current?.reload();
      setDeleteModalLoading(false);
    });
  };

  // ProTable 的 columns定义
  const columns: ProColumns[] = [
    {
      title: '项目名称',
      dataIndex: 'name',
      search: {
        // @ts-ignore
        key: 'search',
      },
    },
    {
      title: '项目地址',
      dataIndex: 'address',
      search: false,
    },
    {
      title: '项目经理',
      dataIndex: 'manager_name',
      search: false,
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, row) => [
        <Button size="small" key="update" type="link" onClick={() => handleUpdate(row)}>
          修改
        </Button>,
        <Button size="small" key="delete" type="link" onClick={() => handleDelete(row)} danger>
          删除
        </Button>,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.Project>
        rowKey="id"
        headerTitle="项目管理"
        columns={columns}
        actionRef={proTableRef}
        request={apiOaProjectList}
        params={searchParams}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
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
            placeholder: '搜索',
          },
        }}
        // 右上角按钮
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleAdd}>
            新增项目
          </Button>,
        ]}
      ></ProTable>
      <Modal
        title="项目-删除"
        open={deleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false);
        }}
        confirmLoading={deleteModalLoading}
        onOk={handleDeleteOk}
      >
        <p>请问你是否要删除{deleteProject?.name}</p>
      </Modal>
      <ProjectForm
        typeAddOrUpdate={typeAddOrUpdate}
        updateInit={updateProject}
        modalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        reload={proTableRef.current?.reload}
      />
    </>
  );
}
