import type { ICoreRequestOptions } from '@/app/services/http/core'

export interface IRestRequestOptions<TBody = unknown>
  extends ICoreRequestOptions {
  body?: TBody
}

export type TRestResponse<T> = T
