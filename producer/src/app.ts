import express, {Application, Request, Response} from 'express'
import Router  from "express-promise-router";
import bodyParser from 'body-parser'
import Producer from './producer';
const { Client } = require('pg');
const app: Application = express();
const port: number = 3000;
const router:express.Router   = new (Router as any);
app.use('/', router)
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const cn = {
  host: 'localhost', // server name or IP address;
  port: 3307,
  user: 'postgres',
  password: 'mysecretpassword'
};

const pgClient = new Client(cn);
pgClient.connect();

router.post('/message', async (req: Request, res: Response) => {
    const {message, topic} = req.body
    if(!message){
        res.status(400);
        return res.json({ error: 'Request Body is empty' });
    }
    if(!topic){
      res.status(400);
      return res.json({ error: 'Topic value cannot be empty' });
    }
    

    const producer = new Producer();
    producer.sendMessage(topic, message).then(() => {
      return res.status(200).json("Message sent!");
    }).catch(error => {
      res.status(400);
      return res.json({ error: error });
    })

    await pgClient.query({
      text: 'INSERT INTO message(author, subject, body) VALUES($1, $2, $3)',
      values: [message.Author, message.Subject, message.Body],
    });
});

router.get('/message', async (req: Request, res: Response) => {
  const { rows } = await pgClient.query('SELECT id, author, subject, body, createdAt FROM message');
  return res.status(200).json(rows);
});

if (process.env.NODE_ENV !== 'test') {
  const appPort = process.env.PRODUCER_PORT ? process.env.PRODUCER_PORT : port
  app.listen(appPort, ()=> {
    console.log(`Connected successfully on port ${appPort}`)
})
}

module.exports = app;