import React, {useRef, useState} from 'react';
import { ParamConfig, Model, ParamEditorRef } from '../features/editParams/lib/types';
import {ParamEditor} from "../widgets/paramEditor";
import {Button} from "../shared/ui/Button/Button";

const params: ParamConfig[] = [
    { id: 1, name: 'Название', type: 'string' },
    { id: 2, name: 'Описание', type: 'text' },
];

const initialModel: Model = {
    paramValues: [
        { paramId: 1, value: 'Статья' },
        { paramId: 2, value: 'Описание статьи' },
    ]
};

export const App: React.FC = () => {
    const [model, setModel] = useState<Model>(initialModel);

    const handleGetModel = () => {
        console.log('Текущая модель:', model);
        alert(JSON.stringify(model, null, 2));
    };

    const handleReset = () => {
        setModel(initialModel);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Создание модели</h1>

            <ParamEditor
                params={params}
                model={model}
                onChange={setModel}
            />

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <Button
                    onClick={handleGetModel}
                    style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Получить модель
                </Button>
                <Button
                    onClick={handleReset}
                    style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Сбросить изменения
                </Button>
            </div>

            <div style={{ marginTop: '30px' }}>
                <h3>Текущая модель:</h3>
                <pre style={{
                    background: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '4px',
                    overflow: 'auto',
                    border: '1px solid #dee2e6'
                }}>
                    {JSON.stringify(model, null, 2)}
                </pre>
            </div>
        </div>
    );
};