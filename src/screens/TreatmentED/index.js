import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getTreatment, createSubscription } from "../../actions";
import ProgressMeter from "../../Components/ProgressMeter";
import MedicationPreference from "./medPrefer";
import FrequencyOfUse from "./frequency";

import { ClipBoardTopDesktop } from "../../constants";
import { ClipBoardLeftDesktop } from "../../constants";
import { ClipBoardRightDesktop } from "../../constants";
import { ClipBoardBotDesktop } from "../../constants";
import { ClipBoardRizeLogo } from "../../constants";

import "../../assets/css/onlinevisit_custom.css";

function TreatmentED(props) {
  const [selectedMed, setSelectedMed] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(-1);
  const [step, setStep] = useState(0); // 0 - treatment, 1 - usage frequency, 2 - shipment frequency

  useEffect(() => {
    if (props.treatment === undefined) {
      props.getTreatment("ed");
    }
  });

  const onMedSelectChange = e => {
    setSelectedMed(parseInt(e.target.id));
  };

  const onPlanChange = e => {
    setSelectedPlan(e);
  };
  const submit = () => {
    if (step === 0) {
      if (selectedMed !== -1) {
        if (props.treatment[selectedMed].doses.length > 1) setStep(1);
        else setStep(2);
      }
    } else if (step === 1) {
      setStep(2);
    } else {
      props.createSubscription(selectedPlan);
      sessionStorage.setItem("surveyType", "ed");
      props.history.push("/id_verification");
    }
  };

  if (props.treatment === undefined) return <div />;
  return (
    <div>
      <div className='py-5'>
        <div className='container'>
          <div className='vertical-steps-wrap clearfix'>
            <ProgressMeter type={"ed"} currentStep={3} title={"Treatments"} />
            <div className='steps-content-wrap' style={{ height: "100%" }}>
              <div className='clipboard-container'>
                <img src={ClipBoardTopDesktop} alt='ClipBoardTopDesktop' />
                <div className='clipboard-left'>
                  <img src={ClipBoardLeftDesktop} alt='ClipBoardLeftDesktop' />
                </div>
                <div className='clipboard-content'>
                  {step === 0 && (
                    <React.Fragment>
                      <label className='form-label font-lg form-tag-line' style={{ color: "rosybrown" }}>
                        Treatment Plan
                      </label>
                      <div className='mb-5'>
                        <div className='max-600'>
                          <div className='form-group text-center' style={{ marginTop: "5px", marginBottom: "0px" }}>
                            <span className='btn btn-sm btn-empty-white' style={{ width: "100%" }}>
                              <br />
                            </span>
                          </div>
                          <p className='h1 font-weight-bold text-blue mb-4'>The Pill for ED</p>
                          <label className='form-label font-lg'>Upon submitting your visit, a doctor will review your information and determine the best treatment plan for you.</label>
                          <label className='form-label font-lg'>For those who have never used ED medication in the past, our most commonly prescribed drug is {props.treatment[0].name}.</label>
                          <MedicationPreference content={props.treatment} onChange={e => onMedSelectChange(e)} selectedMed={selectedMed} />
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                  <div className='max-600'>{step > 0 && <FrequencyOfUse content={props.treatment[selectedMed].doses} key={selectedMed} onChange={e => onPlanChange(e)} step={step} productName={props.treatment[selectedMed].name} />}</div>
                  <div className='max-600 form-group mb-5 text-center'>
                    <span className='btn btn-sm btn-secondary' style={{ width: "100%" }} onClick={submit}>
                      Continue
                    </span>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TreatmentED));
