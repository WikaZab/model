import React from 'react';
import { ParamEditorProps } from '../lib/types';

export const ParamEditor: React.FC<ParamEditorProps> = ({ params, model, onChange }) => {
    const handleChange = (paramId: number, value: string) => {
        const updatedValues = model.paramValues.map(item =>
            item.paramId === paramId ? { ...item, value } : item
        );

        onChange({ paramValues: updatedValues });
    };

    const getValue = (paramId: number) => {
        return model.paramValues.find(item => item.paramId === paramId)?.value || '';
    };

    return (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h2 style={{ marginTop: 0 }}>Редактор параметров</h2>

            {params.map((param) => {
                const value = getValue(param.id);
                const inputId = `param-${param.id}`;

                return (
                    <div key={param.id} style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor={inputId}
                            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
                        >
                            {param.name}:
                        </label>

                        {param.type === 'text' ? (
                            <textarea
                                id={inputId}
                                value={value}
                                onChange={(e) => handleChange(param.id, e.target.value)}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                rows={4}
                            />
                        ) : (
                            <input
                                id={inputId}
                                type="text"
                                value={value}
                                onChange={(e) => handleChange(param.id, e.target.value)}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};