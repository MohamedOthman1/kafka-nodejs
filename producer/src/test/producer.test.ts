import IMessage from "../models/IMessage";
import Producer from '../producer';
const kafka = require('kafka-node');
const chance = require('chance')();

const getCurrentKafkaOffset = (topic) => {
    const kafkaClientOptions = { sessionTimeout: 100, spinDelay: 100, retries: 2 };
    const client = new kafka.KafkaClient('localhost:2181', 'producer-client', kafkaClientOptions);
    const offset = new kafka.Offset(client);
    return new Promise((resolve, reject) => offset.fetchLatestOffsets([topic], (error, data) => {
        error? reject(error) : resolve(data[topic]["0"]);
    }));
};

describe("kafka producer", () => {
    it("should send message to kafka", async () => {
        const topic ="messages-topic";
        const someMessage :IMessage  = {
            Author : chance.string({ length: 5 }),
            Subject: chance.string({ length: 5 }),
            Body: chance.string({ length: 5 })
        };
        const expectedOffset:any = await getCurrentKafkaOffset(topic);
        const producer = new Producer();
        producer.sendMessage(topic, someMessage);

        const currentOffset:any = await getCurrentKafkaOffset(topic);
        const sentMessagesCount:number = currentOffset - expectedOffset;
        expect(sentMessagesCount).toBe(1);
    });
});