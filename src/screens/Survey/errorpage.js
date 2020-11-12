import React from "react";
import { connect } from "react-redux";

import { postAnswerSuccess, setQuestionCount } from "../../actions";
import ProgressMeter from "../../Components/ProgressMeter";

import {ClipBoardTopDesktop} from "../../constants";
import {ClipBoardLeftDesktop} from "../../constants";
import {ClipBoardRightDesktop} from "../../constants";
import {ClipBoardBotDesktop} from "../../constants";
import {ClipBoardRizeLogo} from "../../constants"

import "../../assets/css/onlinevisit_custom.css";


function ErrPage(props) {
  const onSubmit = () => {
    props.postAnswerSuccess();
    props.setQuestionCount(props.questionCount - 1);
  };
  return (
    <div>
      <div className='py-5'>
        <div className='container'>
          <div className='vertical-steps-wrap clearfix'>
            <ProgressMeter type={props.type} currentStep={props.currentStep} />
            <div className='steps-content-wrap' style={{ height: '100%' }}>
              <div className='clipboard-container'>
                <img src={ClipBoardTopDesktop} alt='ClipBoardTopDesktop' />
                <div className='clipboard-left'>
                  <img src={ClipBoardLeftDesktop} alt='ClipBoardLeftDesktop' />
                </div>
                <div className='clipboard-content'>
                  <div className='max-600'>
                    <div className='form-group text-center' style={{ marginTop: "5px", marginBottom: "0px" }}>
                      <span className='btn btn-sm btn-empty-white' style={{ width: "100%" }}>
                        <br />
                      </span>
                    </div>
                    <h4 className='step-title'>{props.errMsg}</h4>
                    <div className='form-group mb-5'>
                      <span className='btn btn-sm btn-secondary' onClick={() => onSubmit()}>
                        <i className='fa fa-angle-left' /> Go Back
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
    </div>
  );
}

const mapStateToProps = state => ({
  questionCount: state.questionReducer.questionCount,
  errMsg: state.questionReducer.errMsg
});

const mapDispatchToProps = dispatch => {
  return {
    postAnswerSuccess: () => dispatch(postAnswerSuccess()),
    setQuestionCount: x => dispatch(setQuestionCount(x))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrPage);
