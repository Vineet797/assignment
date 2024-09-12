const mockDb = {
    data: {
      requests: [],
      admins: [{ username: "admin", password: "admin123" }]
    },
    read: jest.fn().mockResolvedValue(true),
    write: jest.fn().mockResolvedValue(true),
  };
  
  class Low {
    constructor() {
      this.data = mockDb.data;
    }
  
    async read() {
      return mockDb.read();
    }
  
    async write() {
      return mockDb.write();
    }
  }
  
  class JSONFile {
    constructor() {
      return;
    }
  }
  
  module.exports = { Low, JSONFile, mockDb };
  