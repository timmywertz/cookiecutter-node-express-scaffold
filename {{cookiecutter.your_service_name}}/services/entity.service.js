class EntityService {
  constructor(entityModel) {
    this.entityModel = entityModel;
  }

  async getAll() {
    return this.entityModel.getEntities();
  }

  async getEntity(data) {
    return this.entityModel.getEntity({ id: data.id });
  }

  async createEntity(data) {
    const entity = { name: data.name, color: data.color };
    const record = await this.entityModel.create(entity);
    return record;
  }

  async updateEntity(data) {
    const entity = { id: data.id, name: data.name, color: data.color };
    const updatedRecord = await this.entityModel.update(entity);
    return updatedRecord;
  }

  async deleteEntity(data) {
    await this.entityModel.delete({ id: data.id });
  }
}

module.exports = EntityService;
