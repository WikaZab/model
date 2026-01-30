import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ParamEditor } from './ParamEditor';
import { ParamConfig, Model } from '../../../features/editParams/lib/types';

describe('ParamEditor', () => {
    // Тестовые данные
    const params: ParamConfig[] = [
        { id: 1, name: 'Название', type: 'string' },
        { id: 2, name: 'Описание', type: 'text' },
    ];

    const initialModel: Model = {
        paramValues: [
            { paramId: 1, value: 'Статья' },
            { paramId: 2, value: 'Описание статьи' },
        ],
    };

    const mockOnChange = jest.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    // Тест 1: Отображение полей по params
    test('отображает поля для всех параметров из props.params', () => {
        render(
            <ParamEditor
                params={params}
                model={initialModel}
                onChange={mockOnChange}
            />
        );

        // Проверяем наличие текста меток
        expect(screen.getByText('Название:')).toBeInTheDocument();
        expect(screen.getByText('Описание:')).toBeInTheDocument();

        // Проверяем наличие полей ввода
        expect(screen.getByDisplayValue('Статья')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Описание статьи')).toBeInTheDocument();

        // Проверяем типы полей
        const nameInput = screen.getByDisplayValue('Статья');
        const descriptionInput = screen.getByDisplayValue('Описание статьи');

        expect(nameInput).toHaveAttribute('type', 'text');
        expect(descriptionInput.tagName).toBe('TEXTAREA');
    });

    // Тест 2: Инициализация значений из model.paramValues
    test('корректно инициализирует значения из model.paramValues', () => {
        render(
            <ParamEditor
                params={params}
                model={initialModel}
                onChange={mockOnChange}
            />
        );

        // Находим поля по их значениям
        const nameInput = screen.getByDisplayValue('Статья') as HTMLInputElement;
        const descriptionTextarea = screen.getByDisplayValue('Описание статьи') as HTMLTextAreaElement;

        expect(nameInput.value).toBe('Статья');
        expect(descriptionTextarea.value).toBe('Описание статьи');
    });

    // Тест 3: Корректный результат getModel() после изменений
    test('вызывает onChange с корректной моделью после изменения полей', () => {
        const { rerender } = render(
            <ParamEditor
                params={params}
                model={initialModel}
                onChange={mockOnChange}
            />
        );

        // Первое изменение
        const nameInput = screen.getByDisplayValue('Статья');
        fireEvent.change(nameInput, { target: { value: 'Новая статья' } });

        // Проверяем первый вызов onChange
        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenLastCalledWith({
            paramValues: [
                { paramId: 1, value: 'Новая статья' },
                { paramId: 2, value: 'Описание статьи' },
            ],
        });

        // Создаем обновленную модель на основе первого вызова onChange
        const updatedModelAfterFirstChange: Model = {
            paramValues: [
                { paramId: 1, value: 'Новая статья' },
                { paramId: 2, value: 'Описание статьи' },
            ],
        };

        // Рендерим компонент с обновленной моделью
        rerender(
            <ParamEditor
                params={params}
                model={updatedModelAfterFirstChange}
                onChange={mockOnChange}
            />
        );

        // Второе изменение
        const descriptionTextarea = screen.getByDisplayValue('Описание статьи');
        fireEvent.change(descriptionTextarea, { target: { value: 'Новое описание' } });

        // Проверяем второй вызов onChange
        expect(mockOnChange).toHaveBeenCalledTimes(2);
        expect(mockOnChange).toHaveBeenLastCalledWith({
            paramValues: [
                { paramId: 1, value: 'Новая статья' },
                { paramId: 2, value: 'Новое описание' },
            ],
        });
    });
});