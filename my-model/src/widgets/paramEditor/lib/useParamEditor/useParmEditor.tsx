import { useState, useCallback } from 'react';
import { Model } from '../../../../features/editParams/lib/types';

export const useParamEditor = (initialModel: Model, onChange?: (model: Model) => void) => {
    // Инициализируем состояние сразу из модели
    const [paramValues, setParamValues] = useState<Map<number, string>>(() => {
        const initialValues = new Map<number, string>();
        initialModel.paramValues.forEach((pv) => {
            initialValues.set(pv.paramId, pv.value);
        });
        return initialValues;
    });

    const handleParamChange = useCallback((paramId: number, value: string) => {
        setParamValues(prev => {
            const newValues = new Map(prev);
            newValues.set(paramId, value);

            // Уведомляем об изменении
            if (onChange) {
                const paramValuesArray = Array.from(newValues.entries()).map(
                    ([pid, val]) => ({ paramId: pid, value: val })
                );
                onChange({ paramValues: paramValuesArray });
            }

            return newValues;
        });
    }, [onChange]);

    const getParamValue = useCallback((paramId: number): string => {
        return paramValues.get(paramId) || '';
    }, [paramValues]);

    return {
        paramValues,
        handleParamChange,
        getParamValue,
    };
};