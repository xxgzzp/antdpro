import React, { useState } from 'react';
import { Input, Button, Card, Typography, Row, Col, Badge, Tag, Image, Pagination, Divider, PaginationProps, Spin } from 'antd';
import { LoadingOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './Search.less';
import { apiBigdataProductSearch } from '@/services/ant-design-pro/api';
import { StringChain, isNull } from 'lodash';

const Search: React.FC = () => {
  const { Meta } = Card;
  const { Title, Text } = Typography;

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<API.YZWProduct[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async (page?:number) => {
    setSearchLoading(true);
    await apiBigdataProductSearch({ text: searchValue ,page : page}).then((response) => {
      setSearchResult(response.results);
    });
    setSearchLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const onPaginationChange = (e: any) => {
    handleSearch(e)
  };

  // 定义颜色映射
  const colorMapping = new Map();

  // 根据`item?.brandName`值设置不同的颜色
  const setBrandColor = (brandName: String | undefined) => {
    if (!colorMapping.has(brandName)) {
      // 生成随机颜色
      const color = getRandomColor();
      colorMapping.set(brandName, color);
    }
    return colorMapping.get(brandName);
  };

  // 生成随机颜色
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      <div className="search-container mb-4">
        <Input
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="搜索商品"
          suffix={
            <Button
              loading={searchLoading}
              type="primary"
              icon={<SearchOutlined />}
              onClick={()=>handleSearch()}
              className="search-button"
            />
          }
          className="search-input"
        />
      </div>
      {searchLoading ?
        <Spin />
      : <Row gutter={[16, 8]}>
        {searchResult?.map((item) => (
          // <Col xs={24} sm={12} md={8} lg={6} xl={4} key={'product'}>
          <Col span={6} key={'product'}>
            <Badge.Ribbon text={item?.brandName ? item?.brandName : undefined} color={setBrandColor(item?.brandName)} key='product_badge'>
              <Card
                style={{ padding: 10 }}
                hoverable
                cover={
                  <Image
                    style={{height: 200}}
                    alt={item?.itemName}
                    src={`http://zengzeping.com/media/YZWimage/${item?.image}`}
                    className="h-48 object-cover"
                  />
                }
                // actions={[<ShoppingCartOutlined key="addToCart" />]}
              >
                <Meta
                  title={
                    <div>
                      <Title level={5} className="truncate">
                        {item?.itemName}
                      </Title>
                    </div>
                  }
                  description={
                    <div className="flex flex-col">
                      {/* <Text className="text-gray-500">{item?.itemName}</Text> */}
                      <Text className="text-red-500 font-bold">
  {item?.minPrice !== item?.maxPrice ? `￥${item?.minPrice}~${item?.maxPrice}/${item?.unitName}` : `￥${item?.minPrice}/${item?.unitName}`}
</Text>
                    </div>
                  }
                />
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
         <Col span={6} key={'product_'}>
          <Divider />
          </Col>
      </Row>}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {searchResult?.length === 0 ? null : <Pagination defaultCurrent={1} total={500} onChange={onPaginationChange}/>}



    </div>


    </div>


  );
};

export default Search;
