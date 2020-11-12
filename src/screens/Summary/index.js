import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProgressMeter from "../../Components/ProgressMeter";
import Treatment from "./treatment";
import Account from "./account";
import Shipping from "./shipping";
import Billing from "./billing";

import { putSummary } from "../../actions";

import { ClipBoardTopDesktop } from "../../constants";
import { ClipBoardLeftDesktop } from "../../constants";
import { ClipBoardRightDesktop } from "../../constants";
import { ClipBoardBotDesktop } from "../../constants";
import { ClipBoardRizeLogo } from "../../constants";

import "../../assets/css/onlinevisit_custom.css";

function Summary(props) {
  const [step, setStep] = useState(0);
  const [account_details, setAccount] = useState(null);
  const [accountEdited, setAccountEdited] = useState(false);
  const [address, setAddress] = useState(null);
  const [addressEdited, setAddressEdited] = useState(false);
  const [payment_method, setPayment] = useState(null);
  const [billingEdited, setBillingEdited] = useState(false);
  const [phone_number, setPhoneNumber] = useState(null);

  useEffect(() => {
    if (props.isError === false) {
      props.history.push("/congratulation");
    } // eslint-disable-next-line
  }, [props.isError]);
  const onSubmit = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      if (account_details?.name_first && account_details?.name_last) {
        setStep(2);
      } else {
        setAccountEdited(true);
      }
    } else if (step === 2) {
      if (address?.name && address?.lines[0] && address?.city && address?.zip && phone_number) {
        setStep(3);
      } else {
        setAddressEdited(true);
      }
    } else if (step === 3) {
      if (payment_method?.holder_name && payment_method?.number && payment_method?.ccv && payment_method?.expire_month && payment_method?.expire_year && payment_method?.zip) {
        props.putSummary({ account_details, address, payment_method });
      } else {
        setBillingEdited(true);
      }
    }
  };
  const onAccountChange = data => {
    setAccount(data);
  };
  const onAddressChange = data => {
    setAddress(data);
  };
  const onPaymentChange = data => {
    setPayment(data);
  };
  const onPhoneNumberChange = data => {
    setPhoneNumber(data);
  };

  if (props.summary === undefined) return <div />;
  return (
    <div>
      <div className='py-5'>
        <div className='container'>
          <div className='vertical-steps-wrap clearfix'>
            <ProgressMeter type={sessionStorage.getItem("surveyType")} currentStep={4} title={"Complete Your Purchase"} />
            <div className='steps-content-wrap' style={{ height: "100%" }}>
              <div className='clipboard-container'>
                <img src={ClipBoardTopDesktop} alt='ClipBoardTopDesktop' />
                <div className='clipboard-left'>
                  <img src={ClipBoardLeftDesktop} alt='ClipBoardLeftDesktop' />
                </div>
                <div className='clipboard-content'>
                  <label className='form-label font-lg form-tag-line' style={{ color: "rosybrown" }}>
                    Online Visit Summary
                  </label>
                  <div className='max-600'>
                    <div className='form-group text-center' style={{ marginTop: "5px", marginBottom: "0px" }}>
                      <span className='btn btn-sm btn-empty-white' style={{ width: "100%" }}>
                        <br />
                      </span>
                    </div>
                    {step === 0 && <Treatment data={props.summary.offerings[0]} />}
                    {step === 1 && <Account data={props.summary.account_details} onDataChange={data => onAccountChange(data)} edited={accountEdited} />}
                    {step === 2 && <Shipping data={props.summary.address} onDataChange={data => onAddressChange(data)} onPhoneNumberChange={data => onPhoneNumberChange(data)} edited={addressEdited} />}
                    {step === 3 && <Billing data={props.summary.payment_method} onDataChange={data => onPaymentChange(data)} edited={billingEdited} />}
                    <p className='mt-5' style={{ display: "flex", justifyContent: "flex-end" }}>
                      <span className='btn btn-sm btn-primary' onClick={onSubmit}>
                        Next <i className='fa fa-angle-right' />{" "}
                      </span>
                    </p>
                    <div style={{ margin: "20px auto 30px auto", textAlign: "center" }}>
                      <img src={ClipBoardRizeLogo} alt='Rize' style={{ width: "76px", height: "32px", border: "0" }} />
                    </div>
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
  summary: state.summaryReducer.summary,
  isError: state.summaryReducer.isError
});
const mapDispatchToProps = dispatch => ({
  putSummary: summary => dispatch(putSummary(summary))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Summary));
