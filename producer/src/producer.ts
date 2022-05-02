import IMessage from "./models/IMessage";
const kafka = require('kafka-node')
export default class Producer {

    public sendMessage(topic: string, message: IMessage) {
        const kafkaClientOptions = { sessionTimeout: 100, spinDelay: 100, retries: 2 };
        const client = new kafka.KafkaClient('localhost:2181', 'producer-client', kafkaClientOptions);
        const kafkaProducer = new kafka.HighLevelProducer(client);
        const messageBuffer = Buffer.from(JSON.stringify(message));
        const payload = [{
            topic: 'messages-topic',
            messages: messageBuffer,
            attributes: 1
          }];
        return new Promise((resolve, reject) => {
          kafkaProducer.send(payload, function(error : any, result : any) {  
            if (error) {
                reject(error)
              } else {
                resolve(result);
              }  
          });
        });
    }      
}