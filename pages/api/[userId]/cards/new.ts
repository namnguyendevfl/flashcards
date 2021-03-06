
import express from "express";
import { notFound, errorHandler } from "helpers/server/errors";
import cors from 'cors';
import { POST } from "helpers/server/getMethod";
import { cardsController } from "helpers/server/cards/cards.controller";
const app = express();
app.use(cors());

app.use(POST, cardsController.create);
app.use(notFound);
app.use(errorHandler);

export default app;
export const config = {
  api: {
    bodyParser: true, 
    externalResolver: true 
  }
};