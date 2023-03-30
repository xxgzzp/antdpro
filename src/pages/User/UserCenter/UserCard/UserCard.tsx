import { ClusterOutlined, ContactsOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Avatar, Card, Divider, Tag } from 'antd';
import React, { useEffect } from 'react';
import styles from './UserCard.less';

const UserCard: React.FC = () => {
  const { user, loading, ready, toggleUser } = useModel('user');

  useEffect(() => {
    if (!ready) {
      toggleUser();
    }
  }, [ready]);

  //  渲染用户信息
  const renderUserInfo = (user: API.User) => {
    return (
      <div className={styles.detail}>
        <p>
          <ContactsOutlined
            style={{
              marginRight: 8,
            }}
          />
          职位:&nbsp;&nbsp;&nbsp;
          {user?.identity_name}
        </p>
        <p>
          <ClusterOutlined
            style={{
              marginRight: 8,
            }}
          />
          所在项目-部门:&nbsp;&nbsp;&nbsp;
          {`${user?.project_name}-${user?.department_name}`}
        </p>
        <p>
          <ClusterOutlined
            style={{
              marginRight: 8,
            }}
          />
          参与项目:&nbsp;&nbsp;&nbsp;
          {user?.membership?.map((item) => (
            <Tag key={item?.identity_name}>{item?.project_name}</Tag>
          ))}
        </p>
      </div>
    );
  };

  return (
    <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
      {!loading && user && (
        <div>
          <div className={styles.avatarHolder}>
            <Avatar size={120} src={user?.avatar} />
            <div style={{ paddingTop: '30px' }}></div>
            <div className={styles.name}>{user?.name}</div>
          </div>
          {renderUserInfo(user)}
          <Divider style={{ marginTop: 16 }} dashed />
        </div>
      )}
    </Card>
  );
};
export default UserCard;
