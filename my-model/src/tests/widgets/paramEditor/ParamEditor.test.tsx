import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ParamEditor } from '../../../widgets/paramEditor/ui/ParamEditor';
import { ParamConfig, Model } from '../../../features/editParams/lib/types';

const mockParams: ParamConfig[] = [
    { id: 1, name: 'Purpose', type: 'string' },
    { id: 2, name: 'Length', type: 'number' },
    { id: 3, name: 'Color', type: 'select', options: [
            { value: 'red', label: 'Red' },
            { value: 'blue', label: 'Blue' },
        ]},
];

const mockModel: Model = {
    paramValues: [
        { paramId: 1, value: 'Test Value' },
        { paramId: 2, value: '100' },
        { paramId: 3, value: 'red' },
    ]
};

describe('ParamEditor', () => {
    test('1. displays all params from props', () => {
        render(<ParamEditor params={mockParams} model={mockModel} onChange={() => {}} />);

        expect(screen.getByText('Purpose')).toBeInTheDocument();
        expect(screen.getByText('Length')).toBeInTheDocument();
        expect(screen.getByText('Color')).toBeInTheDocument();
    });

    test('2. initializes values from model.paramValues', () => {
        render(<ParamEditor params={mockParams} model={mockModel} onChange={() => {}} />);

        const input1 = screen.getByTestId('param-input-1') as HTMLInputElement;
        const input2 = screen.getByTestId('param-input-2') as HTMLInputElement;
        const select3 = screen.getByTestId('param-select-3') as HTMLSelectElement;

        expect(input1.value).toBe('Test Value');
        expect(input2.value).toBe('100');
        expect(select3.value).toBe('red');
    });

    test('3. calls onChange when values change', () => {
        const handleChange = jest.fn();
        render(<ParamEditor params={mockParams} model={mockModel} onChange={handleChange} />);

        const input1 = screen.getByTestId('param-input-1');
        fireEvent.change(input1, { target: { value: 'New Value' } });

        expect(handleChange).toHaveBeenCalled();
    });
});

// Делаем файл модулем
export {};