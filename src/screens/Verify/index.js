import React, { Component } from "react";
import { connect } from "react-redux";
import { verifyUser, verifyClear } from "../../actions";
import ProgressMeter from "../../Components/ProgressMeter";

import { ClipBoardTopDesktop } from "../../constants";
import { ClipBoardLeftDesktop } from "../../constants";
import { ClipBoardRightDesktop } from "../../constants";
import { ClipBoardBotDesktop } from "../../constants";
import { ClipBoardRizeLogo } from "../../constants";

import "../../assets/css/onlinevisit_custom.css";

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      surveyType: "",
      error: false
    };
  }
  componentDidMount() {
    const {
      match: {
        params: { type }
      }
    } = this.props;
    this.setState({ surveyType: type });
  }
  componentDidUpdate() {
    if (this.props.verified === false) {
      this.setState({ error: true });
      this.props.verifyClear();
    }
  }
  onChange(e) {
    this.setState({ code: e.target.value, error: false });
  }
  onClick() {
    this.props.verifyUser(this.state.code);
  }
  onContinue() {
    this.props.history.push("/survey/" + this.state.surveyType);
  }
  render() {
    return (
      <div>
        <div className='alert alert-danger alert-dismissible online-visit-alert' role='alert' style={{ display: this.state.error ? "" : "none" }}>
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
              <ProgressMeter type={this.state.surveyType} currentStep={this.props.verified === null ? 0 : 1} />
              <div className='steps-content-wrap' style={{ height: "100%" }}>
                <div className='clipboard-container'>
                  <img src={ClipBoardTopDesktop} alt='ClipBoardTopDesktop' />
                  <div className='clipboard-left'>
                    <img src={ClipBoardLeftDesktop} alt='ClipBoardLeftDesktop' />
                  </div>
                  <div className='clipboard-content'>
                    {this.props.verified === true ? (
                      <label className='form-label font-lg form-tag-line' style={{ color: "rosybrown" }}>
                        Let's talk about your health
                      </label>
                    ) : null}
                    <div className='max-600'>
                      <div style={{ marginTop: "89px" }}>
                        {this.props.verified === true ? (
                          <div>
                            <p className='h1 font-weight-bold text-blue mb-4'>Your Health</p>
                            <label className='form-label font-lg'>Your doctor needs to know about your symptoms and overall health to determine the most appropriate treatment for you. It's important that you provide accurate information.</label>
                            <div className='form-group mb-5 text-center'>
                              <span className='btn btn-sm btn-secondary' style={{ width: "100%" }} onClick={() => this.onContinue()}>
                                Continue
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className='h5 font-weight-bold text-blue mb-4'>
                              We just sent you an email with a confirmation code. <br />
                              Please enter that code below to continue.
                            </p>
                            <div className='error-msg' style={{ display: this.state.error ? "" : "none" }}>
                              The verification code is not valid.
                            </div>
                            <div className='field-wrap mb-5'>
                              <input type='text' className='form-control' value={this.state.code} onChange={e => this.onChange(e)} />
                            </div>
                            <div className='form-group mb-5' style={{ display: "flex", justifyContent: "flex-end" }}>
                              <span className='btn btn-sm btn-secondary' onClick={() => this.onClick()}>
                                Next <i className='fa fa-angle-right' />{" "}
                              </span>
                            </div>
                          </div>
                        )}
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
}
const mapStateToProps = state => ({
  verified: state.usersReducer.verified
});

const mapDispatchToProps = dispatch => ({
  verifyUser: code => dispatch(verifyUser(code)),
  verifyClear: () => dispatch(verifyClear())
});

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
