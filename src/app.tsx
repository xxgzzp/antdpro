import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { LinkOutlined } from '@ant-design/icons';
import {PageLoading, Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history, Link, useModel } from '@umijs/max';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AxiosResponse } from '@umijs/utils/compiled/axios';
import { notification } from 'antd';
import defaultSettings from '../config/defaultSettings';
import React from "react";
const loginPath = '/login';

// 更改loading
// import { Spin } from 'antd';
// Spin.setDefaultIndicator(<div>123</div>);

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}


export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  loading?: boolean;
}> {

  const { location } = history;
  if (location.pathname !== loginPath) {
    // 没有token就返回登录地址
    const token = localStorage.getItem(' Token ');
    if (token === null) {
      history.push(loginPath);
    }
    return {
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }

  return {
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const { user, toggleUser } = useModel('user');
  const { toggleSelector } = useModel('selector');

  return {
    rightContentRender: () => <RightContent />,
    waterMarkProps: {
      content: user?.name,
    },
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (location.pathname !== loginPath) {
        // 如果不是登录页面 可以请求一些全局数据
        toggleUser();
        toggleSelector();
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: [
      <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
        <LinkOutlined />
        <span>OpenAPI 文档</span>
      </Link>,
    ],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <div>123</div>;
      return (
        <>
          <ToastContainer />
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};

// 请求前拦截 添加csrf和Token参数
const csrfTokenInterceptor = (url: string, options: RequestConfig) => {
  return {
    url: `${url}`,
    options: {
      ...options,
      interceptors: true,
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        Authorization: ` Token ${localStorage.getItem(' Token ')}`,
        // Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    },
  };
};

// 请求后拦截
function responseDataFormat() {
  return (response: AxiosResponse<any>) => {
    const { data }: any = response;
    // 处理响应后的格式
    if ('undefined' !== typeof data.results) {
      // @ts-ignore
      response['data']['data'] = response['data']['results'];
    }
    if ('undefined' !== typeof data.count) {
      // @ts-ignore
      response['data']['total'] = response['data']['count'];
    }
    return response;
  };
}

// 响应拦截器
function responseInterceptor() {
  return (response: AxiosResponse<any>) => {
    const { data }: any = response;

    // // 如果是表单错误的响应，对返回信息进行处理
    // if (data?.code === 400) {
    //   const { message, ...errors } = data;
    //   Object.keys(errors).forEach((key) => {
    //     const pattern = new RegExp(key, 'g');
    //     const errorMsg = errors[key][0].replace(pattern, `${key}字段`);
    //     toast.error(errorMsg);
    //   });
    // }

    // 认证失败
    if (data?.code === 401) {
      const { location } = history;
      if (location.pathname !== loginPath) {
        toast.error('身份已过期，请重新登录');
        localStorage.removeItem(' Token ');
        history.push(loginPath);
      }
    }

    // 统一处理 响应后的message
    if (typeof data.message !== 'undefined') {
      if (data.message !== '') {
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    }

    return response;
  };
}


export const request: RequestConfig = {
  // errorConfig: errorConfig,
  errorConfig: {
    // 错误抛出
    errorThrower: (res: ResponseStructure) => {
      const { success, data, errorCode, errorMessage, showType } = res;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        error.response = res
        error.status = errorCode
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              toast.warn(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              toast.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              toast.error(errorMessage);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        toast.error(`服务器出错:Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        toast.error('服务器问题,请联系管理员');
      } else {
        // 发送请求时出了点问题
        toast.error('服务器问题,请联系管理员');
      }
    },
  },
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  // 新增自动添加AccessToken的请求前拦截器
  requestInterceptors: [csrfTokenInterceptor],
  // @ts-ignore
  responseInterceptors: [responseDataFormat(), responseInterceptor()],
};

// errorConfig: {
//   // 错误抛出
//   errorThrower: (res: ResponseStructure) => {
//     const { success, data, errorCode, errorMessage, showType } = res;
//     if (!success) {
//       const error: any = new Error(errorMessage);
//       error.name = 'BizError';
//       error.info = { errorCode, errorMessage, showType, data };
//       throw error; // 抛出自制的错误
//     }
//   },
//     // 错误接收及处理
//     errorHandler: (error: any, opts: any) => {
//     if (opts?.skipErrorHandler) throw error;
//     // 我们的 errorThrower 抛出的错误。
//     if (error.name === 'BizError') {
//       const errorInfo: ResponseStructure | undefined = error.info;
//       if (errorInfo) {
//         const { errorMessage, errorCode } = errorInfo;
//         switch (errorInfo.showType) {
//           case ErrorShowType.SILENT:
//             // do nothing
//             break;
//           case ErrorShowType.WARN_MESSAGE:
//             toast.warn(errorMessage);
//             break;
//           case ErrorShowType.ERROR_MESSAGE:
//             toast.error(errorMessage);
//             break;
//           case ErrorShowType.NOTIFICATION:
//             notification.open({
//               description: errorMessage,
//               message: errorCode,
//             });
//             break;
//           case ErrorShowType.REDIRECT:
//             // TODO: redirect
//             break;
//           default:
//             toast.error(errorMessage);
//         }
//       }
//     } else if (error.response) {
//       // Axios 的错误
//       // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
//       toast.error(`Response status:${error.response.status}`);
//     } else if (error.request) {
//       // 请求已经成功发起，但没有收到响应
//       // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
//       // 而在node.js中是 http.ClientRequest 的实例
//       toast.error('None response! Please retry.');
//     } else {
//       // 发送请求时出了点问题
//       toast.error('Request error, please retry.');
//     }
//   },
// }

// function jwtInterceptor() {
//   return async (response: { [x: string]: { [x: string]: any } }) => {
//     const { headers } = response;
//     const authorization = headers.get('Authorization');
//     if (authorization && authorization.includes('Bearer ')) {
//       const token = authorization.replace('Bearer ', '');
//       // 检查token是否过期
//       const decodedToken = jwt.decode(token);
//       const expirationDate = new Date(decodedToken.exp * 1000);
//       console.log(expirationDate);
//       const currentDate = new Date();
//       if (currentDate >= expirationDate) {
//         // Access Token 已过期
//         // 尝试使用 Refresh Token 获取新的 Access Token
//         const refreshUrl = '/api/token/refresh/';
//         const refreshHeaders = new Headers({
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('refresh')}`,
//         });
//         try {
//           const refreshResponse = await fetch(refreshUrl, {
//             method: 'POST',
//             headers: refreshHeaders,
//           });
//           const refreshJson = await refreshResponse.json();
//           if (refreshJson.access && refreshJson.refresh) {
//             // 更新 Access Token 和 Refresh Token
//             localStorage.setItem('access', refreshJson.access);
//             localStorage.setItem('refresh', refreshJson.refresh);
//             // 更新 Authorization Header
//             response.headers.set('Authorization', `Bearer ${refreshJson.access}`);
//           }
//         } catch (err) {
//           // Refresh Token 无效或已过期
//           // 清除本地存储中的 Token
//           localStorage.removeItem('access');
//           localStorage.removeItem('refresh');
//
//           history.push('/login');
//         }
//       }
//     }
//   };
// }
