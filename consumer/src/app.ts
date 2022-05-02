const kafka = require('kafka-node');
const moment = require('moment');
const uuidv4 = require('uuid/v4');

const main = async () => {
    const kafkaClientOptions = { sessionTimeout: 100, spinDelay: 100, retries: 2 };
    const kafkaClient = new kafka.Client("localhost:2181", 'consumer-client', kafkaClientOptions);
    const topics = [
      { topic: 'messages-topic' }
    ];
    
    const options = {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'buffer'
    };
    
    const kafkaConsumer = new kafka.HighLevelConsumer(kafkaClient, topics, options);
    
    kafkaConsumer.on('message', async function(message:any) {
      const messageBuffer = Buffer.from(message.value, 'binary');
      var message = JSON.parse(JSON.stringify(messageBuffer.toString()));
      console.log('Decoded message: ', message)
    });
    
    kafkaClient.on('error', (error:any) => console.error('Kafka client error:', error));
    kafkaConsumer.on('error', (error:any) => console.error('Kafka consumer error:', error));
  };

  main().catch(error => {
    console.error(error)
    process.exit(1)
  })