import React, { useImperativeHandle, useCallback } from 'react';
import { ParamEditorProps, ParamEditorRef, Model, ParamValue } from '../../../features/editParams/lib/types';
import { useParamEditor } from '../lib/useParamEditor/useParmEditor';
import { ParamInput } from './ParamInput';

export const ParamEditor = React.forwardRef<ParamEditorRef, ParamEditorProps>(
    ({ params, model, onChange }, ref) => {
        const {
            paramValues,
            handleParamChange,
            getParamValue,
        } = useParamEditor(model, onChange);

        const getModel = useCallback((): Model => {
            const paramValuesArray: ParamValue[] = Array.from(paramValues.entries()).map(
                ([paramId, value]) => ({ paramId, value })
            );
            return { paramValues: paramValuesArray };
        }, [paramValues]);

        useImperativeHandle(ref, () => ({
            getModel,
        }), [getModel]);

        return (
            <div data-testid="param-editor" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0 }}>Parameter Editor</h2>
                    <div style={{ background: '#f0f0f0', padding: '4px 12px', borderRadius: '12px', fontSize: '14px' }}>
                        Parameters: {params.length}
                    </div>
                </div>

                <div>
                    {params.map((param) => (
                        <ParamInput
                            key={param.id}
                            param={param}
                            value={getParamValue(param.id)}
                            onChange={(value) => handleParamChange(param.id, value)}
                        />
                    ))}
                </div>
            </div>
        );
    }
);

ParamEditor.displayName = 'ParamEditor';