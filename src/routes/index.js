const Router = require("express");
const TodoController = require("../controllers/todo-controller");
const StatusController = require("../controllers/status-controller");

const todoTouter = Router();
const todoController = new TodoController();

const statusRouter = Router();
const statusController = new StatusController();

todoTouter.post("/add", todoController.add);
todoTouter.get("/getList", todoController.getList);
todoTouter.get("/getById", todoController.getById);
todoTouter.delete("/remove", todoController.remove);
todoTouter.put("/update", todoController.update);

statusRouter.get("/getList", statusController.getList);

const routesHandler = (app) => {
  app.use("/todo", todoTouter);
  app.use("/status", statusRouter);
};

module.exports = routesHandler;
