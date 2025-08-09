//bibliotecas
const request = require('supertest');
const sinon = require('sinon'); 
const { expect } = require('chai');

//aplicação
const app = require('../../app');

describe('User Controller Tests', () => {
    describe('POST /transfer', () => {
        it('quando retorno dados validos o retorno é 200',async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: 'user1',
                    to: 'user2',
                    value: 100
                });
            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado');
       })
    })
})
