const path = require("path");
const root = path.dirname(require.main.filename);

const errorWrapper = require(root + "/helpers/error/errorWrapper");

const {
    
    searchHelper,
    populateHelper,
    categorySortHelper,
    paginationHelper

} = require("./queryMiddlewareHelpers");

const categoryQueryMiddleware = function(model,options){
    return errorWrapper(async function(req,res,next) {
        // Initial Query
        let query = model.find({});

        // Search Parameter
        query = searchHelper("title",query,req);
        
        // Populate If Available
        
        if (options && options.population) {
            query = populateHelper(query,options.population);
        }

        // Sort Category

        query = categorySortHelper(query,req);

        // let pagination;

        // // Paginate Category

        // const paginationResult = await paginationHelper(model,query,req);

        // query = paginationResult.query;

        // pagination = paginationResult.pagination;
        
        const advanceQueryResults = await query;
        // console.log(pagination);
        
        res.advanceQueryResults = {
            success : true,
            count : advanceQueryResults.length,
            // pagination : pagination,
            data : advanceQueryResults
        };
        next();
    })
}; 

module.exports = categoryQueryMiddleware;
