const { paginationValues } = require('./constant-values');

module.exports.getPagination = (page, size) => {
  const limit = size ? Number(size) : paginationValues.DEFAULT_LIMIT;
  const offset = page ? page * limit : paginationValues.DEFAULT_OFFSET;

  return { limit, offset };
};

module.exports.getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: modelRows } = data;
  const currentPage = page ? Number(page) : paginationValues.DEFAULT_PAGE;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, modelRows, totalPages, currentPage };
};
