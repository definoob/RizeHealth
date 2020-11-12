import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as qs from "querystring";
import axios from "axios";
import MaskedInput from "react-text-mask";

import { requestSignup, removeErrMsg } from "../../actions";
import SelectType from "./SelectType";
import ProgressMeter from "../../Components/ProgressMeter";
import stateList from "./statelist.json";
import LoadingOverlay from "react-loading-overlay";

import { HeadlineWinky } from "../../constants";
import { ClipBoardTopDesktop } from "../../constants";
import { ClipBoardLeftDesktop } from "../../constants";
import { ClipBoardRightDesktop } from "../../constants";
import { ClipBoardBotDesktop } from "../../constants";
import { ClipBoardRizeLogo } from "../../constants";

import "../../assets/css/onlinevisit_custom.css";
import { mainWebsite, baseURL } from "../../Config";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyType: qs.parse(this.props.location.search)[`?type`], // surveyType: ed or hairloss
      step: 0, // 0 - state, 1 - dob, 2 - email + password
      location: "State", // selected state
      agreed: false, // user agreed or not
      stateListBorder: "1px solid #001246", // state box border - for error
      stateErrorMsg: "", // state box error, it should be two - one from server, and when user didn't select any
      agreedCheckBoxBorder: "1px solid #000", // if user didn't agree, will be red border
      birthdate: "", // user dob
      birthdateInputBorder: "1px solid #001246", // for invalid dob, it should be red
      birthdateInputErrorMsg: "", // according to birthdate value, it will be vary
      email: "", // user email
      emailBoxBorder: "1px solid #001246", // for invalid email, it will be red
      emailBoxErrorMsg: "", // for invalid email, it shows error msg
      password: "", // user password
      showPassword: false, // eye icon, false - not showing, true - showing
      passwordBoxBorder: "1px solid #001246", // for secure password none, or red
      passwordErrorMsg: "", // for secure password none, or the warning msg
      isActive: false, // in progress of calling api, shows loading screen when true
      showingAlert: false // shows alert if there is any error in the current page
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const prevType = qs.parse(prevProps.location.search)[`?type`];
    const currentType = qs.parse(this.props.location.search)[`?type`];
    if (prevType !== currentType) this.setState({ surveyType: currentType });
    if (this.props.error === true) {
      this.setState({ isActive: false });
      this.props.removeErrMsg();
      if (this.props.errorCode === "duplication") {
        this.setState({ step: 2, emailBoxBorder: "2px red solid", password: "", emailBoxErrorMsg: this.props.errMsg });
      }
    }
  }
  statesList() {
    var res = [];
    res.push(
      <option value='state' hidden key={-1}>
        Select your state
      </option>
    );
    stateList.forEach(element => {
      res.push(
        <option value={element.short} key={element.short}>
          {element.long}
        </option>
      );
    });
    return res;
  }
  async validateState(state) {
    this.setState({ isActive: true });
    const res = await axios
      .post(baseURL + "validate/state", '"' + state + '"', {
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(resp => {
        return resp.data;
      })
      .catch(e => {
        return e.response.data;
      });
    this.setState({ isActive: false });
    return res;
  }
  async validateDob(dob) {
    this.setState({ isActive: true });
    const temp = dob.slice(4, 8) + "-" + dob.slice(0, 2) + "-" + dob.slice(2, 4);
    const res = await axios
      .post(baseURL + "validate/dob", '"' + temp + '"', {
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(resp => {
        return resp.data;
      })
      .catch(e => {
        return e.response.data;
      });
    this.setState({ isActive: false });
    return res;
  }
  async validatePassword(password) {
    this.setState({ isActive: true });
    const res = await axios
      .post(baseURL + "validate/password", '"' + password + '"', {
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(resp => {
        return resp.data;
      })
      .catch(e => {
        return e.response.data;
      });
    this.setState({ isActive: false });
    return res;
  }
  async onButtonClick(e) {
    if (this.state.step === 0) {
      if (this.state.location !== "State" && this.state.agreed === true) {
        const res = await this.validateState(this.state.location).then(resp => resp);
        if (res.error === false) this.setState({ step: 1, showingAlert: false });
        else {
          this.setState({ stateListBorder: "2px solid red", showingAlert: true, stateErrorMsg: res.message });
        }
      } else {
        if (this.state.location === "State") {
          this.setState({ stateListBorder: "2px solid red", showingAlert: true, stateErrorMsg: "Please enter your state." });
        }
        if (this.state.agreed === false) {
          this.setState({ agreedCheckBoxBorder: "2px red solid", showingAlert: true });
        }
      }
    } else if (this.state.step === 1) {
      if (this.state.birthdate.length > 7) {
        const res = await this.validateDob(this.state.birthdate).then(resp => resp);
        if (res.error === false) this.setState({ step: 2, showingAlert: false });
        else {
          this.setState({ birthdateInputBorder: "2px solid red", showingAlert: true, birthdateInputErrorMsg: res.message });
        }
      } else {
        this.setState({ birthdateInputBorder: "2px solid red", showingAlert: true, birthdateInputErrorMsg: "Please enter your date of birth." });
      }
    } else if (this.state.step === 2) {
      const isEmailValid = /.+@.+\..+/.test(this.state.email);
      const pwd = await this.validatePassword(this.state.password);
      if (isEmailValid === true && pwd.error === false) {
        var temp = this.state.birthdate;
        const dob = temp.slice(4, 8) + "-" + temp.slice(0, 2) + "-" + temp.slice(2, 4);
        this.setState({ isActive: true, showingAlert: false });
        this.props.requestSignup(this.state.email, this.state.password, this.state.location, dob);
      } else {
        if (isEmailValid === false) {
          this.setState({ emailBoxBorder: "2px red solid", showingAlert: true, emailBoxErrorMsg: "Please enter a valid email." });
        }
        if (pwd.error === true) {
          this.setState({ passwordBoxBorder: "2px red solid", showingAlert: true, passwordErrorMsg: pwd.message });
        }
      }
    }
  }
  onStateChange(e) {
    this.setState({ location: e.target.value, stateListBorder: "1px solid #001246" });
  }
  onAgree(e) {
    if (this.state.agreed === false) this.setState({ agreedCheckBoxBorder: "#000 1px solid" });
    this.setState({ agreed: !this.state.agreed });
  }
  getFormat() {
    var temp = this.state.birthdate;
    // if (temp.length < 2) return this.state.birthdate;
    // if (temp.length < 4) return temp.slice(0, 2) + "-" + temp.slice(2, 4);
    // return temp.slice(0, 2) + "-" + temp.slice(2, 4) + "-" + temp.slice(4, 8);
    return temp;
  }
  onBirthdateChange(e) {
    var temp = e.target.value;
    temp = temp.replace(/-/g, "");
    var isnum = /^\d+$/.test(temp);
    if (isnum === false) return;
    this.setState({ birthdate: temp, birthdateInputBorder: "1px solid #001246" });
  }
  onEmailChange(e) {
    this.setState({ email: e.target.value, emailBoxBorder: "1px solid #001246" });
  }
  onPasswordChange(e) {
    this.setState({ password: e.target.value, passwordBoxBorder: "1px solid #001246" });
  }
  onPasswordShowIcon() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  render() {
    if (this.state.surveyType !== "ed" && this.state.surveyType !== "hairloss") {
      if (this.state.surveyType === undefined) return <SelectType />;
      return <Redirect to='/' />;
    }
    return (
      <LoadingOverlay
        active={this.state.isActive}
        spinner
        styles={{
          wrapper: {
            height: "100vh",
            overflow: "scroll"
          }
        }}>
        <div>
          {this.props.loggedIn === true && <Redirect to={"/verify/" + this.state.surveyType} />}
          <div className='alert alert-danger alert-dismissible online-visit-alert' role='alert' style={{ display: this.state.showingAlert === true ? "" : "none" }}>
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
                <ProgressMeter type={this.state.surveyType} currentStep={0} title={"Consultation"} />
                <div className='steps-content-wrap' style={{ height: "100%" }}>
                  <div className='form-headline-container'>
                    <h2 className='form-sub-headline'>
                      <img className='headline-winky' src={HeadlineWinky} alt='HeadlineWinky' />
                      Start Your Free Online Visit!
                    </h2>
                  </div>
                  <div className='clipboard-container'>
                    <img src={ClipBoardTopDesktop} alt='ClipBoardTopDesktop' />
                    <div className='clipboard-left'>
                      <img src={ClipBoardLeftDesktop} alt='ClipBoardLeftDesktop' />
                    </div>
                    <div className='clipboard-content'>
                      <section id='state' style={{ display: this.state.step === 0 ? "" : "none" }}>
                        <label className='form-label font-lg form-tag-line' style={{ color: "rosybrown" }}>
                          Let's get ready to RIZE!
                        </label>
                        <div className='max-600'>
                          <div className='form-group text-center' style={{ marginTop: "5px", marginBottom: "0px" }}>
                            <span className='btn btn-sm btn-empty-white' style={{ width: "100%" }}>
                              <br />
                            </span>
                          </div>
                          <h1 className='form-headline'>Get hard and stay hard &mdash; on your terms</h1>
                        </div>
                        <div className='max-600 mb-5'>
                          <label className='form-label font-lg'>We need to make sure we are licensed in your state.</label>
                          <div
                            className='error-msg'
                            style={{
                              display: this.state.stateListBorder === "1px solid #001246" ? "none" : ""
                            }}>
                            {this.state.stateErrorMsg}
                          </div>
                          <div className='form-group form-group-inline mb-3 align-items-center'>
                            <div className='field-wrap date' style={{ border: this.state.stateListBorder }}>
                              <select className='chosen-select form-control' data-width='100%' onChange={e => this.onStateChange(e)}>
                                {this.statesList()}
                              </select>
                            </div>
                          </div>
                          <div
                            className='error-msg'
                            style={{
                              display: this.state.agreedCheckBoxBorder === "2px red solid" ? "" : "none"
                            }}>
                            Please agree to the Terms and Conditions, Privacy Policy, Privacy Practices and Telehealth Consent.
                          </div>
                          <label className='check-item'>
                            <input type='checkbox' checked={this.state.agreed} onChange={e => this.onAgree(e)} />
                            <span className='checkmark' style={{ border: this.state.agreedCheckBoxBorder }}>
                              <i className='fa fa-check'></i>
                            </span>
                            <span className='check-item-name'>
                              I agree to the{" "}
                              <a href={mainWebsite + "/#/terms_and_conditions"} target='_blank' rel='noopener noreferrer'>
                                Terms and Conditions
                              </a>
                              ,{" "}
                              <a href={mainWebsite + "/#/privacy_policy"} target='_blank' rel='noopener noreferrer'>
                                Privacy Policy
                              </a>
                              ,{" "}
                              <a href={mainWebsite + "/#/privacy_practices"} target='_blank' rel='noopener noreferrer'>
                                Privacy Practices
                              </a>{" "}
                              and{" "}
                              <a href={mainWebsite + "/#/telehealth_consent"} target='_blank' rel='noopener noreferrer'>
                                Telehealth Consent
                              </a>
                              .
                            </span>
                          </label>
                        </div>
                        <div className='max-600 form-group mb-5 text-center'>
                          <span className='btn btn-sm btn-secondary' style={{ width: "100%" }} onClick={e => this.onButtonClick(e)}>
                            Continue
                          </span>
                        </div>
                        <div className='max-600 text-center'>
                          Already have an account? <span style={{ color: "rosybrown" }}>Sign in</span>
                        </div>
                      </section>

                      <section id='birthdate' style={{ display: this.state.step === 1 ? "" : "none" }}>
                        <label className='form-label font-lg form-tag-line' style={{ color: "rosybrown" }}>
                          Great!
                        </label>
                        <div className='max-600'>
                          <div className='form-group text-center' style={{ marginTop: "5px", marginBottom: "0px" }}>
                            <span className='btn btn-sm btn-empty-white' style={{ width: "100%" }}>
                              <br />
                            </span>
                          </div>
                          <h1 className='form-headline'>We are licensed in your state!</h1>
                        </div>
                        <div className='max-600 mb-5'>
                          <label className='form-label font-lg'>Next, enter your date of birth.</label>
                          <div
                            className='error-msg'
                            style={{
                              display: this.state.birthdateInputBorder === "1px solid #001246" ? "none" : ""
                            }}>
                            {this.state.birthdateInputErrorMsg}
                          </div>
                          <div className='form-group form-group-inline mb-3 align-items-center'>
                            <div className='field-wrap' style={{ border: this.state.birthdateInputBorder }}>
                              <MaskedInput className='form-control' mask={[/[0-1]/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]} placeholder='MM-DD-YYYY' value={this.getFormat()} onChange={e => this.onBirthdateChange(e)} />
                            </div>
                          </div>
                          <div className='max-600 form-group mb-5 text-center'>
                            <span className='btn btn-sm btn-secondary' style={{ width: "100%" }} onClick={e => this.onButtonClick(e)}>
                              Continue
                            </span>
                          </div>
                        </div>
                      </section>

                      <section id='profile' style={{ display: this.state.step === 2 ? "" : "none" }}>
                        <label className='form-label font-lg form-tag-line' style={{ color: "rosybrown" }}>
                          You are eligible for treatment.
                        </label>
                        <div className='max-600'>
                          <div className='form-group text-center' style={{ marginTop: "5px", marginBottom: "0px" }}>
                            <span className='btn btn-sm btn-empty-white' style={{ width: "100%" }}>
                              <br />
                            </span>
                          </div>
                          <h1 className='form-headline'>Start your online visit now!</h1>
                        </div>
                        <div className='max-600 mb-5'>
                          <label className='form-label font-lg'>On the following screens, you will complete your online evaluation by answering questions about your health, medical history and lifestyle.</label>
                          <label className='form-label font-lg'>Once submitted, your doctor will review your information and determine if a prescription treatment is right for you.</label>
                          <div
                            className='error-msg'
                            style={{
                              display: this.state.emailBoxBorder === "2px red solid" ? "" : "none"
                            }}>
                            {this.state.emailBoxErrorMsg}
                          </div>
                          <div className='form-group form-group-inline mb-3 align-items-center'>
                            <div className='field-wrap' style={{ border: this.state.emailBoxBorder }}>
                              <input type='text' className='form-control' placeholder='Email Address' value={this.state.email} onChange={e => this.onEmailChange(e)} />
                            </div>
                          </div>
                          <div
                            className='error-msg'
                            style={{
                              display: this.state.passwordBoxBorder === "2px red solid" ? "" : "none"
                            }}>
                            {this.state.passwordErrorMsg}
                          </div>
                          <div className='form-group form-group-inline mb-3 align-items-center'>
                            <div className='field-wrap' style={{ border: this.state.passwordBoxBorder }}>
                              <input type={this.state.showPassword === true ? "text" : "password"} className='form-control' placeholder='Create Password' value={this.state.password} onChange={e => this.onPasswordChange(e)} />
                              <i className={this.state.showPassword === false ? "fa fa-eye field-icon" : "fa fa-eye-slash field-icon"} onClick={() => this.onPasswordShowIcon()}></i>
                            </div>
                          </div>
                          <div className='max-600 form-group mb-5 text-center'>
                            <span className='btn btn-sm btn-secondary' style={{ width: "100%" }} onClick={e => this.onButtonClick(e)}>
                              Start My Free Visit
                            </span>
                          </div>
                        </div>
                      </section>

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
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.usersReducer.loggedIn,
  error: state.usersReducer.error,
  errorCode: state.usersReducer.errorCode,
  errMsg: state.usersReducer.errMsg
});

const mapDispatchToProps = dispatch => ({
  requestSignup: (email, password, zip, dob) => dispatch(requestSignup(email, password, zip, dob)),
  removeErrMsg: () => dispatch(removeErrMsg())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
