import React from "react";

function MedicationCard(props) {
  const onChange = () => {};
  return (
    <div>
      <input type='radio' className='tretment_radio' name='radio-group' checked={props.selected === props.id} onChange={onChange} />
      <label className='treatment_box' onClick={e => props.onChange(e)} id={props.id}>
        <div className='treatment_box_inner' style={{ pointerEvents: "none" }}>
          <i className='verification-icon fa fa-check-circle' />
          <div className='treatment_box-img'>
            <img src={props.data.image_url} className='img-fluid' alt='' />
          </div>
          <div className='treatment_desc'>
            <h3>{props.data.name}</h3>
            <p>{props.data.description}</p>
          </div>
        </div>
      </label>
    </div>
  );
}

function MedicationPreference(props) {
  return (
    <div className='history-list'>
      {props.content.map((option, index) => {
        return <MedicationCard key={index} data={option} id={index} onChange={e => props.onChange(e)} selected={props.selectedMed} />;
      })}
    </div>
  );
}

export default MedicationPreference;
