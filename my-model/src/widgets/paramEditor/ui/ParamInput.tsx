import React, { ChangeEvent } from 'react';
import { ParamInputProps } from '../../../features/editParams/lib/types';

export const ParamInput: React.FC<ParamInputProps> = ({ param, value, onChange }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    const renderInput = () => {
        switch (param.type) {
            case 'string':
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        data-testid={`param-input-${param.id}`}
                        placeholder={`Enter ${param.name}`}
                    />
                );

            case 'number':
                return (
                    <input
                        type="number"
                        value={value}
                        onChange={handleChange}
                        data-testid={`param-input-${param.id}`}
                        placeholder={`Enter ${param.name}`}
                    />
                );

            case 'text':
                return (
                    <textarea
                        value={value}
                        onChange={handleChange}
                        data-testid={`param-textarea-${param.id}`}
                        placeholder={`Enter ${param.name}`}
                        rows={3}
                    />
                );

            case 'select':
                return (
                    <select
                        value={value}
                        onChange={handleChange}
                        data-testid={`param-select-${param.id}`}
                    >
                        <option value="">Select value...</option>
                        {param.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            default:
                const exhaustiveCheck: never = param.type;
                throw new Error(`Unsupported param type: ${exhaustiveCheck}`);
        }
    };

    return (
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                {param.name}
                <span style={{ marginLeft: '8px', color: '#666', fontSize: '12px' }}>
          ({param.type})
        </span>
            </label>
            <div style={{ width: '100%' }}>
                {renderInput()}
            </div>
        </div>
    );
};