export interface ICashOutRequest {
    username: string,
    value: string
}

export interface IQueryParams {
    'cash-outs-only'?: string,
    'cash-ins-only'?: string,
    'order-by-time'?: string
}