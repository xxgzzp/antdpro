// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api-token-auth/ */
export async function apiTokenAuthCreate(body: API.AuthToken, options?: { [key: string]: any }) {
  return request<API.AuthToken>('/api-token-auth/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
