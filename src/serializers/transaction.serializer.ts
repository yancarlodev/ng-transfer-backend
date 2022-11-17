import * as yup from 'yup'
import { ICashOutRequest } from '../interfaces/transaction.interface'

export const cashOutSerializer: yup.SchemaOf<ICashOutRequest> = yup.object().shape({
    username: yup.string().min(3).required('Username is a required field'),
    value: yup.string().required('Value is a required field')
}).noUnknown(true, (keys: any) => `The following key is not allowed or don't exist: ${keys.unknown}`).strict()