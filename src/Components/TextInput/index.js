import React, { useState } from 'react';

function TextInput (props) {
	const [ text, setText ] = useState('');
	const onTextChange = (event) => {
		setText(event.target.value);
		props.onChange({ text: event.target.value }, props.id, props.qID, props.qType);
	};
	return (
		<div>
			<h4 className='step-title'>{props.title}</h4>
			<textarea className='form-control' rows='5' value={text} onChange={(e) => onTextChange(e)} />
		</div>
	);
}

export default TextInput;
