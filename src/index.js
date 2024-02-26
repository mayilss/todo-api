const express = require("express");
const routesHandler = require("./routes/index");
const cors = require("cors");
const Messages = require("./constants/messages");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

routesHandler(app);

app.all("*", (_req, res) => {
  res.status(404).send(Messages.notFound);
});

app.listen(port, () => console.log(port));
