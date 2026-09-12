import { DictumEntityBase } from '../DictumEntityBase';
import type { DictumSDK } from '../DictumSDK';
import type { Control } from '../types';
import type { Category, CategoryListMatch } from '../DictumTypes';
declare class CategoryEntity extends DictumEntityBase<Category> {
    constructor(client: DictumSDK, entopts: any);
    make(this: CategoryEntity): CategoryEntity;
    list(this: any, reqmatch?: CategoryListMatch, ctrl?: Control): Promise<CategoryEntity[]>;
}
export { CategoryEntity };
