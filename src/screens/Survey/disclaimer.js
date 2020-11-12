import React, { useState } from "react";
import Modal from "./modal";
import ProgressMeter from "../../Components/ProgressMeter";

import {ClipBoardTopDesktop} from "../../constants";
import {ClipBoardLeftDesktop} from "../../constants";
import {ClipBoardRightDesktop} from "../../constants";
import {ClipBoardBotDesktop} from "../../constants";
import {ClipBoardRizeLogo} from "../../constants"

import "../../assets/css/onlinevisit_custom.css";

function Disclaimer(props) {
  const [checked, setChecked] = useState(false);
  const [err, setErr] = useState(false);
  const onChange = () => {
    setChecked(!checked);
    setErr(false);
  };
  const onClick = () => {
    if (checked === true) props.history.push("/treatment_preference/hairloss");
    else {
      setErr(true);
    }
  };
  return (
    <div>
      <div className='alert alert-danger alert-dismissible online-visit-alert' role='alert' style={{ display: err ? "" : "none" }}>
        <a href='_blank' className='close' data-dismiss='alert' aria-label='close'>
          &times;
        </a>
        <i className='fa fa-fas' style={{ fontSize: "24px", padding: "0 10px 0 0" }}>
          &#xf071;
        </i>{" "}
        There are items that require your attention.
      </div>
      <div className='py-5'>
        <div className='container'>
          <div className='vertical-steps-wrap clearfix'>
            <ProgressMeter type={"hairloss"} currentStep={3} />
            <div className='steps-content-wrap' style={{ height: "100%" }}>
              <div className="clipboard-container">
                <img src={ClipBoardTopDesktop} alt="ClipBoardTopDesktop" />
                <div className="clipboard-left">
                  <img src={ClipBoardLeftDesktop} alt="ClipBoardLeftDesktop" />
                </div>
                <div className="clipboard-content">
                  <label className='form-label font-lg form-tag-line' style={{ color: "rosybrown" }}>
                    Disclaimer
                  </label>
                  <div className='max-600' style={{ marginTop: "89px" }}>
                    <Modal />
                    <div className='mb-3'>
                      <label className='form-label font-lg'>
                        <p>
                          Finasteride, the primary drug for hair loss, has potential risks. The most common are sexual side effects, but these are rare and only occur in 1.2-1.4% of cases. Click{" "}
                          <a href='_blank' data-toggle='modal' data-target='#ModalCenter' className='modal-link'>
                            here
                          </a>{" "}
                          for additional info about these and other risks.
                        </p>
                        <p>I understand I can discuss these further with my doctor.</p>
                      </label>
                    </div>
                    <div className='error-msg' style={{ display: err ? "" : "none" }}>
                      Please agree to continue.
                    </div>
                    <div className='form-group mb-5'>
                      <label className='check-item'>
                        <input type='checkbox' checked={checked} onChange={onChange} />
                        <span className='checkmark'>
                          <i className='fa fa-check'></i>
                        </span>
                        <span className='check-item-name'>I understand - continue.</span>
                      </label>
                    </div>
                    <div className='form-group mb-5 text-center'>
                      <span className='btn btn-sm btn-secondary' style={{ width: "100%" }} onClick={onClick}>
                        Next
                      </span>
                    </div>
                  </div>
                  <div style={{ margin: "20px auto 30px auto", textAlign: "center" }}>
                    <img src={ClipBoardRizeLogo} alt="Rize" style={{ width: "76px", height: "32px", border: "0" }} />
                  </div>
                </div>
                <div className="clipboard-right">
                  <img src={ClipBoardRightDesktop} alt="ClipBoardRightDesktop" />
                </div>
                <img src={ClipBoardBotDesktop} alt="ClipBoardBotDesktop" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Disclaimer;
