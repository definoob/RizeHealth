import React, { useState, useEffect } from "react";

function CheckButton(props) {
  var response = new Array(props.options.length).fill(false);
  var textResp = new Array(props.options.length).fill("");
  if (props.resp !== undefined) {
    props.resp.forEach(ele => {
      response[ele.answer_id - 1] = true;
      textResp[ele.answer_id - 1] = ele.text_answer === null ? "" : ele.text_answer;
    });
  }
  const [selectedOptions, setSelectedOptions] = useState(response);
  const [moreInfo, setMoreInfo] = useState(textResp);

  useEffect(() => {
    if (props.resp !== undefined) props.onChange({ selectedOptions, moreInfo }, props.id, props.qID, props.qType);
    // eslint-disable-next-line
  }, []);
  const handleOptionChange = event => {
    var temp = [...selectedOptions];
    temp[event.target.id] = !temp[event.target.id];
    if (parseInt(event.target.id) === selectedOptions.length - 1) {
      for (let i = 0; i < temp.length - 1; i++) {
        temp[i] = false;
      }
    } else {
      if (temp[event.target.id] === true) temp[selectedOptions.length - 1] = false;
    }
    setSelectedOptions(temp);
    props.onChange({ selectedOptions: temp, moreInfo }, props.id, props.qID, props.qType);
  };
  const handleTextChange = event => {
    var temp = [...moreInfo];
    temp[event.target.id] = event.target.value;
    setMoreInfo(temp);
    props.onChange({ selectedOptions, moreInfo: temp }, props.id, props.qID, props.qType);
  };
  return (
    <div>
      <h4 className='step-title'>{props.title}</h4>
      <ul className='check-list'>
        {props.options.map((option, i) => (
          <li key={i}>
            <label className='check-item' htmlFor='id1'>
              <input type='checkbox' checked={selectedOptions[i]} onChange={e => handleOptionChange(e)} />
              <span className='checkmark' id={i} onClick={e => handleOptionChange(e)}>
                <i className='fa fa-check' id={i} />
              </span>
              <span className='check-item-name'>{option.text}</span>
            </label>
            {option.more_info && selectedOptions[i] && (
              <div className='check-item-details'>
                <p className='que'>{option.more_info_text}</p>
                <textarea className='form-control' rows='5' id={i} value={moreInfo[i]} onChange={e => handleTextChange(e)} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CheckButton;
