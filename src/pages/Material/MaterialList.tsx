import {
  apiMaterialMaterialCreate,
  apiMaterialMaterialDelete,
  apiMaterialMaterialList,
  apiMaterialMaterialPartialUpdate,
} from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { message } from 'antd';
import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
const MaterialList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.Material>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 200,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      title: '规格',
      dataIndex: 'sku',
      width: 200,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      title: '单位',
      dataIndex: 'unit',
      width: 100,
      formItemProps: {
        rules: [{ required: true }],
      },
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      width: 200,
      hideInSearch: true,
      editable: false,
    },
    {
      title: '创建者',
      dataIndex: 'created_by',
      width: 100,
      hideInSearch: true,
      editable: false,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            // @ts-ignore
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            apiMaterialMaterialDelete({ id: record.id }).then(() => {
              message.success('删除成功');
              actionRef.current?.reload();
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <EditableProTable<API.Material>
      actionRef={actionRef}
      rowKey="id"
      request={apiMaterialMaterialList}
      columns={columns}
      // scroll={{ y: 400 }} // 这样设置可以让它滚动起来
      editable={{
        type: 'single',
        onSave: async (key, record) => {
          try {
            const res =
              'newRow' in record
                ? await apiMaterialMaterialCreate(record)
                : await apiMaterialMaterialPartialUpdate({ id: record.id }, record);
            message.success('保存成功');
            actionRef.current?.reload();
          } catch (err) {
            console.log(err);
            message.error('保存失败，请重试');
          }
        },
        onDelete: async (key, record) => {
          await apiMaterialMaterialDelete({ id: record.id });
          message.success('删除成功');
          actionRef.current?.reload();
        },
      }}
      recordCreatorProps={{
        // 设置唯一的key 不设置不让下面的新增
        record: () => ({ id: uuidv4(), newRow: true }),
        // 设置初始值
        creatorButtonText: '添加新行',
        creatorButtonProps: {
          type: 'dashed',
          icon: <PlusOutlined />,
        },
      }}
      rowSelection={{}}
      search={{
        labelWidth: 'auto',
        defaultCollapsed: false,
      }}
      pagination={
        {
          // pageSize: 10,
        }
      }
      dateFormatter="string"
      headerTitle="材料列表"
    />
  );
};
export default MaterialList;
