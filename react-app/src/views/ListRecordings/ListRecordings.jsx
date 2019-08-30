import React from 'react';
import Row from '../../components/Row';
import Column from '../../components/Column';
import Table from '../../components/Table';
import Button from '../../components/Button';

class ListRecordings extends React.Component {
    componentDidMount() {
        this.props.readData();
    }

    columns = [
        {
            title: 'Nombre',
            selector: 'name',
        },
        {
            title: 'Reproducir',
            selector: 'audio',
            func: base64 => this.props.playRecording(base64),
        },
        {
            title: 'Editar',
            selector: 'edit',
            func: recording => this.props.editRecording(recording),
        },
        {
            title: 'Eliminar',
            selector: 'delete',
            func: recording => this.props.deleteRecording(recording),
        },
        {
            title: 'Fecha de Creación',
            selector: 'created_at',
        },        
    ];

    render() {
        return (
            <>
                <Row>
                    <Column cols={4}>
                        <h1>Recordings</h1>
                    </Column>
                    <Column className='text-right' cols={8}>
                        <Button onClick={this.props.newRecording}>Nuevo</Button>
                    </Column>          
                </Row>
                <Row>
                    <Column>
                        {
                            this.props.data
                            && (
                                <Table
                                    columns={this.columns}
                                    data={this.props.data}
                                />
                            )
                        }
                    </Column>
                </Row>
            </>
        );
    }
};

export default ListRecordings;