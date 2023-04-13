declare namespace API {
  type apiMaterialContractCheckMaterialInContractParams = {
    /** A UUID string identifying this 合同. */
    id: string;
  };

  type apiMaterialContractContractItemsParams = {
    /** A UUID string identifying this 合同. */
    id: string;
  };

  type apiMaterialContractContractPermissionsParams = {
    /** A UUID string identifying this 合同. */
    id: string;
  };

  type apiMaterialContractContractSelectParams = {
    /** A search term. */
    search?: string;
    project__name?: string;
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

  type apiMaterialContractDeleteParams = {
    /** A UUID string identifying this 合同. */
    id: string;
  };

  type apiMaterialContractItemDeleteParams = {
    /** A UUID string identifying this 合同详细项. */
    id: string;
  };

  type apiMaterialContractItemListParams = {
    /** A search term. */
    search?: string;
    contract?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiMaterialContractItemPartialUpdateParams = {
    /** A UUID string identifying this 合同详细项. */
    id: string;
  };

  type apiMaterialContractItemReadParams = {
    /** A UUID string identifying this 合同详细项. */
    id: string;
  };

  type apiMaterialContractItemUpdateParams = {
    /** A UUID string identifying this 合同详细项. */
    id: string;
  };

  type apiMaterialContractListParams = {
    /** A search term. */
    search?: string;
    project__name?: string;
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

  type apiMaterialContractPermissionDeleteParams = {
    /** A unique integer value identifying this contract permission. */
    id: number;
  };

  type apiMaterialContractPermissionListParams = {
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiMaterialContractPermissionPartialUpdateParams = {
    /** A unique integer value identifying this contract permission. */
    id: number;
  };

  type apiMaterialContractPermissionReadParams = {
    /** A unique integer value identifying this contract permission. */
    id: number;
  };

  type apiMaterialContractPermissionUpdateParams = {
    /** A unique integer value identifying this contract permission. */
    id: number;
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

  type apiMaterialMaterialAllListParams = {
    /** 当前页数 */
    current?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 材料名称 */
    material_name?: string;
    /** 材料SKU */
    material_sku?: string;
    /** 订单名称 */
    order_name?: string;
    /** 合同名称 */
    contract_name?: string;
    /** 项目ID */
    project?: number;
    /** 搜索关键词 */
    search?: string;
  };

  type apiMaterialMaterialDeleteParams = {
    /** A unique integer value identifying this material. */
    id: number;
  };

  type apiMaterialMaterialListParams = {
    /** A search term. */
    search?: string;
    name?: string;
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

  type apiMaterialOrderApplyeventListParams = {
    order_id: string;
  };

  type apiMaterialOrderArrivalOneOrderItemParams = {
    /** A UUID string identifying this 订单. */
    id: string;
  };

  type apiMaterialOrderArrivalOrderItemParams = {
    /** A UUID string identifying this 订单. */
    id: string;
  };

  type apiMaterialOrderCheckedDeleteParams = {
    /** A unique integer value identifying this 订单审核. */
    id: number;
  };

  type apiMaterialOrderCheckedListParams = {
    /** A search term. */
    search?: string;
    order?: string;
    checked_by?: string;
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

  type apiMaterialOrderCheckedUserOrderCheckedParams = {
    /** A search term. */
    search?: string;
    order?: string;
    checked_by?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
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

  type apiMaterialOrderExportToExcelListParams = {
    order_id: string;
  };

  type apiMaterialOrderFileCreateParams = {
    order_id: string;
  };

  type apiMaterialOrderItemDeleteParams = {
    /** A UUID string identifying this order item. */
    id: string;
  };

  type apiMaterialOrderItemListParams = {
    /** A search term. */
    search?: string;
    order?: string;
    contract?: string;
    material?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiMaterialOrderItemPartialUpdateParams = {
    /** A UUID string identifying this order item. */
    id: string;
  };

  type apiMaterialOrderItemReadParams = {
    /** A UUID string identifying this order item. */
    id: string;
  };

  type apiMaterialOrderItemUpdateParams = {
    /** A UUID string identifying this order item. */
    id: string;
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

  type apiMaterialOrderOrderItemsParams = {
    /** A UUID string identifying this 订单. */
    id: string;
  };

  type apiMaterialOrderOrderPermissionsParams = {
    /** A UUID string identifying this 订单. */
    id: string;
  };

  type apiMaterialOrderPartialUpdateParams = {
    /** A UUID string identifying this 订单. */
    id: string;
  };

  type apiMaterialOrderPermissionDeleteParams = {
    /** A unique integer value identifying this order permission. */
    id: number;
  };

  type apiMaterialOrderPermissionListParams = {
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiMaterialOrderPermissionPartialUpdateParams = {
    /** A unique integer value identifying this order permission. */
    id: number;
  };

  type apiMaterialOrderPermissionReadParams = {
    /** A unique integer value identifying this order permission. */
    id: number;
  };

  type apiMaterialOrderPermissionUpdateParams = {
    /** A unique integer value identifying this order permission. */
    id: number;
  };

  type apiMaterialOrderReadParams = {
    /** A UUID string identifying this 订单. */
    id: string;
  };

  type apiMaterialOrderUpdateParams = {
    /** A UUID string identifying this 订单. */
    id: string;
  };

  type apiMaterialOrderUpdateStepParams = {
    /** A UUID string identifying this 订单. */
    id: string;
  };

  type apiMaterialOrderUploadToWecomListParams = {
    /** 订单ID */
    order_id: string;
  };

  type apiMaterialOrderUserOrderParams = {
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

  type apiMaterialSupplierRateDeleteParams = {
    /** A unique integer value identifying this supplier rate. */
    id: number;
  };

  type apiMaterialSupplierRateListParams = {
    /** A search term. */
    search?: string;
    supplier?: string;
    order?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiMaterialSupplierRatePartialUpdateParams = {
    /** A unique integer value identifying this supplier rate. */
    id: number;
  };

  type apiMaterialSupplierRateReadParams = {
    /** A unique integer value identifying this supplier rate. */
    id: number;
  };

  type apiMaterialSupplierRateUpdateParams = {
    /** A unique integer value identifying this supplier rate. */
    id: number;
  };

  type apiOaDepartmentDeleteParams = {
    /** A unique integer value identifying this 部门. */
    id: number;
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
    /** A unique integer value identifying this 部门. */
    id: number;
  };

  type apiOaDepartmentReadParams = {
    /** A unique integer value identifying this 部门. */
    id: number;
  };

  type apiOaDepartmentUpdateParams = {
    /** A unique integer value identifying this 部门. */
    id: number;
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

  type apiOaUserWecomUserParams = {
    /** A UUID string identifying this 用户. */
    id: string;
  };

  type apiSelectorListParams = {
    /** 下拉框类型：user(用户)、project(项目)、supplier(供应商)。 */
    select_type: string;
  };

  type apiWecomUserDeleteParams = {
    /** A UUID string identifying this wecom user. */
    id: string;
  };

  type apiWecomUserListParams = {
    /** A search term. */
    search?: string;
    user_id?: string;
    userid?: string;
    /** A page number within the paginated result set. */
    current?: number;
    /** Number of results to return per page. */
    pageSize?: number;
  };

  type apiWecomUserPartialUpdateParams = {
    /** A UUID string identifying this wecom user. */
    id: string;
  };

  type apiWecomUserReadParams = {
    /** A UUID string identifying this wecom user. */
    id: string;
  };

  type apiWecomUserUpdateParams = {
    /** A UUID string identifying this wecom user. */
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
    /** Created by name */
    created_by_name?: string;
    /** Estimator name */
    estimator_name?: string;
    /** Principal name */
    principal_name?: string;
    /** End by name */
    end_by_name?: string;
    /** Supplier name */
    supplier_name?: string;
    /** Project name */
    project_name?: string;
    /** 合同名称 */
    name?: string;
    /** Created time */
    created_time?: string;
    /** 类别 */
    category: string;
    /** Timestamp */
    timestamp?: string;
    /** 进度 */
    progress?: string;
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
    /** Id */
    id?: string;
    /** Material name */
    material_name?: string;
    /** Material sku */
    material_sku?: string;
    /** Material unit */
    material_unit?: string;
    /** Total buy num */
    total_buy_num?: string;
    /** 表格排序序号 */
    sort?: number;
    /** 预算员数量 */
    estimator_num?: number;
    /** 施工员数量 */
    principal_num?: number;
    /** 最终数量 */
    end_num?: number;
    /** Timestamp */
    timestamp?: string;
    /** Contract */
    contract: string;
    /** Material */
    material: number;
  };

  type ContractPermission = {
    /** ID */
    id?: number;
    /** User name */
    user_name?: string;
    /** Contract name */
    contract_name?: string;
    /** Contract user */
    contract_user?: string;
    /** 创建时间 */
    created_time?: string;
    /** 是否有权限 */
    is_permission?: boolean;
    /** 企业微信审批单编号 */
    sp_no?: string;
    /** Contract */
    contract: string;
    /** User */
    user: string;
  };

  type Department = {
    /** ID */
    id?: number;
    /** Manager name */
    manager_name?: string;
    /** Project name */
    project_name?: string;
    /** 部门名称 */
    name: string;
    /** 在父部门中的排序，值越大排序越靠后 */
    order?: number;
    /** 项目 */
    project: string;
    /** 父类架构 */
    parent?: number;
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

  type Membership = {
    /** Project name */
    project_name: string;
    /** Identity name */
    identity_name?: string;
    /** 加入时间 */
    created_time?: string;
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
    checked_by?: OrderChecked[];
    /** Sp status name */
    sp_status_name?: string;
    /** Checkers */
    checkers?: string;
    /** Materials */
    materials?: string;
    /** 材料单名称 */
    name?: string;
    /** Created time */
    created_time?: string;
    /** 类别 */
    category?: string;
    /** Timestamp */
    timestamp?: string;
    /** 进度 */
    step?: 2 | 5 | 4 | 1 | 0 | 3;
    /** 文件 */
    file?: string;
    /** 审核单编号 */
    sp_no?: string;
    /** 审核状态 */
    sp_status?: 0 | 4 | 1 | 6 | 10 | 7 | 3 | 2;
    /** 企业文档字段 */
    fileid?: string;
    /** 腾讯文档 */
    share_url?: string;
    /** Project */
    project?: string;
    /** 订单所属部门 */
    department?: number;
    /** Created by */
    created_by?: string;
    /** Supplier */
    supplier?: string;
    /** 供应商评价 */
    supplier_rate?: number;
    creators?: string[];
  };

  type OrderChecked = {
    /** ID */
    id?: number;
    /** Checked by name */
    checked_by_name?: string;
    /** Checked by userid */
    checked_by_userid?: string;
    /** Sp status name */
    sp_status_name?: string;
    /** Created by avatar */
    created_by_avatar?: string;
    /** Order name */
    order_name?: string;
    /** Created by name */
    created_by_name?: string;
    /** Checked time */
    checked_time?: string;
    /** Sp no */
    sp_no?: string;
    /** Speech */
    speech?: string;
    /** Sp status */
    sp_status?: 4 | 3 | 1 | 2;
    /** Sp time */
    sp_time?: string;
    /** 创建时间 */
    created_time?: string;
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
    /** Id */
    id?: string;
    /** Material name */
    material_name?: string;
    /** Material sku */
    material_sku?: string;
    /** Material unit */
    material_unit?: string;
    /** Contract name */
    contract_name?: string;
    /** Order name */
    order_name?: string;
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
    /** Timestamp */
    timestamp?: string;
    /** Order */
    order: string;
    /** Material */
    material: number;
    /** Contract */
    contract?: string;
    /** Receipt */
    receipt?: string;
  };

  type OrderPermission = {
    /** ID */
    id?: number;
    /** User name */
    user_name?: string;
    /** Order name */
    order_name?: string;
    /** Order user */
    order_user?: string;
    /** 创建时间 */
    created_time?: string;
    /** 是否有权限 */
    is_permission?: boolean;
    /** 企业微信审批单编号 */
    sp_no?: string;
    /** Order */
    order: string;
    /** User */
    user: string;
  };

  type Project = {
    /** Id */
    id?: string;
    /** Manager name */
    manager_name?: string;
    /** Departments */
    departments?: string;
    /** 项目名称 */
    name: string;
    /** 项目地址 */
    address: string;
    /** 企业微信空间id */
    spaceid?: string;
    /** 自己对应的部门id */
    department_id?: string;
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

  type SupplierRate = {
    /** ID */
    id?: number;
    /** 综合评分 */
    rate?: number;
    /** 送货速度 */
    delivery_speed?: number;
    /** 配套服务 */
    support_service?: number;
    /** 质量 */
    quality?: number;
    /** 评价意见 */
    comments?: string;
    /** 创建时间 */
    created_time?: string;
    /** 更新时间 */
    updated_time?: string;
    /** Order */
    order: string;
    /** Supplier */
    supplier?: string;
    /** 评价创建人 */
    created_by?: string;
  };

  type TokenObtainPair = {
    /** Username */
    username: string;
    /** Password */
    password: string;
  };

  type TokenRefresh = {
    /** Refresh */
    refresh: string;
    /** Access */
    access?: string;
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
    /** 企业微信userid字段 */
    userid?: string;
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
    department?: number;
    /** Department name */
    department_name?: string;
    /** Avatar */
    avatar?: string;
    membership?: Membership[];
    /** 该用户归属的组。一个用户将得到其归属的组的所有权限。 */
    groups?: number[];
    /** 这个用户的特定权限。 */
    user_permissions?: number[];
  };

  type WecomUser = {
    /** Id */
    id?: string;
    /** Userid */
    userid?: string;
    /** Mobile */
    mobile?: string;
    /** Gender */
    gender?: string;
    /** Email */
    email?: string;
    /** Avatar */
    avatar?: string;
    /** Qr code */
    qr_code?: string;
    /** Biz mail */
    biz_mail?: string;
    /** Address */
    address?: string;
    /** User */
    user?: string;
  };
}
