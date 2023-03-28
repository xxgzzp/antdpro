import { UploadOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Upload } from 'antd';
import Cookies from 'js-cookie';
import React from 'react';
import { toast } from 'react-toastify';

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

  const props = {
    name: 'file',
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken') as string,
      Authorization: `Token ${localStorage.getItem('Token')}`,
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent?: number, successPercent?: number) =>
        percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    action: `/api/material/order/${order_id}/file/`,
    onChange: handlerChange,
  };
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />} type="text">
        导入材料单
      </Button>
    </Upload>
  );
};

export default UploadMy;
