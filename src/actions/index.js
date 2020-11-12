import * as everything from "../constants";

export function requestSignup(email, password, zip, dob) {
  return {
    type: everything.REQUEST_SIGNUP,
    email,
    password,
    zip,
    dob
  };
}

export function successSignup() {
  return { type: everything.SUCCESS_SIGNUP };
}

export function failedSignup(errorCode, errMsg) {
  return { type: everything.FAILED_SIGNUP, errorCode, errMsg };
}

export function removeErrMsg() {
  return { type: everything.REMOVE_ERROR_MSG };
}

export function verifyUser(code) {
  return { type: everything.VERIFY_USER, code };
}

export function verifySuccess() {
  return { type: everything.VERIFY_SUCCESS };
}

export function verifyFail() {
  return { type: everything.VERIFY_FAILED };
}

export function verifyClear() {
  return { type: everything.VERIFY_CLEAR };
}

export function setQuestion(question) {
  return { type: everything.SET_QUESTION, question };
}

export function setQuestionID(questionID) {
  return { type: everything.SET_QUESTION_ID, questionID };
}

export function setSurveyIsFinished(value) {
  return { type: everything.SET_SURVEY_IS_FINISHED, value };
}

export function setAllergy(allergy) {
  return { type: everything.SET_ALLERGY, allergy };
}

export function getAllergySaga(keyword) {
  return { type: everything.GET_ALLERGY_SAGA, keyword };
}

export function setMedication(medication) {
  return { type: everything.SET_MEDICATION, medication };
}

export function getMedicationSaga(keyword) {
  return { type: everything.GET_MEDICATION_SAGA, keyword };
}

export function postAnswer(answer) {
  return { type: everything.POST_ANSWER, answer };
}

export function postAnswerError(errMsg) {
  return { type: everything.POST_ANSWER_ERROR, errMsg };
}

export function postAnswerSuccess() {
  return { type: everything.POST_ANSWER_SUCCESS };
}

export function getFirstQuestion(surveyType) {
  return { type: everything.GET_FIRST_QUESTION, surveyType };
}

export function getPrevQuestion(id) {
  return { type: everything.GET_PREV_QUESTION, id };
}

export function setQuestionCount(x) {
  return { type: everything.SET_QUESTION_COUNT, x };
}

export function setTreatment(treatment) {
  return { type: everything.SET_TREATMENT, treatment };
}

export function getTreatment(surveyType) {
  return { type: everything.GET_TREATMENT_SAGA, surveyType };
}

export function createSubscription(offerID) {
  return { type: everything.CREATE_SUBSCRIPTION, offerID };
}

export function getSummary(summary) {
  return { type: everything.GET_SUMMARY, summary };
}

export function putSummary(summary) {
  return { type: everything.PUT_SUMMARY, summary };
}

export function putSummaryError() {
  return { type: everything.PUT_SUMMARY_ERROR };
}

export function putSummarySuccess() {
  return { type: everything.PUT_SUMMARY_SUCCESS };
}
