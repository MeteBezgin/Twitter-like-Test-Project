import express from "express";
import config from "config";
import connect from "./db/connect";
import routes from "../routes";
import cors from "cors";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);

  connect();
  routes(app);
});
