import { useState } from 'react';

export default () => {

  const [isSelect,setIsSelect] = useState(false)
  const [selectSku,setSelectSku]=useState()
  const [rowSelect,setRowSelect]=useState()

  return {
    isSelect,
    setIsSelect,
    selectSku,
    setSelectSku,
    rowSelect,
    setRowSelect,
  };
};

