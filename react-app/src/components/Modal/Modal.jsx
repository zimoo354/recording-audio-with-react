import React from 'react';

const Modal = (props) => (
    <>
        <div className={ `modal ${ (props.className) ? props.className : '' } ${ (props.open) ? 'open' : '' }` }>
            <div className="content">
                <div className="close-btn" onClick={ props.toggleModal }>x</div>
                {props.children}
            </div>
        </div>
        <div className={`overlay ${ (props.open) ? 'open' : '' }`} onClick={props.toggleModal}></div>
    </>
);

export default Modal
