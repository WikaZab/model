import { useState, useCallback } from 'react';
import { Model, ParamValue } from '../lib/types';

export const useParamModel = (initialModel: Model) => {
    const [model, setModel] = useState<Model>(initialModel);

    const updateParamValue = useCallback((paramId: number, value: string) => {
        setModel(prev => {
            const existingIndex = prev.paramValues.findIndex(pv => pv.paramId === paramId);
            const newParamValues = [...prev.paramValues];

            if (existingIndex >= 0) {
                newParamValues[existingIndex] = { paramId, value };
            } else {
                newParamValues.push({ paramId, value });
            }

            return { paramValues: newParamValues };
        });
    }, []);

    const getParamValue = useCallback((paramId: number): string => {
        const paramValue = model.paramValues.find(pv => pv.paramId === paramId);
        return paramValue ? paramValue.value : '';
    }, [model]);

    const resetModel = useCallback(() => {
        setModel(initialModel);
    }, [initialModel]);

    return {
        model,
        updateParamValue,
        getParamValue,
        resetModel,
        setModel,
    };
};