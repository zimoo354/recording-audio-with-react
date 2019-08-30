import React, { useEffect, useState } from 'react';
import Row from '../../components/Row';
import Column from '../../components/Column';
import Button from '../../components/Button';
import { API_URL } from '../../config';
import AudioRecorder from '../../components/AudioRecorder';


const initialState = {
    id: null,
    name: '',
    route: '',
    audio: '',
};
  
class FormRecordings extends React.Component {
    state = {
        ...initialState,
    };

    componentWillMount() {
        const {
            id,
            name,
            audio,
        } = this.props.data;
        this.setState({
            id,
            name,
            audio,
        });
    }

    handleChange = event => {
        this.setState( {[event.target.id]: event.target.value} );  
    }    

    save = () => {
        let headers = {};
        if (this.state.id) {
            headers = {method: 'PUT', body: JSON.stringify(this.state)};
        } else {
            headers = {method: 'POST', body: JSON.stringify(this.state)};
        };
        
        fetch(API_URL, headers)
            .then(r => r.json())
            .then(() => this.props.readData())
            .then(() => this.cancel());
    }
    cancel = () => {
        this.props.toggleModal();
        this.setState({...initialState, ...this.state.data});
    }
    
    setAudio = (base64) => this.setState({audio: base64, ...this.state.data});
    
    render() {
        return (
            <Row>
                <Column>Nombre:</Column>
                <Column><input type="text" id="name" value={this.state.name} onChange={this.handleChange}/></Column>
                <Column>Grabadora:</Column>
                <Column>
                    <AudioRecorder
                        audio={(this.state.id) ? this.state.audio : null}
                        setAudio={this.setAudio}
                    />
                </Column>
                <Column cols={6} className='text-right'><Button onClick={ this.save }>Guardar</Button></Column>
                <Column cols={6} className='text-left'><Button onClick={ this.cancel } secondary>Cancelar</Button></Column>
            </Row>
        )
    };
};

export default FormRecordings;
