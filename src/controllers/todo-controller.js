const path = require("path");
const { v4: uuid } = require("uuid");
const FileService = require("../services/file-service");
const ResponseService = require("../services/response-service");
const Messages = require("../constants/messages");

const folderPath = path.join(__dirname, "..", "..", "data");
const filePath = path.join(folderPath, "todos.json");

class TodoController {
  async add(req, res) {
    const { body } = req;

    if (!body.title) {
      return res
        .status(400)
        .send(ResponseService.createResponse(400, Messages.titleRequired));
    }

    try {
      const dataArray = await FileService.readFile(filePath);
      dataArray.push({ ...body, id: uuid() });
      await FileService.writeToFile(dataArray, filePath);
      res
        .status(200)
        .send(ResponseService.createResponse(200, Messages.success));
    } catch (error) {
      if (error.code === "ENOENT") {
        try {
          await FileService.createFolder(folderPath);
          await FileService.writeToFile([{ ...body, id: uuid() }], filePath);
          res
            .status(200)
            .send(ResponseService.createResponse(200, Messages.success));
        } catch (createErr) {
          res
            .status(500)
            .send(ResponseService.createResponse(500, Messages.error));
        }
      } else {
        res
          .status(500)
          .send(ResponseService.createResponse(500, Messages.error));
      }
    }
  }

  async getList(_req, res) {
    try {
      const dataArray = await FileService.readFile(filePath);
      res.status(200).send(dataArray);
    } catch (error) {
      if (error.code === "ENOENT") {
        res.status(200).send([]);
      } else {
        res
          .status(500)
          .send(ResponseService.createResponse(500, Messages.error));
      }
    }
  }

  async getById(req, res) {
    const { id } = req.query;
    try {
      if (id) {
        const dataArray = await FileService.readFile(filePath);
        const todo = dataArray.find((todo) => todo.id === id);
        if (todo) {
          res.status(200).send(todo);
        } else {
          res
            .status(404)
            .send(ResponseService.createResponse(404, Messages.noId));
        }
      } else {
        res
          .status(400)
          .send(ResponseService.createResponse(400, Messages.noId));
      }
    } catch (err) {
      res.status(500).send(ResponseService.createResponse(500, Messages.error));
    }
  }

  async remove(req, res) {
    const { id } = req.query;
    try {
      if (id) {
        const dataArray = await FileService.readFile(filePath);
        const updatedDataArray = dataArray.filter((todo) => todo.id !== id);
        await FileService.writeToFile(updatedDataArray, filePath);
        res
          .status(200)
          .send(ResponseService.createResponse(200, Messages.success));
      } else {
        res
          .status(400)
          .send(ResponseService.createResponse(400, Messages.noId));
      }
    } catch (err) {
      res.status(500).send(ResponseService.createResponse(500, Messages.error));
    }
  }

  async update(req, res) {
    const { body } = req;
    if (!body.id) {
      return res
        .status(400)
        .send(ResponseService.createResponse(400, Messages.noId));
    }
    if (!body.title) {
      return res
        .status(400)
        .send(ResponseService.createResponse(400, Messages.titleRequired));
    }
    try {
      const dataArray = await FileService.readFile(filePath);
      const todoIndex = dataArray.findIndex((todo) => todo.id === body.id);
      if (todoIndex !== -1) {
        dataArray[todoIndex] = body;
        await FileService.writeToFile(dataArray, filePath);
        res
          .status(200)
          .send(ResponseService.createResponse(200, Messages.success));
      } else {
        res
          .status(404)
          .send(ResponseService.createResponse(404, Messages.notFound));
      }
    } catch (error) {
      res.status(500).send(ResponseService.createResponse(500, Messages.error));
    }
  }
}

module.exports = TodoController;
