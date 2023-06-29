const { errors } = require('../../utils/errors');
const models = require('../../database/models');

module.exports.checkModelAssociations = (Model, include) => {
  const associations = Object.keys(Model.associations);
  const result = [];

  if (typeof include === 'string') {
    include = [include];
  }

  include.forEach(association => {
    if (!associations.includes(association)) {
      throw errors.NOT_FOUND(`Association with alias '${association}' does not exist on '${Model.name}'`);
    }
    if (Model.associations[association].associationType === 'BelongsTo') {
      result.push({
        model: models[association],
        attributes: { exclude: ['password'] }
      });
    }
    if (Model.associations[association].associationType === 'HasMany') {
      const tableName = Model.associations[association].options.name.singular;
      result.push({
        model: models[tableName],
        attributes: { exclude: ['password'] }
      });
    }
    if (Model.associations[association].associationType === 'BelongsToMany') {
      const joinTable = Model.associations[association].options.through.model.name;
      const tableName = Model.associations[association].options.name.singular;
      result.push({
        through: { model: models[joinTable] },
        model: models[tableName]
      });
    }
  });
  return result;
};
