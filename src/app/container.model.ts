import { ComponentModel } from './component.model';

export interface ContainerModel {
    containerName: string;
    components: Array<ComponentModel>;
}
