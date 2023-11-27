import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { faker } from '@faker-js/faker';

const app = express();
app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

function messageGenerator() {
  const messages = [];
    
  messages.push({
      id: faker.string.uuid(),
      from: `${faker.internet.userName(),faker.internet.email()}`,
      subject: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      received: faker.date.recent(),
    });
  
    return messages;
}
  
app.get('/messages/unread', async (request, response) => {
  const result = {
    status: 'ok',
    timestamp: Date.now(),
    messages: messageGenerator(),
  };
  response.status(200).send(JSON.stringify(result)).end();
});

const port = process.env.PORT || 3000;
const bootstrap = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server has been started on http://localhost:${port}`)
    );
  } catch (error) {
    console.error(error);
  }
};

bootstrap();