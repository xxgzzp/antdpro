import UserCard from '@/pages/User/UserCenter/UserCard';
import UserOrder from '@/pages/User/UserOrder';
import { GridContent } from '@ant-design/pro-layout';
import { Col, Row } from 'antd';
import React, { useState } from 'react';

export type tabKeyType = 'articles' | 'applications' | 'projects';

const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const [tabKey, setTabKey] = useState<tabKeyType>('articles');
  // const Projects: React.FC = () => {
  //   // 获取tab列表数据
  // //   const { data: listData } = useRequest(() => {
  // //     return queryFakeList({
  //       count: 30,
  //     });
  //   });
  //
  //   return (
  //     <List
  //       className={styles.coverCardList}
  //       rowKey="id"
  //       grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
  //       dataSource={listData?.list || []}
  //       renderItem={(item) => (
  //         <List.Item>
  //           <Card
  //             className={styles.card}
  //             hoverable
  //             cover={<img alt={item.title} src={item.cover} />}
  //           >
  //             <Card.Meta title={<a>{item.title}</a>} description={item.subDescription} />
  //             <div className={styles.cardItemContent}>
  //               <span>{moment(item.updatedAt).fromNow()}</span>
  //               <div className={styles.avatarList}>
  //                 <AvatarList size="small">
  //                   {item.members.map((member) => (
  //                     <AvatarList.Item
  //                       key={`${item.id}-avatar-${member.id}`}
  //                       src={member.avatar}
  //                       tips={member.name}
  //                     />
  //                   ))}
  //                 </AvatarList>
  //               </div>
  //             </div>
  //           </Card>
  //         </List.Item>
  //       )}
  //     />
  //   );
  // };
  //
  // // 渲染tab切换
  // const renderChildrenByTabKey = (tabValue: tabKeyType) => {
  //   if (tabValue === 'projects') {
  //     return <Projects />;
  //   }
  //   if (tabValue === 'applications') {
  //     return <Projects />;
  //   }
  //   if (tabValue === 'articles') {
  //     return <Projects />;
  //   }
  //   return null;
  // };
  //
  // const operationTabList = [
  //   {
  //     key: 'articles',
  //     tab: (
  //       <span>
  //         文章 <span style={{ fontSize: 14 }}>(8)</span>
  //       </span>
  //     ),
  //   },
  //   {
  //     key: 'applications',
  //     tab: (
  //       <span>
  //         应用 <span style={{ fontSize: 14 }}>(8)</span>
  //       </span>
  //     ),
  //   },
  //   {
  //     key: 'projects',
  //     tab: (
  //       <span>
  //         项目 <span style={{ fontSize: 14 }}>(8)</span>
  //       </span>
  //     ),
  //   },
  // ];

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <UserCard></UserCard>
        </Col>
        <Col lg={17} md={24}>
          <div style={{ paddingLeft: '10' }}>
            <UserOrder></UserOrder>
          </div>
        </Col>
      </Row>
    </GridContent>
  );
};
export default InfoCard;
