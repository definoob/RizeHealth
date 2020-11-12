import React, { useState, useEffect } from "react";

function RadioButton(props) {
  const [selected, setSelected] = useState(props.resp === undefined ? -1 : props.resp[0].answer_id - 1);
  useEffect(() => {
    if (selected !== -1) props.onChange({ selectedOption: selected + 1 }, props.id, props.qID, props.qType, true);
    // eslint-disable-next-line
  }, []);
  const onClick = event => {
    setSelected(parseInt(event.target.id));
    props.onChange({ selectedOption: event.target.value }, props.id, props.qID, props.qType, false);
  };
  return (
    <div style={{ marginBottom: " 15px" }}>
      <h4 className='step-title'>{props.title}</h4>
      <div className='check-item-details'>
        <div className='gray-box'>
          <ul className='radio-list'>
            {props.options.map((option, i) => (
              <li key={option.text}>
                <label className='radio-item'>
                  <input type='radio' id={option.order} name={props.title} value={option.answer_id} checked={selected === parseInt(option.order)} onClick={e => onClick(e)} onChange={() => {}} />
                  <span className='radio_check' />
                  {option.text}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RadioButton;
