/*
 * @Author: zp
 * @Date:   2020-01-16 09:17:57
 * @Last Modified by: zp
 * @Last Modified time: 2022-03-01 15:58:24
 */
import { request, CONSTANTS } from '@/utils';

const { SEIAUTHSERVICE, BASICSERVICE, BASEURL } = CONSTANTS;

/** 更新密码 */
export const updatePwd = data =>
  request({
    method: 'POST',
    url: `${SEIAUTHSERVICE}/account/updatePassword`,
    data,
    headers: {
      needToken: false,
    },
  });

/**
 * 单点登录获取用户信息
 * @param {object} data 参数
 */
export const getUserByXsid = params =>
  request({
    url: `${SEIAUTHSERVICE}/auth/getSessionUser?sid=${params.sid}`,
    headers: {
      needToken: false,
      'x-sid': params.sid,
    },
  });

/**
 * 绑定社交账号
 * @param {object} data 参数
 */
export const bindingSocialAccount = data =>
  request.post(`${SEIAUTHSERVICE}/sso/binding/socialAccount`, data, {
    headers: {
      needToken: false,
    },
  });

/**
 * 登录方法
 * @param {object} params [参数]
 * account {string} 账号
 * password {string} 密码
 * tenant {string} 租户
 * id {string} 唯一值
 */
export async function userLogin(params) {
  return request.post(`${SEIAUTHSERVICE}/auth/login`, params, {
    headers: {
      needToken: false,
    },
  });
}

/**
 * 用户退出
 * @param  {object} params {sid: ''}
 */
export async function userLogout(params) {
  return request({
    url: `${SEIAUTHSERVICE}/auth/logout`,
    method: 'POST',
    data: params.sid,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/** 获取验证码 */
export async function getVerifyCode(reqId) {
  return request({
    method: 'GET',
    url: `${SEIAUTHSERVICE}/verifyCode/generate?reqId=${reqId}`,
    headers: {
      needToken: false,
    },
  });
}

/** 获取生成二维码配置信息 */
export async function authorizeData(authType = 'weChat') {
  return request({
    method: 'POST',
    url: `${SEIAUTHSERVICE}/sso/authorizeData?authType=${authType}`,
    headers: {
      needToken: false,
    },
  });
}

/** 获取wechat, sdk,配置信息 */
export async function getWeChatCfg(params = { authType: 'weChat' }) {
  return request({
    method: 'POST',
    url: `${SEIAUTHSERVICE}/sso/js/sdk`,
    params,
    // headers: {
    //   needToken: false,
    //   'content-type': 'application/json',
    // },
  });
}

/** 获取当前用户有权限的功能项集合 */
export async function getAuthorizedFeatures(userId) {
  return request.get(`${BASICSERVICE}/user/getUserAuthorizedFeatureMaps?userId=${userId}`);
}

/** 清除用户缓存 */
export async function clearUserAuthCaches() {
  return request.post(`${BASICSERVICE}/user/clearUserAuthorizedCaches`);
}

/**
 * 根据租户通过租户代码获取租户配置
 * params tenantCode
 */
export async function getTenantSetting(params) {
  const url = `${BASICSERVICE}/tenantSetting/findOne`;
  return request({
    url,
    method: 'GET',
    params,
  });
}

export const getPreferences = (params = {}) =>
  request({
    method: 'GET',
    url: `${BASICSERVICE}/userProfile/getPreferences`,
    params,
  });

/**
 * 设置新手引导，已知
 */
export const setUserGuidePreference = () =>
  request({
    method: 'POST',
    url: `${BASICSERVICE}/userProfile/setUserPreference/guide`,
    data: 'true',
    headers: { 'Content-Type': 'application/json' },
  });

/**
 * 忘记密码，发送验证码
 */
export const sendVerifyCode = (params = {}) =>
  request({
    method: 'GET',
    url: `${SEIAUTHSERVICE}/account/sendVerifyCode`,
    params,
  });

/**
 * 检查账号是否存在
 * @param {*} params
 */
export const checkExisted = ({ openId, reqId, tenant, verifyCode }) =>
  request({
    method: 'POST',
    url: `${SEIAUTHSERVICE}/account/checkExisted`,
    data: {
      openId,
      reqId,
      tenant,
      verifyCode,
    },
  });

/**
 * 找会密码
 */
export const findpwd = ({ id, newPassword, verifyCode }) =>
  request({
    method: 'POST',
    url: `${SEIAUTHSERVICE}/account/findpwd`,
    data: {
      id,
      newPassword,
      verifyCode,
    },
  });

/** 获取当前用户的信用信息 */
export async function getCurrentUserCredit() {
  return request({
    url: `${BASEURL}/soms-v6/employeeCredit/findCurrentUserCredit`,
  });
}

/** 当前租户是否启用信用管理 */
export async function enableCreditManagement() {
  return request({
    url: `${BASICSERVICE}/tenant/enableCreditManagement`,
  });
}
