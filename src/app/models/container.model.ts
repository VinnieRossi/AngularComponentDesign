import { ComponentModel } from './component.model';

export interface ContainerModel {
    id: string;
    name: string;
    components: Array<ComponentModel>;
}
