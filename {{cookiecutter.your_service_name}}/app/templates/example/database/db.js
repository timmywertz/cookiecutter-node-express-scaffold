/**
 * This is an in-memory datastore for interacting with the default api
 * You should replace this with a connection to your DB
 */

class InMemoryDB {
  records = [];

  async insertRecord(entity) {
    const recordToInsert = { ...entity };
    recordToInsert.id = Date.now().toString(); // use timestamp for unique id
    recordToInsert.createdOn = Date.now();
    recordToInsert.updatedOn = null;

    this.records.push(recordToInsert);

    return recordToInsert;
  }

  async getRecords() {
    return this.records;
  }

  async getRecordById(id) {
    return this.records.find((record) => record.id === id);
  }

  async updateRecord(record) {
    const recordToUpdate = this.records.find((item) => item.id === record.id);

    if (recordToUpdate) {
      const { name, color } = record;
      Object.assign(recordToUpdate, { name, color, updatedOn: Date.now() });
    }

    return recordToUpdate;
  }

  async deleteRecord(id) {
    this.records = this.records.filter((record) => record.id !== id);
  }
}

const db = new InMemoryDB();

module.exports = db;
