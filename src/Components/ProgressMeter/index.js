import React from "react";

import Logo from "../../assets/images/rize-logo.png";

import TitleComponent from "../TitleComponent";

// props.currentStep
// 0 - registration
// 1 - Hairloss History or ED History
// 2 - Medication History
// 3 - Treatment
// 4 - Checkout
function ProgressMeter(props) {
  let p = props.type === "ed" ? "ED" : "Hair Loss";
  return (
    <React.Fragment>
      <TitleComponent title={props.title + " | " + p + " | Rize"} />
      <div className='vertical-steps steps' style={{ padding: "0" }}>
        <div className='text-center steps'>
          <img src={Logo} alt='' />
        </div>
        <div className='vertical-steps steps box-shadow rounded-xlg'>
          <div className='steps-inner'>
            <div className={"step " + (props.currentStep === 0 ? "active" : props.currentStep > 0 ? "completed" : "")}>
              <span className='step-icon registration' />
              <span className='step-name'>Registration</span>
            </div>
            <div className={"step " + (props.currentStep === 1 ? "active" : props.currentStep > 1 ? "completed" : "")}>
              <span className={"step-icon " + (props.type === "hairloss" ? "mustache" : "heart")} />
              <span className='step-name'>{props.type === "hairloss" ? "Hair Loss History" : "ED History"}</span>
            </div>
            <div className={"step " + (props.currentStep === 2 ? "active" : props.currentStep > 2 ? "completed" : "")}>
              <span className='step-icon plus' />
              <span className='step-name'>Medical History</span>
            </div>
            <div className={"step " + (props.currentStep === 3 ? "active" : props.currentStep > 3 ? "completed" : "")}>
              <span className='step-icon capsule' />
              <span className='step-name'>Treatment</span>
            </div>
            <div className={"step " + (props.currentStep === 4 ? "active" : "")}>
              <span className='step-icon badge' />
              <span className='step-name'>Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProgressMeter;
