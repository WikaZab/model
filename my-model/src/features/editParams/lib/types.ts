export interface Param {
    id: number;
    name: string;
    type: 'string' | 'number' | 'select' | 'text';
}

export interface ParamValue {
    paramId: number;
    value: string;
}

export interface Model {
    paramValues: ParamValue[];
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface ParamConfig extends Param {
    options?: SelectOption[];
}

export interface ParamEditorProps {
    params: ParamConfig[];
    model: Model;
    onChange: (model: Model) => void;
}

export interface ParamInputProps {
    param: ParamConfig;
    value: string;
    onChange: (value: string) => void;
}

export interface ParamEditorRef {
    getModel: () => Model;
}