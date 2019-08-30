import React, { Component } from 'react';
import Modal from './components/Modal';
import ListRecordings from './views/ListRecordings';
import FormRecordings from './views/FormRecordings';
import './App.css';
import { API_URL } from './config';

class App extends Component {
	state = {
		isModalOpen: false,
		data: [],
	};
	
	toggleModal = () => this.setState({isModalOpen: !this.state.isModalOpen});
	playRecording = b64 => {
		const audio = new Audio(`data:audio/ogg;base64,${b64}`);
		audio.play();
	}
	newRecording = () => {
		this.toggleModal();
		this.setState({id: null, name: '', route: '',});
	};  
	editRecording = row => {
		this.toggleModal();
		this.setState({id: row.id, name: row.name, route: row.route,});
	};
	deleteRecording = row => {
		if(window.confirm(`Estás seguro de que deseas eliminar el registro ${row.name}?`)) {
			fetch(API_URL, {method: "DELETE", body: JSON.stringify({id: row.id})})
			.then(r => r.json())
			.then(() => this.readData());
		};
	}
	readData = () => {
        fetch(API_URL)
            .then(r => r.json())
            .then(data => { this.setState({data: data.result,})});
    }
	render() {
		return (
			<div className="App">
			{
			this.state.data &&
			<ListRecordings
				playRecording={this.playRecording}
				newRecording={this.newRecording}
				editRecording={this.editRecording}
				deleteRecording={this.deleteRecording}
				readData={this.readData}
				data={this.state.data}
			/>	
			}
			<Modal open={this.state.isModalOpen} toggleModal={this.toggleModal}>
				{
					this.state.isModalOpen
					&& (
						<FormRecordings
							data={this.state}
							readData={this.readData}
							toggleModal={this.toggleModal}
						/>
					)
				}
			</Modal>
			</div>
		);
	}
}
	
export default App;
