const fs = require("fs").promises;

class FileService {
  static async createFolder(folderPath) {
    try {
      await fs.mkdir(folderPath);
    } catch (err) {
      throw err;
    }
  }

  static async writeToFile(data, filePath) {
    try {
      await fs.writeFile(filePath, JSON.stringify(data));
    } catch (err) {
      throw err;
    }
  }

  static async readFile(filePath) {
    try {
      const fileData = await fs.readFile(filePath, "utf8");
      const dataArray = JSON.parse(fileData);
      return dataArray;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = FileService;
