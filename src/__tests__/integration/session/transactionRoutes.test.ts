import request from 'supertest'
import { app } from '../../../app'
import { mockedUser, mockedUserWithInvalidName, mockedUserWithInvalidPassword } from '../../mocks'
import { token } from './sessionRoutes.test'

describe('/transaction (e2e)', () => {
    describe('POST ---> transaction/balance', () => {
        it('Should be able to get the balance value', async () => {
            const response = await request(app).get('/transaction/balance').set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('balance')
        })

        it('Should not be able to get the balance value without token', async () => {
            const response = await request(app).get('/transaction/balance')

            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('statusCode')
            expect(response.body).toHaveProperty('message')
        })
    })
})