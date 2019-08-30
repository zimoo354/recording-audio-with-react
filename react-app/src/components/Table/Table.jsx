import React from 'react';
import Button from '../Button';

const Table = (props) => {
    
    const renderCell = cell => props.columns.map((col, index) => {
        switch (col.selector) {
            case 'audio':
                return <td key={index} className="text-center"><Button onClick={() => col.func(cell.audio)}>Reproducir</Button></td>;
            case 'edit':
                return <td key={index} className="text-center"><Button onClick={() => col.func(cell)}>Editar</Button></td>;
            case 'delete':
                return <td key={index} className="text-center"><Button onClick={() => col.func(cell)}>Eliminar</Button></td>;
        
            default:
                return <td key={index}>{cell[col.selector]}</td>;
        }
    });

    return (
        <table>
            <thead>
                <tr>
                    {
                        props.columns.map(col => <th key={col.selector}>{col.title}</th>)
                    }
                </tr>            
            </thead>
            <tbody>
                {
                    props.data.map((row, index) => 
                        (
                        <tr key={index}>
                            {renderCell(row)}
                        </tr>
                        )
                    )
                }
            </tbody>
        </table>
    )
};

export default Table;
