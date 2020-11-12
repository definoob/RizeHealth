import React, { useState, useEffect } from "react";

import image4 from "../../assets/images/4-packets-rize-sildenafil.jpg";
import image6 from "../../assets/images/6-packets-rize-sildenafil.jpg";
import image8 from "../../assets/images/8-packets-rize-sildenafil.jpg";
import image10 from "../../assets/images/10-packets-rize-sildenafil.jpg";
import image12 from "../../assets/images/12-packets-rize-sildenafil.jpg";
import image14 from "../../assets/images/14-packets-rize-sildenafil.jpg";
import image16 from "../../assets/images/16-packets-rize-sildenafil.jpg";

import "../../assets/css/onlinevisit_custom.css";

function ShipmentFrequncy(props) {
  const [selectedOption, setSelectedOption] = useState(props.content[0].subscription_offering_id);
  const [checked, setChecked] = useState(0);
  useEffect(() => {
    props.onChange(selectedOption);
    // eslint-disable-next-line
  }, []);
  const onChange = e => {
    setChecked(parseInt(e.target.value));
    setSelectedOption(parseInt(e.target.value));
    props.onChange(parseInt(e.target.id));
  };

  return (
    <React.Fragment>
      <label className='form-label font-lg form-tag-line' style={{ color: "rosybrown" }}>
        Save with fewer shipments
      </label>
      <div className='mb-5'>
        <div className='max-600'>
          <div className='form-group text-center' style={{ marginTop: "5px", marginBottom: "0px" }}>
            <span className='btn btn-sm btn-empty-white' style={{ width: "100%" }}>
              <br />
            </span>
          </div>
          <p className='h1 font-weight-bold text-blue mb-4'>Choose your shipping &amp; billing frequency</p>
          <label className='form-label font-lg'>Bundle your treatment in to fewer shipments to save.</label>
          <div className='pt-4 fs-18'>
            <div className='ml-0'>
              <p>Please select the frequency you would like your medication shipped:</p>
            </div>
            <ul className='radio-list'>
              {props.content.map((option, i) => {
                return (
                  <li key={i}>
                    <label className='radio-item'>
                      <input type='radio' value={i} checked={i === checked} id={option.subscription_offering_id} onChange={e => onChange(e)} />
                      <span className='radio_check' />
                      {option.description}-<span className='text-teal'>${option.cost}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function FrequencyOfUse(props) {
  const [selectedPlan, setSelectedPlan] = useState(props.productName === "Tadalafil" ? 0 : 1);

  const onPlanChange = e => {
    setSelectedPlan(parseInt(e.target.id));
  };
  const getDescription = txt => {
    const p = txt.split(" ");
    return (
      <React.Fragment>
        <span style={{ fontWeight: "lighter" }}>{p[0]} </span>
        {p[1]} {p[2]}{" "}
        <span style={{ fontWeight: "lighter" }}>
          {p[3]} {p[4]}
        </span>
      </React.Fragment>
    );
  };
  const getX = txt => {
    return parseInt(txt.match(/\d+/)[0]);
  };
  const getImage = txt => {
    var x = parseInt(txt.match(/\d+/)[0]);
    if (x === 4) return image4;
    else if (x === 6) return image6;
    else if (x === 8) return image8;
    else if (x === 10) return image10;
    else if (x === 12) return image12;
    else if (x === 14) return image14;
    else if (x === 16) return image16;
  };
  return (
    <div>
      {props.step === 1 && (
        <React.Fragment>
          <label className='form-label font-lg form-tag-line' style={{ color: "rosybrown" }}>
            Monthly Usage
          </label>
          <div className='mb-5'>
            <div className='max-600'>
              <div className='form-group text-center' style={{ marginTop: "5px", marginBottom: "0px" }}>
                <span className='btn btn-sm btn-empty-white' style={{ width: "100%" }}>
                  <br />
                </span>
              </div>
              <p className='h1 font-weight-bold text-blue mb-4'>How many uses per month do you anticipate?</p>
              <label className='form-label font-lg'>If you are prescribed a medication, how often do you expect to use it for sexual activity?</label>
              <div className='pt-4 fs-18'>
                <ul className='radio-list'>
                  {props.content.map((option, index) => {
                    return (
                      <li key={index}>
                        <label className='radio-item'>
                          <input type='radio' id={index} checked={selectedPlan === index} onChange={e => onPlanChange(e)} />
                          <span className='radio_check' />
                          {getDescription(option.description)}
                          {getX(option.description) === 6 && (
                            <p className='price-subtitle' style={{ color: "#75c7a4" }}>
                              Most Popular
                            </p>
                          )}
                        </label>
                        <div>
                          <img src={getImage(option.description)} alt='' style={{ width: "100%" }} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      {props.step === 2 && <ShipmentFrequncy content={props.content[selectedPlan % 3].shipping_frequency} onChange={e => props.onChange(e)} key={selectedPlan} />}
    </div>
  );
}

export default FrequencyOfUse;
