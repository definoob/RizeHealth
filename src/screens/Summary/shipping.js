import React, { useState, useEffect } from "react";

function Shipping(props) {
  const id = props.data.id;
  const [name, setName] = useState("");
  const [nameEdited, setNameEdited] = useState(props.edited);
  const [address1, setAddress1] = useState("");
  const [addressEdited, setAddressEdited] = useState(props.edited);
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [cityEdited, setCityEdited] = useState(props.edited);
  const [zip, setZip] = useState("");
  const [zipEdited, setZipEdited] = useState(props.edited);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneEdited, setPhoneEdited] = useState(props.edited);

  const state = props.data.state;
  const type = props.data.type;

  useEffect(() => {
    window.$('[data-toggle="popover"]').popover();
    setNameEdited(props.edited);
    setAddressEdited(props.edited);
    setCityEdited(props.edited);
    setZipEdited(props.edited);
    setPhoneEdited(props.edited);
  }, [props.edited]);
  const onNameChange = e => {
    setName(e.target.value);
    setNameEdited(true);
    props.onDataChange({ id, name: e.target.value, lines: [address1, address2], city, state, zip, type });
  };
  const onAddressChange1 = e => {
    setAddress1(e.target.value);
    setAddressEdited(true);
    props.onDataChange({ id, name, lines: [e.target.value, address2], city, state, zip, type });
  };
  const onAddressChange2 = e => {
    setAddress2(e.target.value);
    props.onDataChange({ id, name, lines: [address1, e.target.value], city, state, zip, type });
  };
  const onCityChange = e => {
    setCity(e.target.value);
    setCityEdited(true);
    props.onDataChange({ id, name, lines: [address1, address2], city: e.target.value, state, zip, type });
  };
  const onZipChange = e => {
    setZip(e.target.value);
    setZipEdited(true);
    props.onDataChange({ id, name, lines: [address1, address2], city, state, zip: e.target.value, type });
  };
  const onPhoneNumberChange = e => {
    setPhoneNumber(e.target.value);
    setPhoneEdited(true);
    props.onPhoneNumberChange(e.target.value);
  };
  return (
    <React.Fragment>
      <h4 className='step-title bordered-title mt-5 pt-2'>Shipping Information</h4>
      <div className='form-group form-group-inline mb-3 align-items-center'>
        <label className='form-label'>Full Name</label>
        <div className={"field-wrap " + (!name ? "error" : "success")}>
          <input type='text' className='form-control' value={name} onChange={onNameChange} />
          <i className='verification-icon fa fa-times' data-trigger='hover' data-toggle='popover' data-container='html' data-placement='bottom' data-content='*Required.' style={{ display: !name && nameEdited === true ? "" : "none" }} />
          <i className='verification-icon fa fa-check' style={{ display: name && nameEdited === true ? "" : "none" }}></i>
        </div>
      </div>
      <div className='form-group form-group-inline mb-3 align-items-center'>
        <label className='form-label'>Address Line 1</label>
        <div className={"field-wrap " + (!address1 ? "error" : "success")}>
          <input type='text' className='form-control' value={address1} onChange={onAddressChange1} />
          <i className='verification-icon fa fa-times' data-trigger='hover' data-toggle='popover' data-container='html' data-placement='bottom' data-content='*Required.' style={{ display: !address1 && addressEdited === true ? "" : "none" }} />
          <i className='verification-icon fa fa-check' style={{ display: address1 && addressEdited === true ? "" : "none" }}></i>
        </div>
      </div>
      <div className='form-group form-group-inline mb-3 align-items-center'>
        <label className='form-label'>Address Line 2</label>
        <div className='field-wrap'>
          <input type='text' className='form-control' value={address2} onChange={onAddressChange2} />
        </div>
      </div>
      <div className='form-group form-group-inline mb-3 align-items-center'>
        <label className='form-label'>City</label>
        <div className={"field-wrap " + (!city ? "error" : "success")}>
          <input type='text' className='form-control' value={city} onChange={onCityChange} />
          <i className='verification-icon fa fa-times' data-trigger='hover' data-toggle='popover' data-container='html' data-placement='bottom' data-content='*Required.' style={{ display: !city && cityEdited === true ? "" : "none" }} />
          <i className='verification-icon fa fa-check' style={{ display: city && cityEdited === true ? "" : "none" }}></i>
        </div>
      </div>
      <div className='form-group form-group-inline mb-3 align-items-center'>
        <label className='form-label'>State</label>
        <div className='field-wrap max-230 '>
          <select className='chosen-select form-control' data-width='100%' disabled>
            <option>{state}</option>
          </select>
        </div>
      </div>
      <div className='form-group form-group-inline mb-3 align-items-center'>
        <label className='form-label'>ZIP Code</label>
        <div className={"field-wrap max-230 " + (!zip ? "error" : "success")}>
          <input type='text' className='form-control' value={zip} onChange={e => onZipChange(e)} />
          <i className='verification-icon fa fa-times' data-trigger='hover' data-toggle='popover' data-container='html' data-placement='bottom' data-content='*Required.' style={{ display: !zip && zipEdited === true ? "" : "none" }} />
          <i className='verification-icon fa fa-check' style={{ display: zip && zipEdited === true ? "" : "none" }}></i>
        </div>
      </div>
      <div className='form-group form-group-inline mb-3 align-items-center'>
        <label className='form-label'>Phone Number</label>
        <div className={"field-wrap max-230 " + (!phoneNumber ? "error" : "success")}>
          <input type='text' className='form-control' value={phoneNumber} onChange={e => onPhoneNumberChange(e)} />
          <i className='verification-icon fa fa-times' data-trigger='hover' data-toggle='popover' data-container='html' data-placement='bottom' data-content='*Required.' style={{ display: !phoneNumber && phoneEdited === true ? "" : "none" }} />
          <i className='verification-icon fa fa-check' style={{ display: phoneNumber && phoneEdited === true ? "" : "none" }}></i>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Shipping;
