import React, { useState, useEffect } from "react";

function Cascade(props) {
  var selectedIDFromResp = new Array(props.options.length).fill(false);
  var contentIDFromResp = new Array(props.options.length).fill(-1);
  if (props.resp !== undefined) {
    props.resp.forEach(ele => {
      if (ele.question_id === props.qID) selectedIDFromResp[ele.answer_id - 1] = true;
      props.options.forEach((e, i) => {
        if (e.followup_question && e.followup_question.id === ele.question_id) {
          contentIDFromResp[i] = ele.answer_id - 1;
        }
      });
    });
  }
  const [selectedID, setSelectedID] = useState(selectedIDFromResp);
  const [contentID, setContentID] = useState(contentIDFromResp);
  var questionIDs = new Array(props.options.length).fill(-1);
  props.options.forEach((option, index) => {
    if (option.followup_question) questionIDs[index] = option.followup_question.id;
  });
  useEffect(() => {
    if (props.resp !== undefined) props.onChange({ selectedID, contentID, questionIDs }, props.id, props.qID, props.qType);
    // eslint-disable-next-line
  }, []);
  const onHandleCheckBox = event => {
    var temp = [...selectedID];
    temp[event.target.value] = !temp[event.target.value];
    if (parseInt(event.target.value) === selectedID.length - 1) {
      if (temp[event.target.value] === true) {
        for (var i = 0; i < temp.length - 1; i++) temp[i] = false;
      }
    } else {
      temp[selectedID.length - 1] = false;
    }
    setSelectedID(temp);
    props.onChange({ selectedID: temp, contentID, questionIDs }, props.id, props.qID, props.qType);
  };
  const onHandleRadio = event => {
    var temp = [...contentID];
    temp[event.target.id] = parseInt(event.target.value);
    setContentID(temp);
    props.onChange({ selectedID, contentID: temp, questionIDs }, props.id, props.qID, props.qType);
  };
  return (
    <div>
      <h4 className='step-title'>{props.title}</h4>
      <div className='check-list'>
        {props.options.map((option, index) => {
          return (
            <div key={index} className='mb-4 pb-2'>
              <label className='check-item'>
                <input type='checkbox' value={index} checked={selectedID[index]} onChange={e => onHandleCheckBox(e)} />
                <span className='checkmark'>
                  <i className='fa fa-check' />
                </span>
                <span className='check-item-name'>{option.text}</span>
              </label>
              {option.followup_question && selectedID[index] && (
                <div className='check-item-details'>
                  <p className='que'>{option.followup_question.text}</p>
                  <div className='gray-box'>
                    <ul className='radio-list'>
                      {option.followup_question.options.map((radioInput, i) => {
                        questionIDs[index] = option.followup_question.id;
                        return (
                          <li key={i}>
                            <label className='radio-item'>
                              <input type='radio' value={i} id={index} checked={contentID[index] === i} onChange={e => onHandleRadio(e)} />
                              <span className='radio_check' />
                              {radioInput.text}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cascade;
