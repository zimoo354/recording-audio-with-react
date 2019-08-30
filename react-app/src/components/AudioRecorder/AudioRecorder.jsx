import React from 'react';
import Column from '../Column';
import Row from '../Row';
import Button from '../Button';

import Record from './record.png';
import Play from './play.png';
import Stop from './stop.png';

class AudioRecorder extends React.Component {
    recordButton;
    stopButton;
    playButton;
    
    recorder;
    audio;

    componentDidMount() {
        this.recordButton = document.querySelector('#record');
        this.stopButton = document.querySelector('#stop');
        this.playButton = document.querySelector('#play');

        const recordAudio = () =>
            new Promise(async resolve => {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream);
                let audioChunks = [];
                
                mediaRecorder.addEventListener('dataavailable', event => {
                    audioChunks.push(event.data);
                });
                
                const start = () => {
                    audioChunks = [];
                    mediaRecorder.start();
                };
                
                const stop = () =>
                new Promise(resolve => {
                    mediaRecorder.addEventListener('stop', () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        const play = () => audio.play();
                        resolve({ audioChunks, audioBlob, audioUrl, play });
                    });
                    
                    mediaRecorder.stop();
                });
                
                resolve({ start, stop });
            }
        );
        
        // const sleep = time => new Promise(resolve => setTimeout(resolve, time));

        this.recordButton.addEventListener('click', async () => {
            this.recordButton.setAttribute('disabled', true);
            this.stopButton.removeAttribute('disabled');
            this.playButton.setAttribute('disabled', true);
            if (!this.recorder) {
              this.recorder = await recordAudio();
            }
            this.recorder.start();
        });
    
        this.stopButton.addEventListener('click', async () => {
            this.recordButton.removeAttribute('disabled');
            this.stopButton.setAttribute('disabled', true);
            this.playButton.removeAttribute('disabled');
            
            this.audio = await this.recorder.stop();


            const reader = new FileReader();
            reader.readAsDataURL(this.audio.audioBlob);
            reader.onload = () => {
                const base64AudioMessage = reader.result.split(',')[1];
                this.props.setAudio(base64AudioMessage);
            };
        });
    
        this.playButton.addEventListener('click', () => {
            this.audio.play();
        });
    
    }

    render() {
        return (
        <Row>
            <Column cols={4} center>
                <Button id="record"><img src={Record} alt='Record' height='12' /></Button>
            </Column>
            <Column cols={4} center>                
                <Button id="stop" disabled><img src={Stop} alt='Stop' height='12' /></Button>
            </Column>
            <Column cols={4} center>
                <Button id="play" disabled><img src={Play} alt='Play' height='12' /></Button>
            </Column>            
        </Row>
        )
    }
};
    
export default AudioRecorder;