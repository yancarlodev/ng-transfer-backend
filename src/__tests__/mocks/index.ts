import { IRegisterRequest } from "../../interfaces/session.interface"

export const mockedUser: IRegisterRequest = {
    username: "Matheus Lima",
    password: "Teste123"
}

export const mockedUserWithInvalidName: IRegisterRequest = {
    username: "Ma",
    password: "teste"
}

export const mockedUserWithInvalidPassword: IRegisterRequest = {
    username: "Matheus Lima",
    password: "teste"
}

export const mockedAlternativeUser: IRegisterRequest = {
    username: "João Faria",
    password: "Teste123"
}