export interface IRegisterRequest {
    username: string,
    password: string
}

export interface IRegisterResponse {
    id: string,
    username: string,
    password?: string,
    accountId: string
}

export interface ILoginRequest {
    username: string,
    password: string
}