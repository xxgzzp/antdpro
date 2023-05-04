import {Badge, Card, Col,Image, Typography } from "antd";
import {useModel} from "@@/exports";
import {settings} from "@/settings";

export const Product:React.FC<{
  item: API.YZWProduct;
}> = ({item}) => {
  const { Meta } = Card;
  const { Title, Text } = Typography;
  // 定义颜色映射
  const colorMapping = new Map();
  const {setSelectSku} = useModel('productSelect')
  // 根据`item?.brandName`值设置不同的颜色
  const setBrandColor = (brandName: string | undefined) => {
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
  return (
    <Badge.Ribbon
      text={item?.brandName ? item?.brandName : undefined}
      color={setBrandColor(item?.brandName)}
      key="product_badge"
    >
      <Card
        style={{ padding: 10 }}
        hoverable
        cover={
          <Image
            style={{ height: 200 }}
            alt={item?.itemName}
            src={`http://${settings.host}/media/YZWimage/${item?.image}`}
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
                {item?.minPrice !== item?.maxPrice
                  ? `￥${item?.minPrice}~${item?.maxPrice}/${item?.unitName}`
                  : `￥${item?.minPrice}/${item?.unitName}`}
              </Text>
            </div>
          }
        />
      </Card>
    </Badge.Ribbon>
  );
};

