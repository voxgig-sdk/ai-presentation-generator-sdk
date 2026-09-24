"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiPresentationGeneratorError = void 0;
class AiPresentationGeneratorError extends Error {
    isAiPresentationGeneratorError = true;
    sdk = 'AiPresentationGenerator';
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
exports.AiPresentationGeneratorError = AiPresentationGeneratorError;
//# sourceMappingURL=AiPresentationGeneratorError.js.map