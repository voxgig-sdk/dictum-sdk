import { Context } from './Context';
declare class DictumError extends Error {
    isDictumError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { DictumError };
