declare namespace API {
  type apiMaterialContractDeleteParams = {
    /** A UUID string identifying this 合同. */
    id: string;
  };

  type apiMaterialContractItemDeleteParams = {
    /** A unique integer value identifying this 合同详细项. */
    id: number;
  };

  type apiMaterialContractItemListParams = {
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiMaterialContractItemPartialUpdateParams = {
    /** A unique integer value identifying this 合同详细项. */
    id: number;
  };

  type apiMaterialContractItemReadParams = {
    /** A unique integer value identifying this 合同详细项. */
    id: number;
  };

  type apiMaterialContractItemUpdateParams = {
    /** A unique integer value identifying this 合同详细项. */
    id: number;
  };

  type apiMaterialContractListParams = {
    /** A search term. */
    search?: string;
    project?: string;
    created_by?: string;
    estimator?: string;
    principal?: string;
    end_by?: string;
    supplier?: string;
    category?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiMaterialContractPartialUpdateParams = {
    /** A UUID string identifying this 合同. */
    id: string;
  };

  type apiMaterialContractReadParams = {
    /** A UUID string identifying this 合同. */
    id: string;
  };

  type apiMaterialContractUpdateParams = {
    /** A UUID string identifying this 合同. */
    id: string;
  };

  type apiMaterialInvoiceDeleteParams = {
    /** A UUID string identifying this 票据. */
    id: string;
  };

  type apiMaterialInvoiceListParams = {
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiMaterialInvoicePartialUpdateParams = {
    /** A UUID string identifying this 票据. */
    id: string;
  };

  type apiMaterialInvoiceReadParams = {
    /** A UUID string identifying this 票据. */
    id: string;
  };

  type apiMaterialInvoiceUpdateParams = {
    /** A UUID string identifying this 票据. */
    id: string;
  };

  type apiMaterialMaterialDeleteParams = {
    /** A unique integer value identifying this material. */
    id: number;
  };

  type apiMaterialMaterialListParams = {
    /** A search term. */
    search?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiMaterialMaterialPartialUpdateParams = {
    /** A unique integer value identifying this material. */
    id: number;
  };

  type apiMaterialMaterialReadParams = {
    /** A unique integer value identifying this material. */
    id: number;
  };

  type apiMaterialMaterialUpdateParams = {
    /** A unique integer value identifying this material. */
    id: number;
  };

  type apiMaterialOrderCheckedDeleteParams = {
    /** A unique integer value identifying this 订单审核. */
    id: number;
  };

  type apiMaterialOrderCheckedListParams = {
    /** A search term. */
    search?: string;
    order?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiMaterialOrderCheckedPartialUpdateParams = {
    /** A unique integer value identifying this 订单审核. */
    id: number;
  };

  type apiMaterialOrderCheckedReadParams = {
    /** A unique integer value identifying this 订单审核. */
    id: number;
  };

  type apiMaterialOrderCheckedUpdateParams = {
    /** A unique integer value identifying this 订单审核. */
    id: number;
  };

  type apiMaterialOrderCreatedDeleteParams = {
    /** A unique integer value identifying this 订单创建者. */
    id: number;
  };

  type apiMaterialOrderCreatedListParams = {
    /** A search term. */
    search?: string;
    order?: string;
    created_by?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiMaterialOrderCreatedPartialUpdateParams = {
    /** A unique integer value identifying this 订单创建者. */
    id: number;
  };

  type apiMaterialOrderCreatedReadParams = {
    /** A unique integer value identifying this 订单创建者. */
    id: number;
  };

  type apiMaterialOrderCreatedUpdateParams = {
    /** A unique integer value identifying this 订单创建者. */
    id: number;
  };

  type apiMaterialOrderDeleteParams = {
    /** A UUID string identifying this 订单. */
    id: string;
  };

  type apiMaterialOrderItemDeleteParams = {
    /** A unique integer value identifying this order item. */
    id: number;
  };

  type apiMaterialOrderItemListParams = {
    /** A search term. */
    search?: string;
    order?: string;
    contract?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiMaterialOrderItemPartialUpdateParams = {
    /** A unique integer value identifying this order item. */
    id: number;
  };

  type apiMaterialOrderItemReadParams = {
    /** A unique integer value identifying this order item. */
    id: number;
  };

  type apiMaterialOrderItemUpdateParams = {
    /** A unique integer value identifying this order item. */
    id: number;
  };

  type apiMaterialOrderListParams = {
    /** A search term. */
    search?: string;
    created_time?: string;
    project__name?: string;
    created_by?: string;
    category?: string;
    supplier?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiMaterialOrderPartialUpdateParams = {
    /** A UUID string identifying this 订单. */
    id: string;
  };

  type apiMaterialOrderReadParams = {
    /** A UUID string identifying this 订单. */
    id: string;
  };

  type apiMaterialOrderUpdateParams = {
    /** A UUID string identifying this 订单. */
    id: string;
  };

  type apiMaterialReceiptDeleteParams = {
    /** A UUID string identifying this 签收单. */
    id: string;
  };

  type apiMaterialReceiptListParams = {
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiMaterialReceiptPartialUpdateParams = {
    /** A UUID string identifying this 签收单. */
    id: string;
  };

  type apiMaterialReceiptReadParams = {
    /** A UUID string identifying this 签收单. */
    id: string;
  };

  type apiMaterialReceiptUpdateParams = {
    /** A UUID string identifying this 签收单. */
    id: string;
  };

  type apiOaDepartmentDeleteParams = {
    /** A UUID string identifying this 部门. */
    id: string;
  };

  type apiOaDepartmentListParams = {
    /** A search term. */
    search?: string;
    project?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiOaDepartmentPartialUpdateParams = {
    /** A UUID string identifying this 部门. */
    id: string;
  };

  type apiOaDepartmentReadParams = {
    /** A UUID string identifying this 部门. */
    id: string;
  };

  type apiOaDepartmentUpdateParams = {
    /** A UUID string identifying this 部门. */
    id: string;
  };

  type apiOaProjectDeleteParams = {
    /** A UUID string identifying this 项目. */
    id: string;
  };

  type apiOaProjectListParams = {
    /** A search term. */
    search?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiOaProjectPartialUpdateParams = {
    /** A UUID string identifying this 项目. */
    id: string;
  };

  type apiOaProjectReadParams = {
    /** A UUID string identifying this 项目. */
    id: string;
  };

  type apiOaProjectUpdateParams = {
    /** A UUID string identifying this 项目. */
    id: string;
  };

  type apiOaSupplierDeleteParams = {
    /** A UUID string identifying this 供货商. */
    id: string;
  };

  type apiOaSupplierListParams = {
    /** A search term. */
    search?: string;
    name?: string;
    category?: string;
    phone?: string;
    service?: string;
    manager?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiOaSupplierPartialUpdateParams = {
    /** A UUID string identifying this 供货商. */
    id: string;
  };

  type apiOaSupplierReadParams = {
    /** A UUID string identifying this 供货商. */
    id: string;
  };

  type apiOaSupplierUpdateParams = {
    /** A UUID string identifying this 供货商. */
    id: string;
  };

  type apiOaUserDeleteParams = {
    /** A UUID string identifying this 用户. */
    id: string;
  };

  type apiOaUserListParams = {
    /** A search term. */
    search?: string;
    now_project?: string;
    department?: string;
    department__name?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiOaUserPartialUpdateParams = {
    /** A UUID string identifying this 用户. */
    id: string;
  };

  type apiOaUserReadParams = {
    /** A UUID string identifying this 用户. */
    id: string;
  };

  type apiOaUserUpdateParams = {
    /** A UUID string identifying this 用户. */
    id: string;
  };

  type AuthToken = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 令牌 */
    token?: string;
  };

  type Contract = {
    /** Id */
    id?: string;
    /** Estimator name */
    estimator_name?: string;
    /** Principal name */
    principal_name?: string;
    /** End by name */
    end_by_name?: string;
    /** Supplier name */
    supplier_name?: string;
    /** 合同名称 */
    name?: string;
    /** Created time */
    created_time?: string;
    /** 类别 */
    category: string;
    /** Project */
    project: string;
    /** Created by */
    created_by?: string;
    /** Estimator */
    estimator?: string;
    /** Principal */
    principal?: string;
    /** End by */
    end_by?: string;
    /** Supplier */
    supplier?: string;
    materials?: string[];
  };

  type ContractItem = {
    /** ID */
    id?: number;
    /** 预算员数量 */
    estimator_num?: number;
    /** 施工员数量 */
    principal_num?: number;
    /** 最终数量 */
    end_num?: number;
    /** 已购数量 */
    buy_counts?: number;
    /** Contract */
    contract: string;
    /** Material */
    material: number;
  };

  type Department = {
    /** Id */
    id?: string;
    /** 部门名称 */
    name: string;
    /** 项目 */
    project: string;
    /** 父类架构 */
    parent?: string;
    /** 主管 */
    manager?: string;
  };

  type Invoice = {
    /** Id */
    id?: string;
    /** Name */
    name: string;
  };

  type Material = {
    /** ID */
    id?: number;
    /** 材料与设备名称 */
    name: string;
    /** 材料规格 */
    sku?: string;
    /** 材料单位 */
    unit?: string;
    /** 创建时间 */
    created_time?: string;
    /** 创建者 */
    created_by?: string;
  };

  type Order = {
    /** Id */
    id?: string;
    /** Created by name */
    created_by_name?: string;
    /** Project name */
    project_name?: string;
    /** Supplier name */
    supplier_name?: string;
    /** 材料单名称 */
    name?: string;
    /** Created time */
    created_time?: string;
    /** 类别 */
    category?: string;
    /** Project */
    project?: string;
    /** Created by */
    created_by?: string;
    /** Supplier */
    supplier?: string;
    materials?: string[];
    checkers?: string[];
    creators?: string[];
  };

  type OrderChecked = {
    /** ID */
    id?: number;
    /** 是否审核通过 */
    is_checked?: boolean;
    /** Checked time */
    checked_time?: string;
    /** Order */
    order: string;
    /** Checked by */
    checked_by: string;
  };

  type OrderCreated = {
    /** ID */
    id?: number;
    /** 订单创建的时间 */
    created_time?: string;
    /** Order */
    order: string;
    /** Created by */
    created_by: string;
  };

  type OrderItem = {
    /** ID */
    id?: number;
    /** Material name */
    material_name?: string;
    /** Material sku */
    material_sku?: string;
    /** Material unit */
    material_unit?: string;
    /** 最晚到达时间 */
    need_time?: string;
    /** 购买数量 */
    buy_num?: number;
    /** 使用部位 */
    used_site?: string;
    /** 表格排序序号 */
    sort?: number;
    /** 是否到货 */
    is_arrival?: boolean;
    /** Order */
    order: string;
    /** Material */
    material: number;
    /** Contract */
    contract?: string;
    /** Receipt */
    receipt?: string;
  };

  type Project = {
    /** Id */
    id?: string;
    /** Manager name */
    manager_name?: string;
    departments?: string[];
    /** 项目名称 */
    name: string;
    /** 项目地址 */
    address: string;
    /** 项目经理(外键) */
    manager?: string;
  };

  type Receipt = {
    /** Id */
    id?: string;
    /** Name */
    name: string;
    /** Created time */
    created_time?: string;
    /** Created by */
    created_by: string;
  };

  type Supplier = {
    /** Id */
    id?: string;
    /** Manager name */
    manager_name?: string;
    /** Manager phone */
    manager_phone?: string;
    /** Name */
    name: string;
    /** 类别 */
    category: string;
    /** 联系电话 */
    phone: string;
    /** Created time */
    created_time?: string;
    /** 经营业务 */
    service: string;
    /** Manager */
    manager?: string;
  };

  type User = {
    /** Id */
    id?: string;
    /** 用户名 必填；长度为150个字符或以下；只能包含字母、数字、特殊字符“@”、“.”、“-”和“_”。 */
    username: string;
    /** 密码 */
    password: string;
    /** 真实姓名 */
    name: string;
    /** 身份证 */
    id_card_no?: string;
    /** 手机号 */
    mobile_phone?: string;
    /** 身份/职位 */
    identity?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
    /** Identity name */
    identity_name?: string;
    /** 所在项目 */
    now_project?: string;
    /** Project name */
    project_name?: string;
    /** 部门 */
    department?: string;
    /** Department name */
    department_name?: string;
  };
}
