const path = require("path");
const root = path.dirname(require.main.filename);

const errorWrapper = require(root + "/helpers/error/errorWrapper");

const {
  searchHelper,
  populateHelper,
  episodeSortHelper,
  paginationHelper,
} = require("./queryMiddlewareHelpers");

const episodeQueryMiddleware = function (model, options) {
  return errorWrapper(async function (req, res, next) {

    console.log(req.params);
    // Initial Query
    let query = model.find({});

    // Search Parameter
    query = searchHelper("title", query, req);

    // Populate If Available

    if (options && options.population) {
      query = populateHelper(query, options.population);
    }

    // Sort Question

    query = episodeSortHelper(query, req);

    let pagination;

    // Paginate Question

    const paginationResult = await paginationHelper(model, query, req);

    query = paginationResult.query;

    pagination = paginationResult.pagination;

    const advanceQueryResults = await query;
    console.log(pagination);

    res.advanceQueryResults = {
      success: true,
      count: advanceQueryResults.length,
      pagination: pagination,
      data: advanceQueryResults,
    };
    next();
  });
};

module.exports = episodeQueryMiddleware;
