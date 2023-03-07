import { isEqual } from 'lodash';

const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const obj1 = [
    {
      id: '33fff913-b411-473f-8376-c74f8a76025c',
      material_name: '沟槽异径管',
    },
    {
      id: '70a17337-e819-4db3-994e-f772b8d00b62',
      material_name: '镀锌弯头',
    },
  ];
  const obj2 = [
    {
      id: '33fff913-b411-473f-8376-c74f8a76025c',
      material_name: '沟槽异径管',
    },
    {
      id: '70a17337-e819-4db3-994e-f772b8d00b62',
      material_name: '镀锌弯头',
    },
  ];

  const isEqualObjects = isEqual(obj1, obj2);

  console.log(isEqualObjects); // 输出 true
  return <div></div>;
};
export default InfoCard;
