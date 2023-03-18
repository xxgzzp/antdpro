import { useMap, useWebSocket } from 'ahooks';
import { useEffect } from 'react';
interface Option {
  value: string | undefined;
  label: string | undefined;
}
export default () => {
  const [map, { set: setOptions, get: getOptions }] = useMap<string, Option[]>([]);
  const { sendMessage, latestMessage } = useWebSocket('ws://localhost:8001/ws/material/');

  // webSocket发送消息
  const handleSearch = (dataIndex: string, text: string) => {
    if (sendMessage) {
      sendMessage(
        JSON.stringify({
          data_index: dataIndex,
          text: text,
        }),
      );
    }
  };

  // webSocket接收消息
  useEffect(() => {
    if (latestMessage !== null && latestMessage !== undefined) {
      const material = JSON.parse(latestMessage.data);
      if (material?.results) {
        const materialOptions = material?.results.map((r: { value: string }) => ({
          value: r.value,
          label: r.value,
        }));
        setOptions(material.data_index, materialOptions);
      }
    }
  }, [latestMessage]);
  return { setOptions, getOptions, map, handleSearch };
};
