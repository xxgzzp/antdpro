import { useWebSocket } from 'ahooks';
import { AutoComplete, Input } from 'antd';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
const MaterialAutoComplete = () => {
  const [options, setOptions] = useState([]);
  const { sendMessage, latestMessage } = useWebSocket('ws://localhost:8001/ws/material/');
  const handleSearch = (value: string | ArrayBufferLike | Blob | ArrayBufferView) => {
    if (sendMessage) {
      sendMessage(value);
    }
  };
  // 防抖
  const debouncedHandleSearch = debounce(handleSearch, 100);
  useEffect(() => {
    if (latestMessage !== null && latestMessage !== undefined) {
      const materialNameOptions = JSON.parse(latestMessage.data);
      setOptions(materialNameOptions);
    }
  }, [latestMessage]);
  return (
    <AutoComplete
      options={options}
      onSearch={debouncedHandleSearch}
      placeholder="请输入材料与设备名称"
    >
      <Input.Search size="large" />
    </AutoComplete>
  );
};
export default MaterialAutoComplete;
