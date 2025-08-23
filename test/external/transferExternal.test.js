//bibliotecas
const request = require('supertest');
const { expect } = require('chai');

describe('User Controller Tests', () => {
    describe('POST /transfer', () => {
        it('quando retorno dados validos o retorno é 200',async () => {
            const resposta = await request('http://localhost:3000')
                .post('/transfer')
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
