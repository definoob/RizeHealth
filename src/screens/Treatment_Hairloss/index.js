import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProgressMeter from "../../Components/ProgressMeter";
import { getTreatment, createSubscription } from "../../actions";

import { Box1, Box2, Box3 } from "./box";

import { ClipBoardTopDesktop } from "../../constants";
import { ClipBoardLeftDesktop } from "../../constants";
import { ClipBoardRightDesktop } from "../../constants";
import { ClipBoardBotDesktop } from "../../constants";
import { ClipBoardRizeLogo } from "../../constants";

import "../../assets/css/onlinevisit_custom.css";

function UsageFrequency(props) {
  let p;
  if (props.data.doses[0].shipping_frequency.length === 1) p = 0;
  else p = 1;
  const [selectedOption, setSelectedOption] = useState(props.data.doses[0].shipping_frequency[p].subscription_offering_id);
  const [checked, setChecked] = useState(p);
  useEffect(() => {
    props.onChange(selectedOption);
  });
  const onChange1 = () => {};
  const onChange = e => {
    setChecked(parseInt(e.target.value));
    setSelectedOption(parseInt(e.target.id));
  };

  return (
    <div>
      <div className='mb-5'>
        <input type='radio' className='tretment_radio' name='radio-group' checked={true} onChange={onChange1} />
        <label className='treatment_box' id={props.id}>
          <div className='treatment_box_inner'>
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
      <div className='mb-5'>
        <label className='form-label font-lg text-blue' style={{ borderBottom: "1px solid" }}>
          Shipment Frequency
        </label>
        <div className='pt-4 fs-18'>
          <div className='ml-0'>
            <p>Please select the frequency you would like your medication shipped:</p>
          </div>
          <ul className='radio-list'>
            {props.data.doses[0].shipping_frequency.map((option, i) => {
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
  );
}

function updateHeight(name) {
  var highestBox = 0;
  window.$(name, this).each(function() {
    if (window.$(this).height() > highestBox) {
      highestBox = window.$(this).height();
    }
  });
  window.$(name, this).height(highestBox);
}

function TreatmentHairloss(props) {
  const [selectedTreatment, setSelectedTreatment] = useState("0");
  const [show, setShow] = useState(false);
  const [selectedOfferID, setSelectedOfferID] = useState(0);
  useEffect(() => {
    if (props.treatment === undefined) {
      props.getTreatment("hairloss");
    }
    function updateSize() {
      if (props.treatment !== undefined) {
        updateHeight(".description_");
        updateHeight(".symptom_");
        updateHeight(".title_");
        updateHeight(".plan-summary");
        updateHeight(".plan-details");
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  });
  const onClick = id => {
    setSelectedTreatment(id);
    setShow(true);
  };
  const onContinueClick = () => {
    props.createSubscription(selectedOfferID);
    sessionStorage.setItem("surveyType", "hairloss");
    props.history.push("/id_verification");
  };
  const onSelectedOfferIDChanged = value => {
    setSelectedOfferID(value);
  };

  return (
    <div className='py-5'>
      <div className='container'>
        <div className='vertical-steps-wrap clearfix'>
          <ProgressMeter type={"hairloss"} currentStep={3} title={"Treatments"} />
          <div className='steps-content-wrap' style={{ height: "100%" }}>
            <div className='clipboard-container'>
              <img src={ClipBoardTopDesktop} alt='ClipBoardTopDesktop' />
              <div className='clipboard-left'>
                <img src={ClipBoardLeftDesktop} alt='ClipBoardLeftDesktop' />
              </div>
              <div className='clipboard-content'>
                <label className='form-label font-lg form-tag-line' style={{ color: "rosybrown" }}>
                  Hair Loss Treatment
                </label>

                <div className='mb-5'>
                  <div className='form-group text-center' style={{ marginTop: "5px", marginBottom: "0px" }}>
                    <span className='btn btn-sm btn-empty-white' style={{ width: "100%" }}>
                      <br />
                    </span>
                  </div>
                  <h1 className='text-center font-lg'>CHOOSE YOUR PLAN BELOW</h1>
                  {show === false ? (
                    <section className='review-wrap text-center' style={{ backgroundColor: "white" }}>
                      <div className='row plan-row'>
                        {props.treatment !== undefined &&
                          props.treatment.map((element, index) => {
                            if (element.name === "Finasteride") return <Box2 id={index} key={index} onClick={onClick} />;
                            else if (element.name === "Minoxidil") return <Box3 id={index} key={index} onClick={onClick} />;
                            else return <Box1 id={index} key={index} onClick={onClick} />;
                          })}
                      </div>
                    </section>
                  ) : (
                    <div className='max-600'>
                      <UsageFrequency data={props.treatment[selectedTreatment]} onChange={onSelectedOfferIDChanged} />
                      <div className='form-group mb-5 text-center'>
                        <span className='btn btn-sm btn-secondary' style={{ width: "100%" }} onClick={onContinueClick}>
                          Continue
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ margin: "20px auto 30px auto", textAlign: "center" }}>
                  <img src={ClipBoardRizeLogo} alt='Rize' style={{ width: "76px", height: "32px", border: "0" }} />
                </div>
              </div>
              <div className='clipboard-right'>
                <img src={ClipBoardRightDesktop} alt='ClipBoardRightDesktop' />
              </div>
              <img src={ClipBoardBotDesktop} alt='ClipBoardBotDesktop' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  treatment: state.treatmentReducer.treatment
});

const mapDispatchToProps = dispatch => {
  return {
    getTreatment: type => dispatch(getTreatment(type)),
    createSubscription: offerID => dispatch(createSubscription(offerID))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TreatmentHairloss));
