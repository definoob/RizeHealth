import React, { useState, useRef } from "react";
import ProgressMeter from "../../Components/ProgressMeter";
import Modal from "./Modal";
import { uploadFile, setPatientDetails } from "../../lib/api";

import { ClipBoardTopDesktop } from "../../constants";
import { ClipBoardLeftDesktop } from "../../constants";
import { ClipBoardRightDesktop } from "../../constants";
import { ClipBoardBotDesktop } from "../../constants";
import { ClipBoardRizeLogo } from "../../constants";

import "../../assets/css/onlinevisit_custom.css";

function IDVerification(props) {
  const [idPhoto, setIDPhoto] = useState("https://s3.us-east-2.amazonaws.com/assets.growhppy.com/images/online_visit/holder_license.png");
  const [facePhoto, setFacePhoto] = useState("https://s3.us-east-2.amazonaws.com/assets.growhppy.com/images/online_visit/holder_front_face.png");
  const [isShowing, setIsShowing] = useState(false);
  const [isShowing1, setIsShowing1] = useState(false);
  const [step, setStep] = useState(0); // 0 - id photo upload, 1 - id photo confirm, 2 - face upload, 3 - face confirm
  const inputFile = useRef(null);
  const inputFile1 = useRef(null);

  const onFileChange = event => {
    if (event.target.files && event.target.files[0]) {
      var temp = URL.createObjectURL(event.target.files[0]);
      setIDPhoto(temp);
      setStep(1);
    }
  };
  const onFileChange1 = event => {
    if (event.target.files && event.target.files[0]) {
      var temp = URL.createObjectURL(event.target.files[0]);
      setFacePhoto(temp);
      setStep(3);
    }
  };
  const onGetScreenshot = data => {
    setIDPhoto(data);
    setStep(1);
  };
  const onGetScreenshot1 = data => {
    setFacePhoto(data);
    setStep(3);
  };
  const submit = async () => {
    let id = await uploadFile(idPhoto).then(res => res);
    let face = await uploadFile(facePhoto).then(res => res);
    const p = await setPatientDetails(id, face);
    if (p.data.error === false) props.history.push("/summary");
  };
  return (
    <div>
      <div className='py-5'>
        <div className='container'>
          <div className='vertical-steps-wrap clearfix'>
            <ProgressMeter type={sessionStorage.surveyType} currentStep={4} title={"Complete Your Purchase"} />
            <div className='steps-content-wrap' style={{ height: "100%" }}>
              <div className='clipboard-container'>
                <img src={ClipBoardTopDesktop} alt='ClipBoardTopDesktop' />
                <div className='clipboard-left'>
                  <img src={ClipBoardLeftDesktop} alt='ClipBoardLeftDesktop' />
                </div>
                <div className='clipboard-content'>
                  <div className='mb-5'>
                    <div className='max-600'>
                      <div className='form-group text-center' style={{ marginTop: "20px", marginBottom: "28px" }}>
                        <span className='btn btn-sm btn-empty-white' style={{ width: "100%" }}>
                          <br />
                        </span>
                      </div>
                      <section style={{ display: step === 0 ? "" : "none" }}>
                        <div>
                          <p className='h1 font-weight-bold text-blue mb-4'>Upload a photo of your ID</p>
                        </div>
                        <label className='form-label font-lg'>To legally prescribe medication, your doctor needs a photo of your driver's license or passport.</label>
                        <div className='history-list'>
                          <div className='history-item clearfix'>
                            <div className='thumb' style={{ position: "relative" }}>
                              <img src={idPhoto} alt='' style={{ width: "236px", height: "226px", opacity: 0.4 }} />
                            </div>
                            <div className='history-details'>
                              <h5>{props.title}</h5>
                              <p>{props.details}</p>
                              <p className='btn btn-sm btn-primary' onClick={() => inputFile.current.click()}>
                                <i className='fa fa-upload' /> Select Photo
                              </p>
                              <br />
                              <p className='btn btn-sm btn-primary' onClick={() => setIsShowing(true)}>
                                <i className='fa fa-camera' /> Take Photo
                              </p>
                            </div>
                          </div>
                          <input type='file' ref={inputFile} style={{ display: "none" }} onChange={e => onFileChange(e)} accept='image/png, image/jpeg' />
                          <Modal show={isShowing} close={() => setIsShowing(false)} onGetScreenshot={onGetScreenshot} />
                        </div>
                      </section>
                      <section style={{ display: step === 1 ? "" : "none" }}>
                        <div>
                          <p className='h1 font-weight-bold text-blue mb-4'>Review and confirm photo of your ID</p>
                        </div>
                        <label className='form-label font-lg'>To legally prescribe medication, your doctor needs a photo of your driver's license or passport.</label>
                        <div className='history-list'>
                          <div className='history-item clearfix'>
                            <div className='thumb' style={{ position: "relative" }}>
                              <img src={idPhoto} alt='' style={{ width: "236px", height: "226px" }} />
                            </div>
                            <div className='history-details'>
                              <h5>{props.title}</h5>
                              <p>{props.details}</p>
                              <p className='btn btn-sm btn-primary' onClick={() => setStep(0)}>
                                Retake
                              </p>
                              <br />
                              <p className='btn btn-sm btn-primary' onClick={() => setStep(2)}>
                                Confirm
                              </p>
                            </div>
                          </div>
                        </div>
                        <label className='form-label font-lg'>Ensure that...</label>
                        <p>&#10003; The photo is not blurry or dark</p>
                        <p>&#10003; Your ID is not cutoff</p>
                        <p>&#10003; Your ID is government issued and not expired</p>
                      </section>
                      <section style={{ display: step === 2 ? "" : "none" }}>
                        <div>
                          <p className='h1 font-weight-bold text-blue mb-4'>Upload a photo of your face</p>
                        </div>
                        <label className='form-label font-lg'>To legally prescribe medication, your doctor needs a photo of your face</label>
                        <div className='history-list'>
                          <div className='history-item clearfix'>
                            <div className='thumb' style={{ position: "relative" }}>
                              <img src={facePhoto} alt='' style={{ width: "236px", height: "226px", opacity: "0.4" }} />
                            </div>
                            <div className='history-details'>
                              <h5>{props.title}</h5>
                              <p>{props.details}</p>
                              <p className='btn btn-sm btn-primary' onClick={() => inputFile1.current.click()}>
                                <i className='fa fa-upload' /> Select Photo
                              </p>
                              <br />
                              <p className='btn btn-sm btn-primary' onClick={() => setIsShowing1(true)}>
                                <i className='fa fa-camera' /> Take Photo
                              </p>
                            </div>
                          </div>
                          <input type='file' ref={inputFile1} style={{ display: "none" }} onChange={e => onFileChange1(e)} accept='image/png, image/jpeg' />
                          <Modal show={isShowing1} close={() => setIsShowing1(false)} onGetScreenshot={onGetScreenshot1} />
                        </div>
                      </section>
                      <section style={{ display: step === 3 ? "" : "none" }}>
                        <div>
                          <p className='h1 font-weight-bold text-blue mb-4'>Review and confirm photo of your face</p>
                        </div>
                        <label className='form-label font-lg'>To legally prescribe medication, your doctor needs a photo of your face.</label>
                        <div className='history-list'>
                          <div className='history-item clearfix'>
                            <div className='thumb' style={{ position: "relative" }}>
                              <img src={facePhoto} alt='' style={{ width: "236px", height: "226px" }} />
                            </div>
                            <div className='history-details'>
                              <h5>{props.title}</h5>
                              <p>{props.details}</p>
                              <p className='btn btn-sm btn-primary' onClick={() => setStep(2)}>
                                Retake
                              </p>
                              <br />
                              <p className='btn btn-sm btn-primary' onClick={() => submit()}>
                                Confirm
                              </p>
                            </div>
                          </div>
                        </div>
                        <label className='form-label font-lg'>Ensure that...</label>
                        <p>&#10003; The photo is not blurry or dark</p>
                        <p>&#10003; You are the only person in your photo</p>
                        <p>&#10003; The photo has not been edited/filtered</p>
                        <p>&#10003; The photo was taken within the past 30 days</p>
                        <p>&#10003; You are not covering your face</p>
                      </section>
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

export default IDVerification;
