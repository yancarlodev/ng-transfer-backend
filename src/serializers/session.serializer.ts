import * as yup from 'yup'
import { ILoginRequest, IRegisterRequest } from '../interfaces/session.interfaces'

export const registerSerializer: yup.SchemaOf<IRegisterRequest> = yup.object().shape({
    username: yup.string().min(3).required('Username is a required field'),
    password: yup.string().matches(/^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, 'Password must contain at least 8 characters, one uppercase and one number').required('Password is a required field'),
}).noUnknown(true, (keys: any) => `The following key is not allowed or don't exist: ${keys.unknown}`).strict()

export const loginSerializer: yup.SchemaOf<ILoginRequest> = yup.object().shape({
    username: yup.string().required('Username is a required field'),
    password: yup.string().required('Password is a required field'),
}).noUnknown(true, (keys: any) => `The following key is not allowed or don't exist: ${keys.unknown}`).strict()