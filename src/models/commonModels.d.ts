export interface CommonResponse {
  success: boolean
  api_errors: ApiError
}

export interface ApiError {
  [key: string]: string | boolean
}

export type OmitCommonResponse<T> = Omit<T, 'success' | 'api_errors'>

export type RecursivePartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<RecursivePartial<R>>
    : RecursivePartial<T[K]>
}

export type PartiallyPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface TableColumnData {
  key: string
  display_name: string
  index: number
  nested_columns: TableColumnData[]
}
