import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Avatar, Card } from 'antd';
import React, { useEffect } from 'react';

const { Meta } = Card;

const UserCard: React.FC = () => {
  const { user, userModalOpen, setUserModalOpen, ready, toggleUser } = useModel('user');
  const localToken = localStorage.getItem(' Token ');

  useEffect(() => {
    if (localToken !== null) {
      // 如果还没全局请求user 就请求
      if (ready === false) {
        toggleUser();
      }
    }
  }, []);

  return (
    <Card
      style={{ width: 300 }}
      // cover={
      //   <img
      //     alt="example"
      //     src={
      //       user?.avatar
      //         ? user?.avatar
      //         : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      //     }
      //   />
      // }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined
          key="edit"
          onClick={() => {
            setUserModalOpen(true);
          }}
        />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar src={user?.avatar ? user?.avatar : './avatar.svg'} />}
        title={user?.name}
        description={user?.identity_name}
      />
    </Card>
  );
};

export default UserCard;
