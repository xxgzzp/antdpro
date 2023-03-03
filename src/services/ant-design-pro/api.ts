// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

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

/** 此处后端没有提供注释 GET /api/oa/currentuser/ */
export async function apiOaCurrentuserList(options?: { [key: string]: any }) {
  return request<any>('/api/oa/currentuser/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/oa/department/ */
export async function apiOaDepartmentList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params?: API.apiOaDepartmentListParams,
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

/** 此处后端没有提供注释 POST /api/oa/login/ */
export async function apiOaLoginCreate(options?: { [key: string]: any }) {
  return request<any>('/api/oa/login/', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/oa/project/ */
export async function apiOaProjectList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params?: API.apiOaProjectListParams,
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
  params?: API.apiOaUserListParams,
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
