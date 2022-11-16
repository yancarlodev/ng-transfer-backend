import { IRegisterRequest } from "../../interfaces/session.interfaces"

export const mockedUserRegister : IRegisterRequest = {
    username: "Matheus Lima",
    password: "Teste123"
}

export const mockedUserRegisterWithInvalidName : IRegisterRequest = {
    username: "Ma",
    password: "teste"
}

export const mockedUserRegisterWithInvalidPassword : IRegisterRequest = {
    username: "Matheus Lima",
    password: "teste"
}