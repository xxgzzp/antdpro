import { useState } from 'react';

export default () => {
  const [reloadKey, setReloadKey] = useState<number>(0);
  return {
    reloadKey,
    setReloadKey,
  };
};
