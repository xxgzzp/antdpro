// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/bigdata/product/ */
export async function apiBigdataProductList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiBigdataProductListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.YZWProduct[] }>(
    '/api/bigdata/product/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/bigdata/product/ */
export async function apiBigdataProductCreate(
  body: API.YZWProduct,
  options?: { [key: string]: any },
) {
  return request<API.YZWProduct>('/api/bigdata/product/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/bigdata/product/${param0}/ */
export async function apiBigdataProductRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiBigdataProductReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.YZWProduct>(`/api/bigdata/product/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/bigdata/product/${param0}/ */
export async function apiBigdataProductUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiBigdataProductUpdateParams,
  body: API.YZWProduct,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.YZWProduct>(`/api/bigdata/product/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/bigdata/product/${param0}/ */
export async function apiBigdataProductDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiBigdataProductDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/bigdata/product/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/bigdata/product/${param0}/ */
export async function apiBigdataProductPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiBigdataProductPartialUpdateParams,
  body: API.YZWProduct,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.YZWProduct>(`/api/bigdata/product/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 搜索商品 GET /api/bigdata/product/search/ */
export async function apiBigdataProductSearch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiBigdataProductSearchParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.YZWProduct[] }>(
    '/api/bigdata/product/search/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/dashboard/ */
export async function apiDashboardList(options?: { [key: string]: any }) {
  return request<any>('/api/dashboard/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/material/contract_commit/ */
export async function apiMaterialContractCommitCreate(options?: { [key: string]: any }) {
  return request<any>('/api/material/contract_commit/', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/contract_item/ */
export async function apiMaterialContractItemList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractItemListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.ContractItem[] }>(
    '/api/material/contract_item/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/material/contract_item/ */
export async function apiMaterialContractItemCreate(
  body: API.ContractItem,
  options?: { [key: string]: any },
) {
  return request<API.ContractItem>('/api/material/contract_item/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/contract_item/${param0}/ */
export async function apiMaterialContractItemRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractItemReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ContractItem>(`/api/material/contract_item/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/material/contract_item/${param0}/ */
export async function apiMaterialContractItemUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractItemUpdateParams,
  body: API.ContractItem,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ContractItem>(`/api/material/contract_item/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/material/contract_item/${param0}/ */
export async function apiMaterialContractItemDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractItemDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/material/contract_item/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/material/contract_item/${param0}/ */
export async function apiMaterialContractItemPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractItemPartialUpdateParams,
  body: API.ContractItem,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ContractItem>(`/api/material/contract_item/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/contract_permission/ */
export async function apiMaterialContractPermissionList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractPermissionListParams,
  options?: { [key: string]: any },
) {
  return request<{
    count: number;
    next?: string;
    previous?: string;
    results: API.ContractPermission[];
  }>('/api/material/contract_permission/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/material/contract_permission/ */
export async function apiMaterialContractPermissionCreate(
  body: API.ContractPermission,
  options?: { [key: string]: any },
) {
  return request<API.ContractPermission>('/api/material/contract_permission/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/contract_permission/${param0}/ */
export async function apiMaterialContractPermissionRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractPermissionReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ContractPermission>(`/api/material/contract_permission/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/material/contract_permission/${param0}/ */
export async function apiMaterialContractPermissionUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractPermissionUpdateParams,
  body: API.ContractPermission,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ContractPermission>(`/api/material/contract_permission/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/material/contract_permission/${param0}/ */
export async function apiMaterialContractPermissionDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractPermissionDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/material/contract_permission/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/material/contract_permission/${param0}/ */
export async function apiMaterialContractPermissionPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractPermissionPartialUpdateParams,
  body: API.ContractPermission,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ContractPermission>(`/api/material/contract_permission/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/contract/ */
export async function apiMaterialContractList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.Contract[] }>(
    '/api/material/contract/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/material/contract/ */
export async function apiMaterialContractCreate(
  body: API.Contract,
  options?: { [key: string]: any },
) {
  return request<API.Contract>('/api/material/contract/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/contract/${param0}/ */
export async function apiMaterialContractRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Contract>(`/api/material/contract/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/material/contract/${param0}/ */
export async function apiMaterialContractUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractUpdateParams,
  body: API.Contract,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Contract>(`/api/material/contract/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/material/contract/${param0}/ */
export async function apiMaterialContractDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/material/contract/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/material/contract/${param0}/ */
export async function apiMaterialContractPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractPartialUpdateParams,
  body: API.Contract,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Contract>(`/api/material/contract/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/material/contract/${param0}/check_material_in_contract/ */
export async function apiMaterialContractCheckMaterialInContract(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractCheckMaterialInContractParams,
  body: API.Contract,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Contract>(`/api/material/contract/${param0}/check_material_in_contract/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/contract/${param0}/contract_items/ */
export async function apiMaterialContractContractItems(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractContractItemsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Contract>(`/api/material/contract/${param0}/contract_items/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定合同的所有权限记录 GET /api/material/contract/${param0}/contract_permissions/ */
export async function apiMaterialContractContractPermissions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractContractPermissionsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Contract>(`/api/material/contract/${param0}/contract_permissions/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/contract/contract_select/ */
export async function apiMaterialContractContractSelect(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialContractContractSelectParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.Contract[] }>(
    '/api/material/contract/contract_select/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/material/contractcategory/ */
export async function apiMaterialContractcategoryList(options?: { [key: string]: any }) {
  return request<any>('/api/material/contractcategory/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/invoice/ */
export async function apiMaterialInvoiceList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialInvoiceListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.Invoice[] }>(
    '/api/material/invoice/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/material/invoice/ */
export async function apiMaterialInvoiceCreate(
  body: API.Invoice,
  options?: { [key: string]: any },
) {
  return request<API.Invoice>('/api/material/invoice/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/invoice/${param0}/ */
export async function apiMaterialInvoiceRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialInvoiceReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Invoice>(`/api/material/invoice/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/material/invoice/${param0}/ */
export async function apiMaterialInvoiceUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialInvoiceUpdateParams,
  body: API.Invoice,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Invoice>(`/api/material/invoice/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/material/invoice/${param0}/ */
export async function apiMaterialInvoiceDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialInvoiceDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/material/invoice/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/material/invoice/${param0}/ */
export async function apiMaterialInvoicePartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialInvoicePartialUpdateParams,
  body: API.Invoice,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Invoice>(`/api/material/invoice/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/material_all/ */
export async function apiMaterialMaterialAllList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialMaterialAllListParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/material/material_all/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/material/ */
export async function apiMaterialMaterialList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialMaterialListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.Material[] }>(
    '/api/material/material/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/material/material/ */
export async function apiMaterialMaterialCreate(
  body: API.Material,
  options?: { [key: string]: any },
) {
  return request<API.Material>('/api/material/material/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/material/${param0}/ */
export async function apiMaterialMaterialRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialMaterialReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Material>(`/api/material/material/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/material/material/${param0}/ */
export async function apiMaterialMaterialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialMaterialUpdateParams,
  body: API.Material,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Material>(`/api/material/material/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/material/material/${param0}/ */
export async function apiMaterialMaterialDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialMaterialDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/material/material/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/material/material/${param0}/ */
export async function apiMaterialMaterialPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialMaterialPartialUpdateParams,
  body: API.Material,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Material>(`/api/material/material/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/order_checked/ */
export async function apiMaterialOrderCheckedList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderCheckedListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.OrderChecked[] }>(
    '/api/material/order_checked/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/material/order_checked/ */
export async function apiMaterialOrderCheckedCreate(
  body: API.OrderChecked,
  options?: { [key: string]: any },
) {
  return request<API.OrderChecked>('/api/material/order_checked/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/order_checked/${param0}/ */
export async function apiMaterialOrderCheckedRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderCheckedReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrderChecked>(`/api/material/order_checked/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/material/order_checked/${param0}/ */
export async function apiMaterialOrderCheckedUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderCheckedUpdateParams,
  body: API.OrderChecked,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrderChecked>(`/api/material/order_checked/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/material/order_checked/${param0}/ */
export async function apiMaterialOrderCheckedDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderCheckedDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/material/order_checked/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/material/order_checked/${param0}/ */
export async function apiMaterialOrderCheckedPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderCheckedPartialUpdateParams,
  body: API.OrderChecked,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrderChecked>(`/api/material/order_checked/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/order_checked/user_order_checked/ */
export async function apiMaterialOrderCheckedUserOrderChecked(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderCheckedUserOrderCheckedParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.OrderChecked[] }>(
    '/api/material/order_checked/user_order_checked/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/material/order_commit/ */
export async function apiMaterialOrderCommitCreate(options?: { [key: string]: any }) {
  return request<any>('/api/material/order_commit/', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/order_created/ */
export async function apiMaterialOrderCreatedList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderCreatedListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.OrderCreated[] }>(
    '/api/material/order_created/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/material/order_created/ */
export async function apiMaterialOrderCreatedCreate(
  body: API.OrderCreated,
  options?: { [key: string]: any },
) {
  return request<API.OrderCreated>('/api/material/order_created/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/order_created/${param0}/ */
export async function apiMaterialOrderCreatedRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderCreatedReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrderCreated>(`/api/material/order_created/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/material/order_created/${param0}/ */
export async function apiMaterialOrderCreatedUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderCreatedUpdateParams,
  body: API.OrderCreated,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrderCreated>(`/api/material/order_created/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/material/order_created/${param0}/ */
export async function apiMaterialOrderCreatedDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderCreatedDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/material/order_created/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/material/order_created/${param0}/ */
export async function apiMaterialOrderCreatedPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderCreatedPartialUpdateParams,
  body: API.OrderCreated,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrderCreated>(`/api/material/order_created/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/order_item/ */
export async function apiMaterialOrderItemList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderItemListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.OrderItem[] }>(
    '/api/material/order_item/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/material/order_item/ */
export async function apiMaterialOrderItemCreate(
  body: API.OrderItem,
  options?: { [key: string]: any },
) {
  return request<API.OrderItem>('/api/material/order_item/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/order_item/${param0}/ */
export async function apiMaterialOrderItemRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderItemReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrderItem>(`/api/material/order_item/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/material/order_item/${param0}/ */
export async function apiMaterialOrderItemUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderItemUpdateParams,
  body: API.OrderItem,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrderItem>(`/api/material/order_item/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/material/order_item/${param0}/ */
export async function apiMaterialOrderItemDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderItemDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/material/order_item/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/material/order_item/${param0}/ */
export async function apiMaterialOrderItemPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderItemPartialUpdateParams,
  body: API.OrderItem,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrderItem>(`/api/material/order_item/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/material/order_item/modify_contract_fields/ */
export async function apiMaterialOrderItemModifyContractFields(
  body: API.OrderItem,
  options?: { [key: string]: any },
) {
  return request<API.OrderItem>('/api/material/order_item/modify_contract_fields/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/order_permission/ */
export async function apiMaterialOrderPermissionList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderPermissionListParams,
  options?: { [key: string]: any },
) {
  return request<{
    count: number;
    next?: string;
    previous?: string;
    results: API.OrderPermission[];
  }>('/api/material/order_permission/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/material/order_permission/ */
export async function apiMaterialOrderPermissionCreate(
  body: API.OrderPermission,
  options?: { [key: string]: any },
) {
  return request<API.OrderPermission>('/api/material/order_permission/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/order_permission/${param0}/ */
export async function apiMaterialOrderPermissionRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderPermissionReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrderPermission>(`/api/material/order_permission/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/material/order_permission/${param0}/ */
export async function apiMaterialOrderPermissionUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderPermissionUpdateParams,
  body: API.OrderPermission,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrderPermission>(`/api/material/order_permission/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/material/order_permission/${param0}/ */
export async function apiMaterialOrderPermissionDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderPermissionDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/material/order_permission/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/material/order_permission/${param0}/ */
export async function apiMaterialOrderPermissionPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderPermissionPartialUpdateParams,
  body: API.OrderPermission,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrderPermission>(`/api/material/order_permission/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/order/ */
export async function apiMaterialOrderList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.Order[] }>(
    '/api/material/order/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/material/order/ */
export async function apiMaterialOrderCreate(body: API.Order, options?: { [key: string]: any }) {
  return request<API.Order>('/api/material/order/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/order/${param0}/ */
export async function apiMaterialOrderRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/material/order/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/material/order/${param0}/ */
export async function apiMaterialOrderUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderUpdateParams,
  body: API.Order,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/material/order/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/material/order/${param0}/ */
export async function apiMaterialOrderDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/material/order/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/material/order/${param0}/ */
export async function apiMaterialOrderPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderPartialUpdateParams,
  body: API.Order,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/material/order/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/order/${param0}/applyevent/ */
export async function apiMaterialOrderApplyeventList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderApplyeventListParams,
  options?: { [key: string]: any },
) {
  const { order_id: param0, ...queryParams } = params;
  return request<any>(`/api/material/order/${param0}/applyevent/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/material/order/${param0}/arrival_one_order_item/ */
export async function apiMaterialOrderArrivalOneOrderItem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderArrivalOneOrderItemParams,
  body: API.Order,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/material/order/${param0}/arrival_one_order_item/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 签收指定订单的所有订单项 POST /api/material/order/${param0}/arrival_order_item/ */
export async function apiMaterialOrderArrivalOrderItem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderArrivalOrderItemParams,
  body: API.Order,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/material/order/${param0}/arrival_order_item/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/order/${param0}/export_to_excel/ */
export async function apiMaterialOrderExportToExcelList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderExportToExcelListParams,
  options?: { [key: string]: any },
) {
  const { order_id: param0, ...queryParams } = params;
  return request<any>(`/api/material/order/${param0}/export_to_excel/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/material/order/${param0}/file/ */
export async function apiMaterialOrderFileCreate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderFileCreateParams,
  options?: { [key: string]: any },
) {
  const { order_id: param0, ...queryParams } = params;
  return request<any>(`/api/material/order/${param0}/file/`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定订单的所有订单项 GET /api/material/order/${param0}/order_items/ */
export async function apiMaterialOrderOrderItems(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderOrderItemsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.OrderItem[]>(`/api/material/order/${param0}/order_items/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定订单的所有权限记录 GET /api/material/order/${param0}/order_permissions/ */
export async function apiMaterialOrderOrderPermissions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderOrderPermissionsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/material/order/${param0}/order_permissions/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改步骤 PUT /api/material/order/${param0}/update_step/ */
export async function apiMaterialOrderUpdateStep(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderUpdateStepParams,
  body: API.Order,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Order>(`/api/material/order/${param0}/update_step/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 上传订单文档到企业微信 将指定订单的订单明细数据导出为Excel文档，然后上传到企业微信的文件管理中，并生成文件的分享链接。分享链接将保存到订单中，并返回给客户端。 GET /api/material/order/${param0}/upload_to_wecom/ */
export async function apiMaterialOrderUploadToWecomList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderUploadToWecomListParams,
  options?: { [key: string]: any },
) {
  const { order_id: param0, ...queryParams } = params;
  return request<{ share_url?: string }>(`/api/material/order/${param0}/upload_to_wecom/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/order/user_order/ */
export async function apiMaterialOrderUserOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialOrderUserOrderParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.Order[] }>(
    '/api/material/order/user_order/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** Get a list of all unique categories for orders GET /api/material/ordercategory/ */
export async function apiMaterialOrdercategoryList(options?: { [key: string]: any }) {
  return request<any>('/api/material/ordercategory/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/receipt/ */
export async function apiMaterialReceiptList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialReceiptListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.Receipt[] }>(
    '/api/material/receipt/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/material/receipt/ */
export async function apiMaterialReceiptCreate(
  body: API.Receipt,
  options?: { [key: string]: any },
) {
  return request<API.Receipt>('/api/material/receipt/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/receipt/${param0}/ */
export async function apiMaterialReceiptRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialReceiptReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Receipt>(`/api/material/receipt/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/material/receipt/${param0}/ */
export async function apiMaterialReceiptUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialReceiptUpdateParams,
  body: API.Receipt,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Receipt>(`/api/material/receipt/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/material/receipt/${param0}/ */
export async function apiMaterialReceiptDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialReceiptDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/material/receipt/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/material/receipt/${param0}/ */
export async function apiMaterialReceiptPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialReceiptPartialUpdateParams,
  body: API.Receipt,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Receipt>(`/api/material/receipt/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/supplier_rate/ */
export async function apiMaterialSupplierRateList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialSupplierRateListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.SupplierRate[] }>(
    '/api/material/supplier_rate/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/material/supplier_rate/ */
export async function apiMaterialSupplierRateCreate(
  body: API.SupplierRate,
  options?: { [key: string]: any },
) {
  return request<API.SupplierRate>('/api/material/supplier_rate/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/material/supplier_rate/${param0}/ */
export async function apiMaterialSupplierRateRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialSupplierRateReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.SupplierRate>(`/api/material/supplier_rate/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/material/supplier_rate/${param0}/ */
export async function apiMaterialSupplierRateUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialSupplierRateUpdateParams,
  body: API.SupplierRate,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.SupplierRate>(`/api/material/supplier_rate/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/material/supplier_rate/${param0}/ */
export async function apiMaterialSupplierRateDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialSupplierRateDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/material/supplier_rate/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/material/supplier_rate/${param0}/ */
export async function apiMaterialSupplierRatePartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiMaterialSupplierRatePartialUpdateParams,
  body: API.SupplierRate,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.SupplierRate>(`/api/material/supplier_rate/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/oa/binding/ */
export async function apiOaBindingCreate(options?: { [key: string]: any }) {
  return request<any>('/api/oa/binding/', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取当前用户信息 GET /api/oa/currentuser/ */
export async function apiOaCurrentuserList(options?: { [key: string]: any }) {
  return request<API.User>('/api/oa/currentuser/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/oa/department/ */
export async function apiOaDepartmentList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaDepartmentListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.Department[] }>(
    '/api/oa/department/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/oa/department/ */
export async function apiOaDepartmentCreate(
  body: API.Department,
  options?: { [key: string]: any },
) {
  return request<API.Department>('/api/oa/department/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/oa/department/${param0}/ */
export async function apiOaDepartmentRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaDepartmentReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Department>(`/api/oa/department/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/oa/department/${param0}/ */
export async function apiOaDepartmentUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaDepartmentUpdateParams,
  body: API.Department,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Department>(`/api/oa/department/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/oa/department/${param0}/ */
export async function apiOaDepartmentDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaDepartmentDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/oa/department/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/oa/department/${param0}/ */
export async function apiOaDepartmentPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaDepartmentPartialUpdateParams,
  body: API.Department,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Department>(`/api/oa/department/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 用户登录 POST /api/oa/login/ */
export async function apiOaLoginCreate(body: {}, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/oa/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/oa/project/ */
export async function apiOaProjectList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaProjectListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.Project[] }>(
    '/api/oa/project/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/oa/project/ */
export async function apiOaProjectCreate(body: API.Project, options?: { [key: string]: any }) {
  return request<API.Project>('/api/oa/project/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/oa/project/${param0}/ */
export async function apiOaProjectRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaProjectReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Project>(`/api/oa/project/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/oa/project/${param0}/ */
export async function apiOaProjectUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaProjectUpdateParams,
  body: API.Project,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Project>(`/api/oa/project/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/oa/project/${param0}/ */
export async function apiOaProjectDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaProjectDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/oa/project/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/oa/project/${param0}/ */
export async function apiOaProjectPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaProjectPartialUpdateParams,
  body: API.Project,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Project>(`/api/oa/project/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/oa/sendsms/ */
export async function apiOaSendsmsCreate(options?: { [key: string]: any }) {
  return request<any>('/api/oa/sendsms/', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/oa/supplier/ */
export async function apiOaSupplierList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaSupplierListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.Supplier[] }>(
    '/api/oa/supplier/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/oa/supplier/ */
export async function apiOaSupplierCreate(body: API.Supplier, options?: { [key: string]: any }) {
  return request<API.Supplier>('/api/oa/supplier/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/oa/supplier/${param0}/ */
export async function apiOaSupplierRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaSupplierReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Supplier>(`/api/oa/supplier/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/oa/supplier/${param0}/ */
export async function apiOaSupplierUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaSupplierUpdateParams,
  body: API.Supplier,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Supplier>(`/api/oa/supplier/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/oa/supplier/${param0}/ */
export async function apiOaSupplierDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaSupplierDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/oa/supplier/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/oa/supplier/${param0}/ */
export async function apiOaSupplierPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaSupplierPartialUpdateParams,
  body: API.Supplier,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Supplier>(`/api/oa/supplier/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/oa/user/ */
export async function apiOaUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaUserListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.User[] }>(
    '/api/oa/user/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/oa/user/ */
export async function apiOaUserCreate(body: API.User, options?: { [key: string]: any }) {
  return request<API.User>('/api/oa/user/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/oa/user/${param0}/ */
export async function apiOaUserRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaUserReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.User>(`/api/oa/user/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/oa/user/${param0}/ */
export async function apiOaUserUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaUserUpdateParams,
  body: API.User,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.User>(`/api/oa/user/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/oa/user/${param0}/ */
export async function apiOaUserDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaUserDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/oa/user/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/oa/user/${param0}/ */
export async function apiOaUserPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaUserPartialUpdateParams,
  body: API.User,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.User>(`/api/oa/user/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/oa/user/${param0}/wecom_user/ */
export async function apiOaUserWecomUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiOaUserWecomUserParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.User>(`/api/oa/user/${param0}/wecom_user/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取下拉框数据 GET /api/selector/ */
export async function apiSelectorList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiSelectorListParams,
  options?: { [key: string]: any },
) {
  return request<{
    results?: { label?: string; value?: string }[];
    success?: boolean;
    code?: number;
    message?: string;
  }>('/api/selector/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Takes a set of user credentials and returns an access and refresh JSON web
token pair to prove the authentication of those credentials. POST /api/token/ */
export async function apiTokenCreate(body: API.TokenObtainPair, options?: { [key: string]: any }) {
  return request<API.TokenObtainPair>('/api/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Takes a refresh type JSON web token and returns an access type JSON web
token if the refresh token is valid. POST /api/token/refresh/ */
export async function apiTokenRefreshCreate(
  body: API.TokenRefresh,
  options?: { [key: string]: any },
) {
  return request<API.TokenRefresh>('/api/token/refresh/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/wecom/binding_state */
export async function apiWecomBindingStateList(options?: { [key: string]: any }) {
  return request<any>('/api/wecom/binding_state', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/wecom/create_user */
export async function apiWecomCreateUserList(options?: { [key: string]: any }) {
  return request<any>('/api/wecom/create_user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/wecom/get_join_qrcode */
export async function apiWecomGetJoinQrcodeList(options?: { [key: string]: any }) {
  return request<any>('/api/wecom/get_join_qrcode', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/wecom/login */
export async function apiWecomLoginList(options?: { [key: string]: any }) {
  return request<any>('/api/wecom/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/wecom/oauth */
export async function apiWecomOauthList(options?: { [key: string]: any }) {
  return request<any>('/api/wecom/oauth', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/wecom/oauth */
export async function apiWecomOauthCreate(options?: { [key: string]: any }) {
  return request<any>('/api/wecom/oauth', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/wecom/test */
export async function apiWecomTestList(options?: { [key: string]: any }) {
  return request<any>('/api/wecom/test', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/wecom/user/ */
export async function apiWecomUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiWecomUserListParams,
  options?: { [key: string]: any },
) {
  return request<{ count: number; next?: string; previous?: string; results: API.WecomUser[] }>(
    '/api/wecom/user/',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/wecom/user/ */
export async function apiWecomUserCreate(body: API.WecomUser, options?: { [key: string]: any }) {
  return request<API.WecomUser>('/api/wecom/user/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/wecom/user/${param0}/ */
export async function apiWecomUserRead(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiWecomUserReadParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.WecomUser>(`/api/wecom/user/${param0}/`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/wecom/user/${param0}/ */
export async function apiWecomUserUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiWecomUserUpdateParams,
  body: API.WecomUser,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.WecomUser>(`/api/wecom/user/${param0}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/wecom/user/${param0}/ */
export async function apiWecomUserDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiWecomUserDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/wecom/user/${param0}/`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PATCH /api/wecom/user/${param0}/ */
export async function apiWecomUserPartialUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiWecomUserPartialUpdateParams,
  body: API.WecomUser,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.WecomUser>(`/api/wecom/user/${param0}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/wecom/wecom_user */
export async function apiWecomWecomUserList(options?: { [key: string]: any }) {
  return request<any>('/api/wecom/wecom_user', {
    method: 'GET',
    ...(options || {}),
  });
}
