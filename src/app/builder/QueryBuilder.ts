/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj: Record<string, any> = { ...this.query };

    const excludesFields = ['searchTerm', 'sort', 'minPrice', 'maxPrice'];
    excludesFields.forEach((el) => delete queryObj[el]);

    if (this.query.minPrice || this.query.maxPrice) {
      queryObj.price = {};
      if (this.query.minPrice)
        queryObj.price.$gte = Number(this.query.minPrice);
      if (this.query.maxPrice)
        queryObj.price.$lte = Number(this.query.maxPrice);
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }
}

export default QueryBuilder;
