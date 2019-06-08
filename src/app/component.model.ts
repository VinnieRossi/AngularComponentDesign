export interface ComponentModel {
    componentName: string; // Name of component in pascal case, eg. "HelloWorld"
    inputProperties: Array<PropertyModel>; // List of input properties the component will possess
    eventEmitters: Array<EventEmitterModel>; // List of event emitters the component will possess
}

export interface PropertyModel {
    propertyName: string; // Name of input property in camel case, eg. "isVisible"
    propertyType: SupportedTypescriptTypes; // Type of property as defined by Typescript, eg. "number"
}

export interface EventEmitterModel {
    emitterName: string; // Name of emitter in camel case, eg. "saveWasClicked"
    emitterPropertyType: SupportedTypescriptTypes; // Emitted value type as defined by Typescript, eg. "number"
}

// TODO: Support types better than this
export enum SupportedTypescriptTypes {
    Number = 'number',
    NumberArray = 'number[]',
    String = 'string',
    StringArray = 'string[]',
    Boolean = 'boolean',
    BooleanArray = 'boolean[]',
    Any = 'any',
    AnyArray = 'any[]'
}