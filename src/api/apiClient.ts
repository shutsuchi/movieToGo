import _axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import {
  split as _split,
  isNaN as _isNaN,
  isUndefined as _isUndefined,
} from 'lodash';
import { ApiError } from '../models/commonModels';

class ApiClient {
  // static authHeaders: Partial<AccountAuthHeaderValues> = {}

  static create(isDefaultBaseURL?: boolean) {
    const axios = _axios.create({
      baseURL: isDefaultBaseURL ? process.env.API_URL : this.setBaseURL(),
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        // ...this.authHeaders,
      },
      responseType: 'json',
    })
    axios.interceptors.request.use(
      (config) => this.requestSuccess(config),
      (config) => this.requestFailure(config),
    )
    axios.interceptors.response.use(
      (config) => this.responseSuccess(config),
      (config) => this.responseFailure(config),
    )
    return axios
  }

  static setBaseURL() {
    const pathname = _split(window.location.pathname, '/')

    // if (
    //   pathname[1] === 'movies' ||
    //   // MEMO: マネソルから動画プラットフォームへ行く際にログインボタンで
    //   //       authenticationを叩くための条件
    //   (pathname[1] === 'plans' && pathname[2] === 'learningContent')
    // ) {
    //   return `${process.env.API_URL}/video_platform_api/v1/app`
    // }

    // if (pathname[1] === 'admins') {
    //   const accountId = Number(pathname[3])

    //   if (pathname[2] === 'accounts' && !_isNaN(accountId)) {
    //     return `${process.env.API_URL}/admin_api/v1/app/account/${accountId}`
    //   } else {
    //     return `${process.env.API_URL}/admin_api/v1/app`
    //   }
    // }

    // return `${process.env.API_URL}/api/v1/app`
    return `http://localhost:4000/api/v1`
  }

  static requestSuccess(config: AxiosRequestConfig) {
    if (process.env.NODE_ENV !== 'production') {
      this.logger('// REQUEST SUCCESS', config)
    }
    // MEMO: Request(成功)時の共通処理があればココに書く
    return config
  }

  static requestFailure(config: AxiosRequestConfig) {
    if (process.env.NODE_ENV !== 'production') {
      this.logger('// REQUEST FAILURE', config)
    }
    // MEMO: Request(失敗)時の共通処理があればココに書く
    return Promise.reject(config)
  }

  static responseSuccess(config: AxiosResponse<any>) {
    if (process.env.NODE_ENV !== 'production') {
      this.logger('// RESPONCE SUCCESS', config)
    }
    // MEMO: Response(成功)時の共通処理があればココに書く
    return config
  }

  static responseFailure(config: AxiosError) {
    if (process.env.NODE_ENV !== 'production') {
      this.logger('// RESPONCE FAILURE', config)
    }
    // MEMO: Response(失敗)時の共通処理があればココに書く
    const response = config.response
    let responseBase: ApiError = {}

    switch (response?.status) {
      case 400:
        responseBase = response.data.api_errors
        break
      case 401:
        if (!_isUndefined(response.data.api_errors)) {
          responseBase = response.data.api_errors
        }
        responseBase.isUnauthorized = true
        break
      case 402:
        responseBase.isPaymentRequired = true
        break
      case 500:
        responseBase.other = 'システムエラーが発生しました。'
        break
      default:
        responseBase.other = '通信エラーが発生しました。'
    }

    return Promise.reject(responseBase)
  }

  static logger(
    label: string,
    res: AxiosRequestConfig | AxiosResponse<any> | AxiosError,
  ) {
    if (process.env.NODE_ENV !== 'production') {
      console.groupCollapsed(label)
      console.dir(res)
      console.groupEnd()
    }
  }

  static async get(url: string, callback: any, option?: any, isDefaultBaseURL?: boolean) {
    const client = this.create(isDefaultBaseURL)
    return await client
      .get(url, option)
      .then((response) => {
        return callback(response.data)
      })
      .catch((error) => {
        console.log('ERROR!! occurred in Backend.')
        return Promise.reject(error)
      })
  }

  static async post(
    url: string,
    callback: any,
    option?: any,
    isDefaultBaseURL?: boolean,
  ) {
    const client = this.create(isDefaultBaseURL)
    return await client
      .post(url, option)
      .then((response) => {
        return callback(response.data)
      })
      .catch((error) => {
        console.log('ERROR!! occurred in Backend.')
        return Promise.reject(error)
      })
  }

  static async patch(
    url: string,
    callback: any,
    option?: any,
    isDefaultBaseURL?: boolean,
  ) {
    const client = this.create(isDefaultBaseURL)
    return await client
      .patch(url, option)
      .then((response) => {
        return callback(response.data)
      })
      .catch((error) => {
        console.log('ERROR!! occurred in Backend.')
        return Promise.reject(error)
      })
  }

  static async delete(
    url: string,
    callback: any,
    option?: any,
    isDefaultBaseURL?: boolean,
  ) {
    const client = this.create(isDefaultBaseURL)
    return await client
      .delete(url, option)
      .then((response) => {
        return callback(response.data)
      })
      .catch((error) => {
        console.log('ERROR!! occurred in Backend.')
        return Promise.reject(error)
      })
  }

  // static setAuthHeaders(authHeaders: Partial<AccountAuthHeaderValues>) {
  //   this.authHeaders = authHeaders
  // }

  // static setAdminAuthHeaders(authHeaders: Partial<FpAccountAuthHeaderValues>) {
  //   this.authHeaders = authHeaders
  // }
};

export default ApiClient;