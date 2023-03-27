import { useLocalStorageState } from 'ahooks';
export interface OrderLocal {
  id: string;
  items: API.OrderItem[];
}

const useOrderLocalStorage = () => {
  const [orders, setOrders] = useLocalStorageState<OrderLocal[]>('orders');
  const getOrderLocal = (orderId: string) => {
    if (!orders) {
      return undefined;
    }
    return orders.filter((order) => order.id === orderId);
  };
  const addOrderLocal = (newOrder: OrderLocal) => {
    if (!orders) {
      setOrders([newOrder]);
      return;
    }
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
  };
  const deleteOrderLocal = (orderId: string) => {
    if (!orders) {
      return;
    }
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
  };
  const updateOrderLocal = (updatedOrder: OrderLocal) => {
    // 如果不存在就先添加
    if (!getOrderLocal(updatedOrder.id)?.length) {
      addOrderLocal(updatedOrder);
      return;
    }
    // 如果存在就更新
    const updatedOrders = orders.map((order) => {
      if (order.id === updatedOrder.id) {
        return updatedOrder;
      }
      return order;
    });
    setOrders(updatedOrders);
  };
  const getAllOrdersLocal = () => {
    return orders;
  };

  return {
    getOrderLocal,
    addOrderLocal,
    deleteOrderLocal,
    updateOrderLocal,
    getAllOrdersLocal,
  };
};
export default useOrderLocalStorage;
