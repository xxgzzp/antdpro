import { UploadOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Upload } from 'antd';
import Cookies from 'js-cookie';
import React from 'react';
import { toast } from 'react-toastify';

const props = {
  name: 'file',
  headers: {
    // 忘记这里要加csrf了，唉，刚刚弄了好久才知道request的拦截器在这里不生效
    'X-CSRFToken': Cookies.get('csrftoken'),
    Authorization: ` Token ${localStorage.getItem(' Token ')}`,
  },
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent: number) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};

const UploadMy: React.FC<{
  order_id: string | undefined;
}> = ({ order_id }) => {
  const { reloadKey, setReloadKey } = useModel('tableReload');
  const handlerChange = (info: { file: { name?: any; status?: any }; fileList: any }) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      toast.success(`${info.file.name} 上传成功.`);
      setReloadKey(reloadKey + 1);
    } else if (status === 'error') {
      toast.error(`${info.file.name} 上传失败.`);
    }
  };
  return (
    <Upload {...props} action={`/api/material/order/${order_id}/file/`} onChange={handlerChange}>
      <Button icon={<UploadOutlined />} type="text" style={{ display: 'inline-block' }}>
        导入材料单
      </Button>
    </Upload>
  );
};

export default UploadMy;
