import { apiMaterialMaterialList, apiMaterialOrderItemList } from '@/services/ant-design-pro/api';
import { Autocomplete, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

function OrderItemList() {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [materialOptions, setMaterialOptions] = useState([]);
  useEffect(() => {
    setLoading(true);
    apiMaterialOrderItemList({}).then((res) => {
      setLoading(false);
      setOrderItems(res.results);
    });
  }, []);
  const handleMaterialNameChange = (event, value, params) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[params.rowIndex].materialName = value;
    setOrderItems(updatedOrderItems);
  };
  const handleMaterialNameSearch = (event, value) => {
    apiMaterialMaterialList({ search: value }).then((res) => {
      setMaterialOptions(res.results);
    });
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'materialName',
      headerName: 'Material Name',
      width: 200,
      valueGetter: (params) => params.row.material.sku,
      renderCell: (params) => (
        <Autocomplete
          options={materialOptions}
          value={params.value}
          onChange={(event, value) => handleMaterialNameChange(event, value, params)}
          onInputChange={handleMaterialNameSearch}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Material Name" variant="standard" />
          )}
        />
      ),
    },
    {
      field: 'materialSku',
      headerName: 'Material SKU',
      width: 200,
      valueGetter: (params) => params.row.material.sku,
    },
    { field: 'need_time', headerName: 'Need Time', width: 150, editable: true, resizable: true },
    { field: 'buy_num', headerName: 'Buy Num', width: 120, editable: true, resizable: true },
    { field: 'used_site', headerName: 'Used Site', width: 150, editable: true, resizable: true },
    { field: 'sort', headerName: 'Sort', width: 120, editable: true, resizable: true },
    { field: 'is_arrival', headerName: 'Is Arrival', width: 120, editable: true, resizable: true },
    { field: 'order', headerName: 'Order', width: 200, editable: true, resizable: true },
    { field: 'contract', headerName: 'Contract', width: 200, editable: true, resizable: true },
    { field: 'receipt', headerName: 'Receipt', width: 200, editable: true, resizable: true },
  ];
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid rows={orderItems} columns={columns} loading={loading} autoHeight={true} />
    </div>
  );
}

export default OrderItemList;
