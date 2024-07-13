"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludesFields = ['searchTerm', 'sort', 'minPrice', 'maxPrice'];
        excludesFields.forEach((el) => delete queryObj[el]);
        if (this.query.minPrice || this.query.maxPrice) {
            queryObj.price = {};
            if (this.query.minPrice)
                queryObj.price.$gte = Number(this.query.minPrice);
            if (this.query.maxPrice)
                queryObj.price.$lte = Number(this.query.maxPrice);
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
}
exports.default = QueryBuilder;
