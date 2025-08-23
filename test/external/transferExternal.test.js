//bibliotecas
const request = require('supertest');
const { expect } = require('chai');

describe('User Controller Tests', () => {
    describe('POST /transfer', () => {
        it('quando retorno dados validos o retorno é 200',async () => {
            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .send({
                    username: 'user1',
                    password: 'senha123'
                });

            const token = respostaLogin.body.token;

            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: 'user1',
                    to: 'user2',
                    value: 100
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado');
       })

    })
})
