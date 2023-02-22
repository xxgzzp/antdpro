declare namespace API {
  type apiMaterialContractDeleteParams = {
    /** A unique integer value identifying this 合同. */
    id: number;
  };

  type apiMaterialContractItemDeleteParams = {
    /** A unique integer value identifying this 合同详细项. */
    id: number;
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

  type apiMaterialContractPartialUpdateParams = {
    /** A unique integer value identifying this 合同. */
    id: number;
  };

  type apiMaterialContractReadParams = {
    /** A unique integer value identifying this 合同. */
    id: number;
  };

  type apiMaterialContractUpdateParams = {
    /** A unique integer value identifying this 合同. */
    id: number;
  };

  type apiMaterialInvoiceDeleteParams = {
    /** A unique integer value identifying this 票据. */
    id: number;
  };

  type apiMaterialInvoicePartialUpdateParams = {
    /** A unique integer value identifying this 票据. */
    id: number;
  };

  type apiMaterialInvoiceReadParams = {
    /** A unique integer value identifying this 票据. */
    id: number;
  };

  type apiMaterialInvoiceUpdateParams = {
    /** A unique integer value identifying this 票据. */
    id: number;
  };

  type apiMaterialMaterialDeleteParams = {
    /** A unique integer value identifying this material. */
    id: number;
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
    /** A unique integer value identifying this 订单. */
    id: number;
  };

  type apiMaterialOrderItemDeleteParams = {
    /** A unique integer value identifying this order item. */
    id: number;
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

  type apiMaterialOrderPartialUpdateParams = {
    /** A unique integer value identifying this 订单. */
    id: number;
  };

  type apiMaterialOrderReadParams = {
    /** A unique integer value identifying this 订单. */
    id: number;
  };

  type apiMaterialOrderUpdateParams = {
    /** A unique integer value identifying this 订单. */
    id: number;
  };

  type apiMaterialReceiptDeleteParams = {
    /** A unique integer value identifying this 签收单. */
    id: number;
  };

  type apiMaterialReceiptPartialUpdateParams = {
    /** A unique integer value identifying this 签收单. */
    id: number;
  };

  type apiMaterialReceiptReadParams = {
    /** A unique integer value identifying this 签收单. */
    id: number;
  };

  type apiMaterialReceiptUpdateParams = {
    /** A unique integer value identifying this 签收单. */
    id: number;
  };

  type apiOaDepartmentDeleteParams = {
    /** A unique integer value identifying this 部门. */
    id: number;
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
    /** A unique integer value identifying this 项目. */
    id: number;
  };

  type apiOaProjectPartialUpdateParams = {
    /** A unique integer value identifying this 项目. */
    id: number;
  };

  type apiOaProjectReadParams = {
    /** A unique integer value identifying this 项目. */
    id: number;
  };

  type apiOaProjectUpdateParams = {
    /** A unique integer value identifying this 项目. */
    id: number;
  };

  type apiOaSupplierDeleteParams = {
    /** A unique integer value identifying this 供货商. */
    id: number;
  };

  type apiOaSupplierPartialUpdateParams = {
    /** A unique integer value identifying this 供货商. */
    id: number;
  };

  type apiOaSupplierReadParams = {
    /** A unique integer value identifying this 供货商. */
    id: number;
  };

  type apiOaSupplierUpdateParams = {
    /** A unique integer value identifying this 供货商. */
    id: number;
  };

  type apiOaUserDeleteParams = {
    /** A unique integer value identifying this 用户. */
    id: number;
  };

  type apiOaUserPartialUpdateParams = {
    /** A unique integer value identifying this 用户. */
    id: number;
  };

  type apiOaUserReadParams = {
    /** A unique integer value identifying this 用户. */
    id: number;
  };

  type apiOaUserUpdateParams = {
    /** A unique integer value identifying this 用户. */
    id: number;
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
    /** ID */
    id?: number;
    /** 合同名称 */
    name?: string;
    /** Created time */
    created_time?: string;
    /** 类别 */
    category: string;
    /** Project */
    project: number;
    /** Created by */
    created_by: number;
    /** Estimator */
    estimator?: number;
    /** Principal */
    principal?: number;
    /** End by */
    end_by?: number;
    /** Supplier */
    supplier?: number;
    materials?: number[];
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
    contract: number;
    /** Material */
    material: number;
  };

  type Department = {
    /** ID */
    id?: number;
    /** 部门名称 */
    name: string;
    /** 项目 */
    project: number;
    /** 父类架构 */
    parent?: number;
    /** 主管 */
    manager?: number;
  };

  type Invoice = {
    /** ID */
    id?: number;
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
    unit: string;
    /** 创建时间 */
    created_time?: string;
    /** 创建者 */
    created_by?: number;
  };

  type Order = {
    /** ID */
    id?: number;
    /** 材料单名称 */
    name: string;
    /** Created time */
    created_time?: string;
    /** 类别 */
    category: string;
    /** Project */
    project?: number;
    /** Created by */
    created_by: number;
    /** Supplier */
    supplier?: number;
    materials?: number[];
    checkers?: number[];
    creators?: number[];
  };

  type OrderChecked = {
    /** ID */
    id?: number;
    /** 是否审核通过 */
    is_checked?: boolean;
    /** Checked time */
    checked_time?: string;
    /** Order */
    order: number;
    /** Checked by */
    checked_by: number;
  };

  type OrderCreated = {
    /** ID */
    id?: number;
    /** 订单创建的时间 */
    created_time?: string;
    /** Order */
    order: number;
    /** Created by */
    created_by: number;
  };

  type OrderItem = {
    /** ID */
    id?: number;
    /** 最晚到达时间 */
    need_time?: string;
    /** 购买数量 */
    buy_num: number;
    /** 使用部位 */
    used_site: string;
    /** 表格排序序号 */
    sort?: number;
    /** 是否到货 */
    is_arrival: boolean;
    /** Order */
    order: number;
    /** Material */
    material: number;
    /** Contract */
    contract?: number;
    /** Receipt */
    receipt?: number;
  };

  type Project = {
    /** ID */
    id?: number;
    /** Manager name */
    manager_name?: string;
    departments?: string[];
    /** 项目名称 */
    name: string;
    /** 项目地址 */
    address: string;
    /** 项目经理(外键) */
    manager?: number;
  };

  type Receipt = {
    /** ID */
    id?: number;
    /** Name */
    name: string;
    /** Created time */
    created_time?: string;
    /** Created by */
    created_by: number;
  };

  type Supplier = {
    /** ID */
    id?: number;
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
    manager?: number;
  };

  type User = {
    /** ID */
    id?: number;
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
    now_project?: number;
    /** Project name */
    project_name?: string;
    /** 部门 */
    department?: number;
    /** Department name */
    department_name?: string;
  };
}
