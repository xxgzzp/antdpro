// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
/** 此处后端没有提供注释 GET /api/dashboard/ */
export async function apiDashboardList(options) {
    return request('/api/dashboard/', {
        method: 'GET',
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/contract_commit/ */
export async function apiMaterialContractCommitCreate(options) {
    return request('/api/material/contract_commit/', {
        method: 'POST',
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/material/contract_item/ */
export async function apiMaterialContractItemList(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, options) {
    return request('/api/material/contract_item/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/contract_item/ */
export async function apiMaterialContractItemCreate(body, options) {
    return request('/api/material/contract_item/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract_item/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/material/contract_item/${param0}/ */
export async function apiMaterialContractItemUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract_item/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract_item/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/material/contract_item/${param0}/ */
export async function apiMaterialContractItemPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract_item/${param0}/`, {
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
params, options) {
    return request('/api/material/contract_permission/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/contract_permission/ */
export async function apiMaterialContractPermissionCreate(body, options) {
    return request('/api/material/contract_permission/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract_permission/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/material/contract_permission/${param0}/ */
export async function apiMaterialContractPermissionUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract_permission/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract_permission/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/material/contract_permission/${param0}/ */
export async function apiMaterialContractPermissionPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract_permission/${param0}/`, {
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
params, options) {
    return request('/api/material/contract/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/contract/ */
export async function apiMaterialContractCreate(body, options) {
    return request('/api/material/contract/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/material/contract/${param0}/ */
export async function apiMaterialContractUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/material/contract/${param0}/ */
export async function apiMaterialContractPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract/${param0}/`, {
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
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract/${param0}/check_material_in_contract/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract/${param0}/contract_items/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 获取指定合同的所有权限记录 GET /api/material/contract/${param0}/contract_permissions/ */
export async function apiMaterialContractContractPermissions(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/contract/${param0}/contract_permissions/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/material/contract/contract_select/ */
export async function apiMaterialContractContractSelect(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, options) {
    return request('/api/material/contract/contract_select/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/material/contractcategory/ */
export async function apiMaterialContractcategoryList(options) {
    return request('/api/material/contractcategory/', {
        method: 'GET',
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/material/invoice/ */
export async function apiMaterialInvoiceList(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, options) {
    return request('/api/material/invoice/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/invoice/ */
export async function apiMaterialInvoiceCreate(body, options) {
    return request('/api/material/invoice/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/invoice/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/material/invoice/${param0}/ */
export async function apiMaterialInvoiceUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/invoice/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/invoice/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/material/invoice/${param0}/ */
export async function apiMaterialInvoicePartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/invoice/${param0}/`, {
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
params, options) {
    return request('/api/material/material_all/', {
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
params, options) {
    return request('/api/material/material/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/material/ */
export async function apiMaterialMaterialCreate(body, options) {
    return request('/api/material/material/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/material/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/material/material/${param0}/ */
export async function apiMaterialMaterialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/material/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/material/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/material/material/${param0}/ */
export async function apiMaterialMaterialPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/material/${param0}/`, {
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
params, options) {
    return request('/api/material/order_checked/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/order_checked/ */
export async function apiMaterialOrderCheckedCreate(body, options) {
    return request('/api/material/order_checked/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_checked/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/material/order_checked/${param0}/ */
export async function apiMaterialOrderCheckedUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_checked/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_checked/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/material/order_checked/${param0}/ */
export async function apiMaterialOrderCheckedPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_checked/${param0}/`, {
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
params, options) {
    return request('/api/material/order_checked/user_order_checked/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/order_commit/ */
export async function apiMaterialOrderCommitCreate(options) {
    return request('/api/material/order_commit/', {
        method: 'POST',
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/material/order_created/ */
export async function apiMaterialOrderCreatedList(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, options) {
    return request('/api/material/order_created/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/order_created/ */
export async function apiMaterialOrderCreatedCreate(body, options) {
    return request('/api/material/order_created/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_created/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/material/order_created/${param0}/ */
export async function apiMaterialOrderCreatedUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_created/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_created/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/material/order_created/${param0}/ */
export async function apiMaterialOrderCreatedPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_created/${param0}/`, {
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
params, options) {
    return request('/api/material/order_item/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/order_item/ */
export async function apiMaterialOrderItemCreate(body, options) {
    return request('/api/material/order_item/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_item/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/material/order_item/${param0}/ */
export async function apiMaterialOrderItemUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_item/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_item/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/material/order_item/${param0}/ */
export async function apiMaterialOrderItemPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_item/${param0}/`, {
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
export async function apiMaterialOrderItemModifyContractFields(body, options) {
    return request('/api/material/order_item/modify_contract_fields/', {
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
params, options) {
    return request('/api/material/order_permission/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/order_permission/ */
export async function apiMaterialOrderPermissionCreate(body, options) {
    return request('/api/material/order_permission/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_permission/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/material/order_permission/${param0}/ */
export async function apiMaterialOrderPermissionUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_permission/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_permission/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/material/order_permission/${param0}/ */
export async function apiMaterialOrderPermissionPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order_permission/${param0}/`, {
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
params, options) {
    return request('/api/material/order/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/order/ */
export async function apiMaterialOrderCreate(body, options) {
    return request('/api/material/order/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/material/order/${param0}/ */
export async function apiMaterialOrderUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/material/order/${param0}/ */
export async function apiMaterialOrderPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order/${param0}/`, {
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
params, options) {
    const { order_id: param0, ...queryParams } = params;
    return request(`/api/material/order/${param0}/applyevent/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/order/${param0}/arrival_one_order_item/ */
export async function apiMaterialOrderArrivalOneOrderItem(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order/${param0}/arrival_one_order_item/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        params: { ...queryParams },
        data: body,
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/order/${param0}/arrival_order_item/ */
export async function apiMaterialOrderArrivalOrderItem(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order/${param0}/arrival_order_item/`, {
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
params, options) {
    const { order_id: param0, ...queryParams } = params;
    return request(`/api/material/order/${param0}/export_to_excel/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/order/${param0}/file/ */
export async function apiMaterialOrderFileCreate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, options) {
    const { order_id: param0, ...queryParams } = params;
    return request(`/api/material/order/${param0}/file/`, {
        method: 'POST',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/material/order/${param0}/order_items/ */
export async function apiMaterialOrderOrderItems(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order/${param0}/order_items/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 获取指定订单的所有权限记录 GET /api/material/order/${param0}/order_permissions/ */
export async function apiMaterialOrderOrderPermissions(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order/${param0}/order_permissions/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/material/order/${param0}/update_step/ */
export async function apiMaterialOrderUpdateStep(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/order/${param0}/update_step/`, {
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
params, options) {
    const { order_id: param0, ...queryParams } = params;
    return request(`/api/material/order/${param0}/upload_to_wecom/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/material/order/user_order/ */
export async function apiMaterialOrderUserOrder(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, options) {
    return request('/api/material/order/user_order/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** Get a list of all unique categories for orders GET /api/material/ordercategory/ */
export async function apiMaterialOrdercategoryList(options) {
    return request('/api/material/ordercategory/', {
        method: 'GET',
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/material/receipt/ */
export async function apiMaterialReceiptList(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, options) {
    return request('/api/material/receipt/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/receipt/ */
export async function apiMaterialReceiptCreate(body, options) {
    return request('/api/material/receipt/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/receipt/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/material/receipt/${param0}/ */
export async function apiMaterialReceiptUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/receipt/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/receipt/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/material/receipt/${param0}/ */
export async function apiMaterialReceiptPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/receipt/${param0}/`, {
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
params, options) {
    return request('/api/material/supplier_rate/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/material/supplier_rate/ */
export async function apiMaterialSupplierRateCreate(body, options) {
    return request('/api/material/supplier_rate/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/supplier_rate/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/material/supplier_rate/${param0}/ */
export async function apiMaterialSupplierRateUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/supplier_rate/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/supplier_rate/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/material/supplier_rate/${param0}/ */
export async function apiMaterialSupplierRatePartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/material/supplier_rate/${param0}/`, {
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
export async function apiOaBindingCreate(options) {
    return request('/api/oa/binding/', {
        method: 'POST',
        ...(options || {}),
    });
}
/** 获取当前用户信息 GET /api/oa/currentuser/ */
export async function apiOaCurrentuserList(options) {
    return request('/api/oa/currentuser/', {
        method: 'GET',
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/oa/department/ */
export async function apiOaDepartmentList(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, options) {
    return request('/api/oa/department/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/oa/department/ */
export async function apiOaDepartmentCreate(body, options) {
    return request('/api/oa/department/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/department/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/oa/department/${param0}/ */
export async function apiOaDepartmentUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/department/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/department/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/oa/department/${param0}/ */
export async function apiOaDepartmentPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/department/${param0}/`, {
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
export async function apiOaLoginCreate(body, options) {
    return request('/api/oa/login/', {
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
params, options) {
    return request('/api/oa/project/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/oa/project/ */
export async function apiOaProjectCreate(body, options) {
    return request('/api/oa/project/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/project/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/oa/project/${param0}/ */
export async function apiOaProjectUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/project/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/project/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/oa/project/${param0}/ */
export async function apiOaProjectPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/project/${param0}/`, {
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
export async function apiOaSendsmsCreate(options) {
    return request('/api/oa/sendsms/', {
        method: 'POST',
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/oa/supplier/ */
export async function apiOaSupplierList(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, options) {
    return request('/api/oa/supplier/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/oa/supplier/ */
export async function apiOaSupplierCreate(body, options) {
    return request('/api/oa/supplier/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/supplier/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/oa/supplier/${param0}/ */
export async function apiOaSupplierUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/supplier/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/supplier/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/oa/supplier/${param0}/ */
export async function apiOaSupplierPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/supplier/${param0}/`, {
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
params, options) {
    return request('/api/oa/user/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/oa/user/ */
export async function apiOaUserCreate(body, options) {
    return request('/api/oa/user/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/user/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/oa/user/${param0}/ */
export async function apiOaUserUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/user/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/user/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/oa/user/${param0}/ */
export async function apiOaUserPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/user/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/oa/user/${param0}/wecom_user/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 获取下拉框数据 GET /api/selector/ */
export async function apiSelectorList(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, options) {
    return request('/api/selector/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** Takes a set of user credentials and returns an access and refresh JSON web
token pair to prove the authentication of those credentials. POST /api/token/ */
export async function apiTokenCreate(body, options) {
    return request('/api/token/', {
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
export async function apiTokenRefreshCreate(body, options) {
    return request('/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/wecom/binding_state */
export async function apiWecomBindingStateList(options) {
    return request('/api/wecom/binding_state', {
        method: 'GET',
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/wecom/create_user */
export async function apiWecomCreateUserList(options) {
    return request('/api/wecom/create_user', {
        method: 'GET',
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/wecom/get_join_qrcode */
export async function apiWecomGetJoinQrcodeList(options) {
    return request('/api/wecom/get_join_qrcode', {
        method: 'GET',
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/wecom/login */
export async function apiWecomLoginList(options) {
    return request('/api/wecom/login', {
        method: 'GET',
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/wecom/oauth */
export async function apiWecomOauthList(options) {
    return request('/api/wecom/oauth', {
        method: 'GET',
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/wecom/oauth */
export async function apiWecomOauthCreate(options) {
    return request('/api/wecom/oauth', {
        method: 'POST',
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/wecom/test */
export async function apiWecomTestList(options) {
    return request('/api/wecom/test', {
        method: 'GET',
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 GET /api/wecom/user/ */
export async function apiWecomUserList(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, options) {
    return request('/api/wecom/user/', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 POST /api/wecom/user/ */
export async function apiWecomUserCreate(body, options) {
    return request('/api/wecom/user/', {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/wecom/user/${param0}/`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PUT /api/wecom/user/${param0}/ */
export async function apiWecomUserUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/wecom/user/${param0}/`, {
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
params, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/wecom/user/${param0}/`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}
/** 此处后端没有提供注释 PATCH /api/wecom/user/${param0}/ */
export async function apiWecomUserPartialUpdate(
// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
params, body, options) {
    const { id: param0, ...queryParams } = params;
    return request(`/api/wecom/user/${param0}/`, {
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
export async function apiWecomWecomUserList(options) {
    return request('/api/wecom/wecom_user', {
        method: 'GET',
        ...(options || {}),
    });
}
//# sourceMappingURL=api.js.map