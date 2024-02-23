const statuses = require("../constants/statuses");

class StatusController {
  getList(_req, res) {
    res.status(200).send(statuses);
  }
}

module.exports = StatusController;
