import express, { Request, Response, Application } from "express";
import path from "path";
import dotenv from "dotenv";
import { router as apiRouter } from "./src/routes/apidocs.ts";
import { router as itemsRouter } from "./src/routes/items.ts";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
const staticPath = path.join(__dirname, "static");

const url = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(url);
async function run() {
  try {
    // Подключаемся к серверу
    await mongoClient.connect();
    // обращаемся к базе данных admin
    const db = mongoClient.db("items");
    // выполняем пинг для проверки подключения
    const result = await db.command({ ping: 1 });
    console.log("Подключение с сервером успешно установлено");
    console.log(result);
  } catch (err) {
    console.log("Возникла ошибка");
    console.log(err);
  } finally {
    // Закрываем подключение при завершении работы или при ошибке
    await mongoClient.close();
    console.log("Подключение закрыто");
  }
}
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/items");
    console.log("Сервер");
  } catch (err) {
    return console.log(err);
  }
}
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("Приложение завершило работу");
  process.exit();
});

app.use(express.json());
app.use(express.static(staticPath));
app.use("/api", apiRouter);
app.use("/items", itemsRouter);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, "html", "index.html"));
});

app.get("/ping", (_, res: Response) => {
  res.send("pong");
});

app.listen(port, async () => {
  console.log("стартуем");
  await run();
  await main();
});
