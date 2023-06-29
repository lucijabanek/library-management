const { callbackErrorHandler } = require('../middleware/error-handlers');
const { errors } = require('../utils/errors');
const responseMessage = require('../utils/constant-messages');
const { getPagination, getPagingData } = require('../utils/pagination');

const { checkModelAssociations } = require('./helpers/model-associations');

module.exports.generalControllers = (Model) => ({

  create: callbackErrorHandler(async function (req, res) {
    const instanceData = req.body;

    await Model.create(instanceData);

    return res.status(201).json({
      message: responseMessage.createSuccess(Model.name)
    });
  }),

  getAll: callbackErrorHandler(async function (req, res) {
    const { include, page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const options = {
      order: [['id', 'ASC']],
      limit,
      offset,
      include: [],
      attributes: { exclude: ['password'] }
    };

    if (include) {
      const includeOptions = checkModelAssociations(Model, include);
      options.include = includeOptions;
    }

    let allInstances = await Model.findAndCountAll(options);

    allInstances = getPagingData(allInstances, page, limit);

    return res.status(200).json({
      data: allInstances
    });
  }),

  getById: callbackErrorHandler(async function (req, res) {
    const { id } = req.params;
    const { include } = req.query;

    const options = {
      attributes: { exclude: ['password'] },
      include: []
    };

    if (include) {
      const includeOptions = checkModelAssociations(Model, include);
      options.include = includeOptions;
    }

    const singleInstance = await Model.findByPk(id, options);

    if (!singleInstance) {
      throw errors.NOT_FOUND(responseMessage.notFound(Model.name));
    }

    return res.status(200).json({
      data: singleInstance
    });
  }),

  update: callbackErrorHandler(async function (req, res) {
    const { id } = req.params;

    const [updatedRows, updatedInstance] = await Model.update(req.body, {
      where: { id },
      returning: true
    });

    if (!updatedRows) {
      throw errors.NOT_FOUND(responseMessage.notFound(Model.name));
    }

    return res.status(200).json({
      message: responseMessage.updateSuccess(Model.name),
      data: updatedInstance
    });
  }),

  hardDelete: callbackErrorHandler(async function (req, res) {
    const { id } = req.params;

    const deletedRows = await Model.destroy({
      where: { id }
    });

    if (!deletedRows) {
      throw errors.NOT_FOUND(responseMessage.notFound(Model.name));
    }

    return res.status(200).json({
      message: responseMessage.deleteSuccess(Model.name)
    });
  }),

  delete: callbackErrorHandler(async function (req, res) {
    const { id } = req.params;

    const [updatedRows, _updatedInstance] = await Model.update({ isActive: false }, {
      where: { id },
      returning: true
    });

    if (!updatedRows) {
      throw errors.NOT_FOUND(responseMessage.notFound(Model.name));
    }

    return res.status(200).json({
      message: responseMessage.deleteSuccess(Model.name)
    });
  }),

  filterByName: callbackErrorHandler(async function (req, res) {
    const model = (Model.name).toLowerCase();
    let queryString = `SELECT * FROM ${model}`;
    const name = req.query.name;
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const nameQueryParams = [];
    const options = {
      order: [['name', 'ASC']],
      limit,
      offset
    };

    if (!name) {
      let allInstances = await Model.findAndCountAll(options);

      allInstances = getPagingData(allInstances, page, limit);

      return res.status(200).json({
        data: allInstances
      });
    }

    if (name.length < 3) {
      return res.status(200).json({
        data: []
      });
    }

    queryString += ' WHERE name ILIKE ?';
    nameQueryParams.push(`%${name}%`);

    const filteredData = await Model.sequelize.query(queryString, {
      model: Model,
      mapToModel: true,
      replacements: nameQueryParams
    });

    return res.status(200).json({
      data: filteredData
    });
  })
});
