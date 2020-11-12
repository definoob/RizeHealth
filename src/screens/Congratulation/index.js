import React from "react";

import ProgressMeter from "../../Components/ProgressMeter";

import { ClipBoardTopDesktop } from "../../constants";
import { ClipBoardLeftDesktop } from "../../constants";
import { ClipBoardRightDesktop } from "../../constants";
import { ClipBoardBotDesktop } from "../../constants";
import { ClipBoardRizeLogo } from "../../constants";

import "../../assets/css/onlinevisit_custom.css";

function Congratulation(params) {
  return (
    <div className='py-5'>
      <div className='container'>
        <div className='vertical-steps-wrap clearfix'>
          <ProgressMeter type={sessionStorage.getItem("surveyType")} currentStep={4} title={"Order Approved"} />
          <div className='steps-content-wrap' style={{ height: "100%" }}>
            <div className='clipboard-container'>
              <img src={ClipBoardTopDesktop} alt='ClipBoardTopDesktop' />
              <div className='clipboard-left'>
                <img src={ClipBoardLeftDesktop} alt='ClipBoardLeftDesktop' />
              </div>
              <div className='clipboard-content'>
                <label className='form-label font-lg form-tag-line' style={{ color: "rosybrown" }}>
                  Congratulations!
                </label>
                <div className='max-600' style={{ marginTop: "89px" }}>
                  <div className='mb-3'>
                    <label className='form-label font-lg'>
                      <h1>Thank You!</h1>
                      <p>A Dr. licensed in your state will review your order shortly and you will be contacted with next steps.</p>
                    </label>
                  </div>
                  <div className='form-group mb-5 text-center'>
                    <span className='btn btn-sm btn-secondary' style={{ width: "100%" }}>
                      My Account
                    </span>
                  </div>
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

export default Congratulation;
