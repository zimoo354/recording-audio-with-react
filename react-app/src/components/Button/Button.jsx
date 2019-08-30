import React from 'react';

const AudioRecorder = React.forwardRef((props, ref) => 
    <button ref={ref} {...(props.secondary && {className: 'secondary'})} {...props}>{props.children}</button>
);

export default AudioRecorder;