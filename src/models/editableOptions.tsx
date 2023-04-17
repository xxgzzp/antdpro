import { useMap, useWebSocket } from 'ahooks';
import { useEffect } from 'react';
interface Option {
  value: string | undefined;
  label: string | undefined;
}

export default () => {
  const [map, { set: setOptions, get: getOptions }] = useMap<string, Option[]>([]);

  const { readyState, sendMessage, latestMessage, connect, disconnect } = useWebSocket(
    'wss://zengzeping.com/ws/material/',
    {
      manual: true,
    },
  );

  // webSocket发送消息
  const handleSearch = (dataIndex: string, text: string) => {
    if(readyState === 1){
      if (sendMessage) {
        sendMessage(
          JSON.stringify({
            data_index: dataIndex,
            text: text,
          }),
        );
      }
    }else if (connect) {
      connect()
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

  return { setOptions, getOptions, map, handleSearch, connect, disconnect, readyState };
};
