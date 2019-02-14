import { CustomTemplateDescriptor } from './custom-template.descriptor';

export interface CustomTemplateFactory {
    produce: (options?: any) => CustomTemplateDescriptor;
}
