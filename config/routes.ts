import { GlobalOutlined } from "@ant-design/icons";

/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    name: '主页',
    path: '/',
    icon: 'home',
    layout: true,
    // component: './Dashboard',
    component: './User/UserCenter',
  },
  {
    name: 'OA系统',
    icon: 'crown',
    path: '/oa',
    routes: [
      {
        name: '用户',
        path: '/oa/user',
        icon: 'idcard',
        layout: true,
        component: './User',
      },
      {
        name: '供应商',
        path: '/oa/supplier',
        icon: 'shop',
        layout: true,
        component: './Supplier',
      },
      {
        name: '项目',
        path: '/oa/project',
        icon: 'bank',
        layout: true,
        component: './Project',
      },
    ],
  },
  {
    name: '材料单',
    icon: 'profile',
    layout: true,
    path: '/order',
    routes: [  // 添加子路由配置
      {
        name: '全部材料单',
        path: '/order/all',
        component: './Order',
      },
      {
        name: '材料单批量处理',
        path: '/order/order_all_modify',
        icon: 'RobotOutlined',
        layout: true,
        component: './Order/OrderAllModify',
      },
    ],
  },
  {
    name: '材料合同',
    path: '/Contract',
    icon: 'wallet',
    layout: true,
    component: './Contract',
  },
  {
    name: '材料汇总系统',
    path: '/material_all',
    icon: 'tool',
    layout: true,
    component: './Material',
  },
  // https://v3.umijs.org/zh-CN/plugins/plugin-layout
  {
    path: '/order/:order_id/orderitems/',
    name: '材料单明细',
    icon: 'tool',
    layout: true,
    hideInMenu: true,
    component: './Order/OrderItem',
  },
  {
    path: '/contract/:contract_id/contractitems/',
    name: '合同明细',
    icon: 'tool',
    layout: true,
    hideInMenu: true,
    component: './Contract/ContractItem',
  },
  {
    path: '/material',
    name: '材料系统',
    icon: 'tool',
    layout: false,
    component: './Material',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
  {
    name: 'login',
    path: '/login',
    layout: false,
    component: './User/Login',
  },
  {
    name: 'login_wecom',
    path: '/wecom',
    layout: false,
    component: './Wecom',
  },
  {
    name: 'text',
    path: '/text',
    layout: false,
    component: '../components/Loading/TextLoading',
  },
  {
    name: '注册页面',
    path: '/register',
    layout: false,
    component: './User/Register',
  },
  {
    name: '绑定企业微信结果页面',
    path: '/wecom_oauth_result',
    layout: false,
    component: './User/wecomBinding/WecomOauthResult',
  },
  {
    name: '绑定企业微信',
    path: '/wecomBinding',
    layout: false,
    component: './User/wecomBinding',
  },
  {
    name: '大数据材料搜索',
    path: '/search',
    layout: true,
    icon: 'GlobalOutlined',
    component: './BigData/Search',
  },
  {
    name: '商品详情',
    path: '/product/:product_id',
    layout: false,
    component: './BigData/ProductDetails',
  },
  // {
  //   name: '商品详情',
  //   path: '/123123',
  //   layout: true,
  //   component: './codepen/ScollText',
  // },
  {
    name: 'AI问询',
    path: '/chat',
    icon: 'RobotOutlined',
    layout: true,
    component: './Chat',
  },
];
