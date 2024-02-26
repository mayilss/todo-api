class ResponseService {
  static createResponse(status, message) {
    return { status, message };
  }
}

module.exports = ResponseService;
