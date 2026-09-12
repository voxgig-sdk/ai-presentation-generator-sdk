import { AiPresentationGeneratorEntityBase } from '../AiPresentationGeneratorEntityBase';
import type { AiPresentationGeneratorSDK } from '../AiPresentationGeneratorSDK';
import type { Control } from '../types';
import type { Presentation, PresentationLoadMatch, PresentationCreateData } from '../AiPresentationGeneratorTypes';
declare class PresentationEntity extends AiPresentationGeneratorEntityBase<Presentation> {
    constructor(client: AiPresentationGeneratorSDK, entopts: any);
    make(this: PresentationEntity): PresentationEntity;
    load(this: any, reqmatch?: PresentationLoadMatch, ctrl?: Control): Promise<PresentationEntity>;
    create(this: any, reqdata?: PresentationCreateData, ctrl?: Control): Promise<PresentationEntity>;
}
export { PresentationEntity };
