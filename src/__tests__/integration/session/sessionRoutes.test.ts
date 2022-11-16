import { PrismaClient } from '@prisma/client'
import request from 'supertest'
import { app } from '../../../app'
import { mockedUserRegister, mockedUserRegisterWithInvalidName, mockedUserRegisterWithInvalidPassword } from '../../mocks'

describe('/session (e2e)', () => {
    const prisma = new PrismaClient()

    afterAll(async () => {
        await prisma.$queryRaw`DELETE FROM users`
        await prisma.$disconnect()
    })

    describe('POST ---> session/register', () => {
        it('Should be able to register a user', async () => {
            const response = await request(app).post('/session/register').send(mockedUserRegister)

            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('id')
            expect(response.body).toHaveProperty('accountId')
            expect(response.body).not.toHaveProperty('password')
        })

        it('Should not be able to register a user with invalid username', async () => {
            const response = await request(app).post('/session/register').send(mockedUserRegisterWithInvalidName)

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('statusCode')
            expect(response.body).toHaveProperty('message')
        })

        it('Should not be able to register a user with invalid password', async () => {
            const response = await request(app).post('/session/register').send(mockedUserRegisterWithInvalidPassword)

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('statusCode')
            expect(response.body).toHaveProperty('message')
        })

        it('Should not be able to register with a username that already exists', async () => {
            const response = await request(app).post('/session/register').send(mockedUserRegister)

            expect(response.status).toBe(409)
            expect(response.body).toHaveProperty('statusCode')
            expect(response.body).toHaveProperty('message')
        })
    })
})