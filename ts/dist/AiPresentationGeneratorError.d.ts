import { Context } from './Context';
declare class AiPresentationGeneratorError extends Error {
    isAiPresentationGeneratorError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { AiPresentationGeneratorError };
