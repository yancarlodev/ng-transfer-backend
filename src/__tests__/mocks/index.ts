import { IRegisterRequest } from "../../interfaces/session.interfaces"

export const mockedUser : IRegisterRequest = {
    username: "Matheus Lima",
    password: "Teste123"
}

export const mockedUserWithInvalidName : IRegisterRequest = {
    username: "Ma",
    password: "teste"
}

export const mockedUserWithInvalidPassword : IRegisterRequest = {
    username: "Matheus Lima",
    password: "teste"
}