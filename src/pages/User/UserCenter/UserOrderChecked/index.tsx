import { ProList } from '@ant-design/pro-components';

import { history } from '@@/exports';

import { formatDate } from '@/components/Utils/formatDate';
import { apiMaterialOrderCheckedPartialUpdate } from '@/services/ant-design-pro/api';
import { Button, Space, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UserOrderChecked: React.FC<{
  date: any;
  loading: boolean;
  // @ts-ignore
}> = ({ data, loading }) => {
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const [passLoading, setPassLoading] = useState(false);
  const handlerPass = (row: any) => {
    setPassLoading(true);
    // @ts-ignore
    apiMaterialOrderCheckedPartialUpdate({ id: row.id }, { sp_status: 2 })
      .then(() => {
        setPassLoading(false);
        toast.success('修改成功');
      })
      .catch(() => {
        setPassLoading(false);
        toast.error('修改失败');
      });
  };
  const [noPassLoading, setNoPassLoading] = useState(false);
  const handlerNoPass = (row: any) => {
    setNoPassLoading(true);
    // @ts-ignore
    apiMaterialOrderCheckedPartialUpdate({ id: row.id }, { sp_status: 3 })
      .then(() => {
        setNoPassLoading(false);
        toast.success('修改成功');
      })
      .catch(() => {
        setNoPassLoading(false);
        toast.error('修改失败');
      });
  };

  const badgeColor: { [key: number]: string } = {
    //   (0, "审核单未创建"),
    //   (1, "审批中"),
    //   (2, "已通过"),
    //   (3, "已驳回"),
    //   (4, "已撤销"),
    //   (6, "通过后撤销"),
    //   (7, "已删除"),
    //   (10, "已支付"),
    0: '#424949',
    1: '#1B4F72',
    2: '#239B56',
    3: 'orange',
    4: 'purple',
    6: '#52BE80',
    7: 'red',
    10: 'green',
  };

  return (
    <div
      style={{
        margin: -24,
        padding: 24,
      }}
    >
      <ProList<any>
        onRow={(record: any) => {
          return {
            onClick: () => {
              history.push(`/order/${record.order}/orderitems`);
            },
          };
        }}
        dataSource={data}
        loading={loading}
        rowKey="id"
        showActions="hover"
        showExtra="hover"
        metas={{
          title: {
            dataIndex: 'order_name',
          },
          avatar: {
            dataIndex: 'created_by_avatar',
          },
          // description: {
          //   dataIndex: 'desc',
          // },
          subTitle: {
            render: (_, record) => {
              return (
                <Space size={0}>
                  <Tag color="#5BD8A6">
                    {record?.created_time ? formatDate(record?.created_time) : record?.created_time}
                  </Tag>
                  <Tag color={badgeColor[record?.sp_status]}>
                    {record?.sp_status_name ? record?.sp_status_name : '企业微信审批单未创建'}
                  </Tag>
                </Space>
              );
            },
          },
          actions: {
            render: (text, row) => [
              <Button type="link" loading={passLoading} onClick={() => handlerPass(row)}>
                通过
              </Button>,
              <Button type="link" loading={noPassLoading} onClick={() => handlerNoPass(row)}>
                不通过
              </Button>,
            ],
          },
        }}
      />
    </div>
  );
};

export default UserOrderChecked;
