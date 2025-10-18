import express from 'express';
import { crawlerRouter } from './routes/crawler.route.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', crawlerRouter);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});