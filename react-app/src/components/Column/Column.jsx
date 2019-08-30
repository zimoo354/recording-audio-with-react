import React from 'react';

const Column = (props) => (
    <div className={`cols-${ (props.cols) ? props.cols : 12 } ${ (props.className) ? props.className : '' }  ${ (props.center) ? 'text-center' : '' }`}>
        {props.children}
    </div>
);

export default Column;