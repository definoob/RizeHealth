import React, { useState, useEffect } from "react";

function Billing(props) {
  const payment_method_id = props.data.payment_method_id;
  const owner_id = props.data.owner_id;
  const [holderName, setHolderName] = useState("");
  const [nameEdited, setNameEdited] = useState(props.edited);
  const [cardNumber, setCardNumber] = useState("");
  const [numberEdited, setNumberEdited] = useState(props.edited);
  const [ccv, setCCV] = useState("");
  const [ccvEdited, setCCVEdited] = useState(props.edited);
  const [expMonth, setExpMonth] = useState("MM");
  const [expYear, setExpYear] = useState("YY");
  const [zip, setZip] = useState("");
  const [zipEdited, setZipEdited] = useState(props.edited);

  const createMonths = () => {
    let monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let res = [
      <option value='month' hidden key={-1}>
        MM
      </option>
    ];
    for (let i = 0; i < 12; i++)
      res.push(
        <option value={monthList[i]} key={i}>
          {monthList[i]}
        </option>
      );
    return res;
  };
  const createYears = () => {
    let yearList = [
      <option value='year' hidden key={-1}>
        YY
      </option>
    ];
    for (let y = new Date().getFullYear(), i = 0; i < 20; i++) {
      yearList.push(
        <option value={y + i} key={i}>
          {y + i}
        </option>
      );
    }
    return yearList;
  };

  useEffect(() => {
    window.$('[data-toggle="popover"]').popover();
    setNameEdited(props.edited);
    setNumberEdited(props.edited);
    setCCVEdited(props.edited);
    setZipEdited(props.edited);
  }, [props.edited]);
  const onNameChange = e => {
    setHolderName(e.target.value);
    setNameEdited(true);
    props.onDataChange({ payment_method_id, owner_id, holder_name: e.target.value, number: cardNumber, ccv, expire_month: expMonth, expire_year: expYear, zip });
  };
  const onCardNumChange = e => {
    setCardNumber(e.target.value);
    setNumberEdited(true);
    props.onDataChange({ payment_method_id, owner_id, holder_name: holderName, number: e.target.value, ccv, expire_month: expMonth, expire_year: expYear, zip });
  };
  const onCCVChange = e => {
    setCCV(e.target.value);
    setCCVEdited(true);
    props.onDataChange({ payment_method_id, owner_id, holder_name: holderName, number: cardNumber, ccv: e.target.value, expire_month: expMonth, expire_year: expYear, zip });
  };
  const onMonthChange = e => {
    setExpMonth(e.target.value);
    props.onDataChange({ payment_method_id, owner_id, holder_name: holderName, number: cardNumber, ccv, expire_month: e.target.value, expire_year: expYear, zip });
  };
  const onYearChange = e => {
    setExpYear(e.target.value);
    props.onDataChange({ payment_method_id, owner_id, holder_name: holderName, number: cardNumber, ccv, expire_month: expMonth, expire_year: e.target.value, zip });
  };
  const onZipChange = e => {
    setZip(e.target.value);
    setZipEdited(true);
    props.onDataChange({ payment_method_id, owner_id, holder_name: holderName, number: cardNumber, ccv, expire_month: expMonth, expire_year: expYear, zip: e.target.value });
  };
  return (
    <React.Fragment>
      <h4 className='step-title bordered-title mt-5 pt-2'>Billing Information</h4>
      <div className='form-group form-group-inline mb-3 align-items-center'>
        <label className='form-label'>Name on Card</label>
        <div className={"field-wrap " + (!holderName ? "error" : "success")}>
          <input type='text' className='form-control' value={holderName} onChange={onNameChange} />
          <i className='verification-icon fa fa-times' data-trigger='hover' data-toggle='popover' data-container='html' data-placement='bottom' data-content='*Required.' style={{ display: !holderName && nameEdited === true ? "" : "none" }} />
          <i className='verification-icon fa fa-check' style={{ display: holderName && nameEdited === true ? "" : "none" }}></i>
        </div>
      </div>
      <div className='form-group form-group-inline mb-3 align-items-center'>
        <label className='form-label'>Card Number</label>
        <div className={"field-wrap " + (!cardNumber ? "error" : "success")}>
          <input type='text' className='form-control' value={cardNumber} onChange={onCardNumChange} />
          <i className='verification-icon fa fa-times' data-trigger='hover' data-toggle='popover' data-container='html' data-placement='bottom' data-content='*Required.' style={{ display: !cardNumber && numberEdited === true ? "" : "none" }} />
          <i className='verification-icon fa fa-check' style={{ display: cardNumber && numberEdited === true ? "" : "none" }}></i>
        </div>
      </div>
      <div className='form-group form-group-inline mb-3 align-items-center'>
        <label className='form-label'>Expiration Date</label>
        <div className='field-wrap date'>
          <select className='chosen-select form-control' data-width='100%' value={expMonth} onChange={onMonthChange}>
            {createMonths()}
          </select>
        </div>
        <div className='field-wrap date'>
          <select className='chosen-select form-control' data-width='100%' value={expYear} onChange={onYearChange}>
            {createYears()}
          </select>
        </div>
        <label className='form-label max-70 text-md-right'>CVV</label>
        <div className={"field-wrap " + (!ccv ? "error" : "success")}>
          <input type='text' className='form-control' value={ccv} onChange={onCCVChange} />
          <i className='verification-icon fa fa-times' data-trigger='hover' data-toggle='popover' data-container='html' data-placement='bottom' data-content='*Required.' style={{ display: !ccv && ccvEdited === true ? "" : "none" }} />
          <i className='verification-icon fa fa-check' style={{ display: ccv && ccvEdited === true ? "" : "none" }}></i>
        </div>
      </div>
      <div className='form-group form-group-inline mb-3 align-items-center'>
        <label className='form-label'>Billing ZIP</label>
        <div className={"field-wrap " + (!zip ? "error" : "success")}>
          <input type='text' className='form-control' value={zip} onChange={onZipChange} />
          <i className='verification-icon fa fa-times' data-trigger='hover' data-toggle='popover' data-container='html' data-placement='bottom' data-content='*Required.' style={{ display: !zip && zipEdited === true ? "" : "none" }} />
          <i className='verification-icon fa fa-check' style={{ display: zip && zipEdited === true ? "" : "none" }}></i>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Billing;
