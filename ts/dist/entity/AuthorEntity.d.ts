import { DictumEntityBase } from '../DictumEntityBase';
import type { DictumSDK } from '../DictumSDK';
import type { Control } from '../types';
import type { Author, AuthorListMatch } from '../DictumTypes';
declare class AuthorEntity extends DictumEntityBase<Author> {
    constructor(client: DictumSDK, entopts: any);
    make(this: AuthorEntity): AuthorEntity;
    list(this: any, reqmatch?: AuthorListMatch, ctrl?: Control): Promise<AuthorEntity[]>;
}
export { AuthorEntity };
