import { useLocalStorageState } from 'ahooks';
export interface ContractLocal {
  id: string;
  items: API.ContractItem[];
}

const useContractLocalStorage = () => {
  const [contracts, setContracts] = useLocalStorageState<ContractLocal[]>('contracts');
  const getContractLocal = (contractId: string) => {
    if (!contracts) {
      return undefined;
    }
    return contracts.filter((contract) => contract.id === contractId);
  };
  const addContractLocal = (newContract: ContractLocal) => {
    if (!contracts) {
      setContracts([newContract]);
      return;
    }
    const updatedContracts = [...contracts, newContract];
    setContracts(updatedContracts);
  };
  const deleteContractLocal = (contractId: string) => {
    if (!contracts) {
      return;
    }
    const updatedContracts = contracts.filter((contract) => contract.id !== contractId);
    setContracts(updatedContracts);
  };
  const updateContractLocal = (updatedContract: ContractLocal) => {
    // 如果不存在就先添加
    if (!getContractLocal(updatedContract.id)?.length) {
      addContractLocal(updatedContract);
      return;
    }
    // 如果存在就更新
    const updatedContracts = contracts.map((contract) => {
      if (contract.id === updatedContract.id) {
        return updatedContract;
      }
      return contract;
    });
    setContracts(updatedContracts);
  };
  const getAllContractsLocal = () => {
    return contracts;
  };

  return {
    getContractLocal,
    addContractLocal,
    deleteContractLocal,
    updateContractLocal,
    getAllContractsLocal,
  };
};
export default useContractLocalStorage;
