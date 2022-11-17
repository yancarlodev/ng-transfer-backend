import { PrismaClient } from '@prisma/client'
import request from 'supertest'
import { app } from '../../../app'
import { mockedUser, mockedUserWithInvalidName, mockedUserWithInvalidPassword } from '../../mocks'

export let token: string 

describe('Integration tests (e2e)', () => {
    const prisma = new PrismaClient()

    afterAll(async () => {
        await prisma.$disconnect()
    })

    describe('/session', () => {
        describe('POST ---> session/register', () => {
            it('Should be able to register a user', async () => {
                const response = await request(app).post('/session/register').send(mockedUser)
    
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty('id')
                expect(response.body).toHaveProperty('accountId')
                expect(response.body).not.toHaveProperty('password')
            })
    
            it('Should not be able to register a user with invalid username', async () => {
                const response = await request(app).post('/session/register').send(mockedUserWithInvalidName)
    
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
    
            it('Should not be able to register a user with invalid password', async () => {
                const response = await request(app).post('/session/register').send(mockedUserWithInvalidPassword)
    
                expect(response.status).toBe(400)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
    
            it('Should not be able to register with a username that already exists', async () => {
                const response = await request(app).post('/session/register').send(mockedUser)
    
                expect(response.status).toBe(409)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
        })
    
        describe('POST ---> session/login', () => {
            it('Should be able to login', async () => {
                const response = await request(app).post('/session/login').send(mockedUser)
                token = response.body.token
                
                expect(response.status).toBe(200)
                expect(response.body).toHaveProperty('token')
            })
    
            it('Should not be able to login with invalid username', async () => {
                const response = await request(app).post('/session/login').send(mockedUserWithInvalidName)
    
                expect(response.status).toBe(403)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
    
            it('Should not be able to login with invalid password', async () => {
                const response = await request(app).post('/session/login').send(mockedUserWithInvalidPassword)
    
                expect(response.status).toBe(403)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
        })
    })

    describe('/transaction', () => {
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
            
            it('Should not be able to get the balance value with invalid token', async () => {
                const response = await request(app).get('/transaction/balance').set('Authorization', `Bearer invalidtoken`)
    
                expect(response.status).toBe(401)
                expect(response.body).toHaveProperty('statusCode')
                expect(response.body).toHaveProperty('message')
            })
        })
    })
})