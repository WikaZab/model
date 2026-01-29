import React, { useRef } from 'react';
import { ParamConfig, Model, ParamEditorRef } from '../features/editParams/lib/types';
import {ParamEditor} from "../widgets/paramEditor";

const params: ParamConfig[] = [
    { id: 1, name: 'Purpose', type: 'string' },
    { id: 2, name: 'Length', type: 'number' },
    { id: 3, name: 'Color', type: 'select', options: [
            { value: 'red', label: 'Red' },
            { value: 'blue', label: 'Blue' },
            { value: 'green', label: 'Green' },
        ]},
    { id: 4, name: 'Description', type: 'text' },
];

const initialModel: Model = {
    paramValues: [
        { paramId: 1, value: 'Casual' },
        { paramId: 2, value: '50' },
        { paramId: 3, value: 'blue' },
        { paramId: 4, value: 'Some description' },
    ]
};

export const App: React.FC = () => {
    const [model, setModel] = React.useState<Model>(initialModel);
    const editorRef = useRef<ParamEditorRef>(null);

    const handleGetModel = () => {
        if (editorRef.current) {
            const currentModel = editorRef.current.getModel();
            console.log('Current Model:', currentModel);
            alert(JSON.stringify(currentModel, null, 2));
        }
    };

    const handleReset = () => {
        setModel(initialModel);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Parameter Editor</h1>

            <ParamEditor
                ref={editorRef}
                params={params}
                model={model}
                onChange={setModel}
            />

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button
                    onClick={handleGetModel}
                    style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Get Model
                </button>
                <button
                    onClick={handleReset}
                    style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Reset
                </button>
            </div>

            <div style={{ marginTop: '30px' }}>
                <h3>Current Model:</h3>
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