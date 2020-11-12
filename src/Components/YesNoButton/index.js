import React, { useState, useEffect } from "react";

function YesNoButton(props) {
  const [selected, setSelected] = useState(props.resp === undefined ? "" : props.resp[0].answer_id);
  const [moreInfo, setMoreInfo] = useState(props.resp === undefined ? "" : props.resp[0].text_answer === null ? "" : props.resp[0].text_answer);
  useEffect(() => {
    if (props.resp !== undefined) {
      props.onChange({ selected, moreInfo }, props.id, props.qID, props.qType, true);
    }
    // eslint-disable-next-line
  }, []);
  const onClick = event => {
    let temp = parseInt(event.target.id);
    setSelected(temp);
    let flag;
    if (temp === 1) flag = false;
    else {
      if (props.qType === "ControlDisplay_Yesno") {
        flag = true;
      } else if (props.options[1].more_info === false) {
        flag = false;
      } else {
        flag = true;
      }
    }
    props.onChange({ selected: temp, moreInfo }, props.id, props.qID, props.qType, flag);
  };
  const handleTextChange = e => {
    setMoreInfo(e.target.value);
    props.onChange({ selected, moreInfo: e.target.value }, props.id, props.qID, props.qType, true);
  };
  return (
    <div>
      <h4 className='step-title'>{props.title}</h4>
      <div className='radio-group pt-0 mb-5'>
        <label className='radio-item'>
          <input
            type='radio'
            name={props.title}
            id='2'
            onClick={e => onClick(e)}
            checked={selected === 2}
            value={2}
            onChange={() => {
              setSelected(2);
            }}
          />
          <span className='radio_check' />
          Yes
        </label>
        <label className='radio-item'>
          <input
            type='radio'
            name={props.title}
            id='1'
            onClick={e => onClick(e)}
            checked={selected === 1}
            value={1}
            onChange={() => {
              setSelected(1);
            }}
          />
          <span className='radio_check' />
          No
        </label>
      </div>
      {props.options[1].more_info && selected === 2 && (
        <React.Fragment>
          <h4 className='step-title'>{props.options[1].more_info_text}</h4>
          <textarea className='form-control' rows='5' value={moreInfo} onChange={e => handleTextChange(e)} />
        </React.Fragment>
      )}
    </div>
  );
}

export default YesNoButton;
