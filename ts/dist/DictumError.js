"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DictumError = void 0;
class DictumError extends Error {
    isDictumError = true;
    sdk = 'Dictum';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.DictumError = DictumError;
//# sourceMappingURL=DictumError.js.map