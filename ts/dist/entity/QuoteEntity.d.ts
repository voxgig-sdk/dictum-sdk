import { DictumEntityBase } from '../DictumEntityBase';
import type { DictumSDK } from '../DictumSDK';
import type { Control } from '../types';
import type { Quote, QuoteLoadMatch, QuoteListMatch } from '../DictumTypes';
declare class QuoteEntity extends DictumEntityBase<Quote> {
    constructor(client: DictumSDK, entopts: any);
    make(this: QuoteEntity): QuoteEntity;
    load(this: any, reqmatch?: QuoteLoadMatch, ctrl?: Control): Promise<QuoteEntity>;
    list(this: any, reqmatch?: QuoteListMatch, ctrl?: Control): Promise<QuoteEntity[]>;
}
export { QuoteEntity };
