import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import {PageLoading, SettingDrawer} from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import React from 'react';
import { apiOaCurrentuserList } from './services/ant-design-pro/api';
import Cookies from 'js-cookie';
import {toast, ToastContainer} from "react-toastify";
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';
import 'react-toastify/dist/ReactToastify.css';


/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    settings?: Partial<LayoutSettings>;
    currentUser?: API.User;
    loading?: boolean;
    fetchUserInfo?: () => Promise<API.User | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await apiOaCurrentuserList({
        skipErrorHandler: true,
      });
      console.log(msg)
      console.log("初始化数据成功")
      return msg;
    } catch (error) {
        console.log("初始化时获取当前用户数据失败")
        history.push(loginPath);
        return undefined;
    }
  };
  // 如果不是登录页面，就初始化全局数据
  const { location } = history;
  if (location.pathname !== loginPath) {
    // console.log(loginPath)
    console.log(location.pathname)
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    waterMarkProps: {
      content: initialState?.currentUser?.username,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        console.log("app.tsx中")
        console.log(initialState?.currentUser)
        // history.push(loginPath);
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
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      if (initialState?.loading) return <PageLoading />;
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

// request拦截器 添加csrf和Token参数
const csrfTokenInterceptor = (url: string, options: RequestConfig) => {
  NProgress.start(); // 显示进度条
  return{
    url: `${url}`,
    options: { ...options, interceptors: true,
      headers: {'X-CSRFToken':Cookies.get('csrftoken'),
        'Authorization':` Token ${localStorage.getItem(' Token ')}`
      }
    },
  }
}

// 统一请求配置
// @ts-ignore
export const request: RequestConfig = {
  // errorConfig: {
  //   //自定义返回的数据
  //   // adaptor: (resData) => {
  //   //   // resData 是我们自己的数据
  //   //   console.log(resData)
  //   //   return {
  //   //     ...resData,
  //   //     total: resData.count,
  //   //     // success: resData.ok,
  //   //     data: resData.results,
  //   //     errorMessage: resData.message,
  //   //   };
  //   // },
  //   // 错误抛出
  //   // errorThrower: (res) => {
  //   //   const {success, data, errorCode, errorMessage, showType,} = res;
  //   //   if (!success) {
  //   //     const error: any = new Error(errorMessage);
  //   //     error.name = 'BizError';
  //   //     error.info = {errorCode, errorMessage, showType, data};
  //   //     toast("错误", {
  //   //       position: "top-right",
  //   //       autoClose: 5000,
  //   //       hideProgressBar: false,
  //   //       closeOnClick: true,
  //   //       pauseOnHover: true,
  //   //       draggable: true,
  //   //       progress: undefined,
  //   //       theme: "light",
  //   //     });
  //   //     throw error; // 抛出自制的错误
  //   //   }
  //   // }
  // },
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  // 新增自动添加AccessToken的请求前拦截器
  requestInterceptors: [csrfTokenInterceptor],
  responseInterceptors: [
    (response) => {
      NProgress.done(); // 隐藏进度条
      // 拦截响应数据，进行个性化处理
      const {data}:any = response;
      // 统一处理 响应后的message
      if (typeof (data.message) !== "undefined" ) {
        if(data.message !== ""){
          if (data.success){
            toast.success(data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          }else {
            toast.error(data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          }

        }
      }
      // 处理响应后的格式
      if ("undefined" !== typeof (data.results)) {
        // @ts-ignore
        response["data"]["data"] = response['data']['results']
      }
      if ("undefined" !== typeof (data.count)) {
        // @ts-ignore
        response["data"]["total"] = response['data']['count']
      }
      return response;
    }],

};
