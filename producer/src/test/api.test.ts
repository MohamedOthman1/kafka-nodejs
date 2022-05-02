import IMessage from "../models/IMessage";
const chance = require('chance')();
const supertest = require("supertest");
const app = require("../app")


describe("GET/POST /message", () => {
    it("Get messages", async () => {
        const response = await supertest(app).get('/message')
        expect(response.statusCode).toBe(200);
    });

    it("Fail to post because topic value not exist", async () => {
        const someMessage :IMessage  = {
            Author : chance.string({ length: 5 }),
            Subject: chance.string({ length: 5 }),
            Body: chance.string({ length: 5 })
        };
        const response = await supertest(app).post('/message').send({message: someMessage})
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.text).error).toBe('Topic value cannot be empty');
    });


    it("Fail to post because message value not exist", async () => {
        const response = await supertest(app).post('/message')
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.text).error).toBe('Request Body is empty');
    });
});