import { AuthorEntity } from './entity/AuthorEntity';
import { CategoryEntity } from './entity/CategoryEntity';
import { QuoteEntity } from './entity/QuoteEntity';
export type * from './DictumTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { DictumEntityBase } from './DictumEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class DictumSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Author(entopts?: Record<string, any>): AuthorEntity;
    Category(entopts?: Record<string, any>): CategoryEntity;
    Quote(entopts?: Record<string, any>): QuoteEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): DictumSDK;
    tester(testopts?: any, sdkopts?: any): DictumSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof DictumSDK;
export { stdutil, config, BaseFeature, DictumEntityBase, DictumSDK, SDK, };
