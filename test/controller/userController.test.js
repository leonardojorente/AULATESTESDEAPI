//bibliotecas
const request = require('supertest');
const sinon = require('sinon'); 
const { expect } = require('chai');

//aplicação
const app = require('../../app');

// mock
const userService = require('../../service/userService');


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
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado');
       })

       it('Mock: quando retorno dados validos o retorno é 400',async () => {
            const trasnferServiceMock = sinon.stub(userService, 'transferValue')
            trasnferServiceMock.throws(new Error('Usuário não encontrado'));

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: 'user1',
                    to: 'user2',
                    value: 100
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('message', 'Usuário não encontrado');

            sinon.restore(); // Restaura o comportamento original do método após o teste
       })

       it.only('Mock: quando retorno dados validos o retorno é 200',async () => {
            const trasnferServiceMock = sinon.stub(userService, 'transferValue')
            trasnferServiceMock.returns({
                from: 'user1',  
                to: 'user2',
                value: 100
            })

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: 'user1',
                    to: 'user2',
                    value: 100
                });
            const respostaEsperada = require('../fixture/respostas/quando-retorno-dados-validos-o-retorno-e-200.json');
            delete resposta.body.message
            delete respostaEsperada.message

            console.log(resposta.body);
            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.deep.equal(respostaEsperada);
            //expect(resposta.body).to.have.property('from', 'user1');

            sinon.restore(); // Restaura o comportamento original do método após o teste
       })
    })
})
