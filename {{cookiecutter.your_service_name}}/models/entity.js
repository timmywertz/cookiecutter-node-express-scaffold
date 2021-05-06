/* eslint-disable class-methods-use-this */
const db = require('../database/db');

class Entity {
  getEntities() {
    return db.getRecords();
  }

  getEntity(entity) {
    return db.getRecordById(entity.id);
  }

  create(entity) {
    return db.insertRecord(entity);
  }

  update(entity) {
    return db.updateRecord(entity);
  }

  delete(entity) {
    return db.deleteRecord(entity.id);
  }
}

module.exports = Entity;
