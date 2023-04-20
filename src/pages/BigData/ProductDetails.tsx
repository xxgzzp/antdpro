import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { Card, List, Typography, Carousel } from 'antd';
import { apiBigdataProductRead, apiBigdataProductGetSku } from '@/services/ant-design-pro/api';
import './ProductDetails.less'
import {useModel} from "@@/exports";

const ProductDetail: React.FC<{
  prop_product_id: string;
}> = ({prop_product_id}) => {
  const { product_id } = useParams<{ product_id: string }>();
  const { loading, data: product,run:getProduct } = useRequest(apiBigdataProductRead,{manual:true});
  const [skuList, setSkuList] = useState<API.YZWProductSku[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>();
  const [selectedSku, setSelectedSku] = useState<string>(null);
  const {setSelectSku:_sss} = useModel('productSelect')
  useEffect(
    ()=>{
      if (prop_product_id){
        getProduct({id:prop_product_id})
      }
      if (product_id){
        getProduct({id:product_id})
      }
    },[product_id,prop_product_id]
  )
  useEffect(() => {
    if (product?.skuId === undefined) return;
    setImageUrls([product?.image])
    //@ts-ignore
    apiBigdataProductGetSku({ sku_id: product?.skuId }).then((response) => {
      setSkuList(response?.results);
    });
  }, [product]);

  const handleSkuClick = (sku: API.YZWProductSku) => {
    setSelectedSku(sku?.id)
    _sss(sku)
    setImageUrls(sku?.image_urls);
  };


  return (
    <div className="container mx-auto py-5">
      <Card>
        <Typography.Title level={4}>{product?.itemName}</Typography.Title>
        <Typography.Text>
          品牌：{product?.brandName} | 类别：{product?.threeCategoryName} | 参考价：￥{product?.minPrice} - ￥{product?.maxPrice}
        </Typography.Text>
      </Card>
      <div className="flex" >
        <div className="w-1/2">
          <Carousel dotPosition={"bottom"} >
            {imageUrls?.map((url) => (
              <img src={`https://oss-img-mro.yzw.cn/mro-item-sku/${url}`} alt={product?.itemName} key={url} />
            ))}
          </Carousel>
        </div>
        <div className="w-1/2 pl-5">
          <Card className="text-left w-full" loading={loading}>
            <List
              style={{ maxHeight: '600px', overflow: 'auto' }}
              dataSource={skuList}
              renderItem={(sku) => (
                <List.Item>
                  <Card onClick={() => handleSkuClick(sku)} className={selectedSku === sku?.id ? "selected-sku w-full" : "w-full"}>
                    <div className="flex items-center" >
                      <div className="w-3/4 pl-5" >
                        <Typography.Text strong>SKU属性：</Typography.Text>
                        <Typography.Text>{sku.model}</Typography.Text>
                        <br />
                        <Typography.Text strong>价格：</Typography.Text>
                        <Typography.Text>￥{sku.price}</Typography.Text>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
