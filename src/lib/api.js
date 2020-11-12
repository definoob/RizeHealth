import axios from "axios";
import { baseURL } from "../Config";

export async function signup(email, password, zip, dob) {
  try {
    await axios.post(
      baseURL + "new_user_0",
      {
        username: email,
        password,
        state: zip,
        dob
      },
      { withCredentials: true }
    );
  } catch (error) {
    return { error: true, errorCode: error.response.data.error_code, errMsg: error.response.data.message };
  }
  return { error: false };
}

export async function verify(code) {
  let resp;
  try {
    resp = await axios.post(baseURL + "verify", { code: code }, { withCredentials: true });
    resp = resp.data.error;
  } catch (e) {
    resp = e.response;
  }
  return resp;
}

export async function getFirstQuestion(params) {
  const link = baseURL + "first_question?list=" + params;
  const firstQuestion = await axios.get(link, { withCredentials: true }).then(resp => {
    return resp.data.payload;
  });
  return firstQuestion;
}

export async function getPrevQuestion(id) {
  const link = baseURL + "previous_question?id=" + id;
  const prevQ = await axios.get(link, { withCredentials: true }).then(resp => {
    return resp.data.payload;
  });
  return prevQ;
}

export async function getAllergy(params) {
  const link = baseURL + "search_medication_allergies?limit=10&search=" + params.keyword;
  const resp = await axios.get(link, { withCredentials: true });
  return resp.data.payload;
}

export async function getMedication(params) {
  const link = baseURL + "search_medications?limit=10&search=" + params.keyword;
  const resp = await axios.get(link, { withCredentials: true });
  return resp.data.payload;
}

export async function getTreatment(type) {
  const { surveyType } = type;
  const link = baseURL + "products?list=" + surveyType;
  const resp = await axios.get(link, { withCredentials: true });
  return resp.data.payload.offerings;
}

export async function uploadFile(fileData) {
  const link = baseURL + "file";
  return await axios
    .post(link, { fileData }, { withCredentials: true })
    .then(resp => {
      return resp.data.payload.created_id;
    })
    .catch(e => {});
}

async function postPatientAllergy(allergy_id, reaction) {
  const link = baseURL + "patient_allergy";
  const body = {
    allergy_id,
    reaction
  };
  return await axios.post(link, body, { withCredentials: true }).then(resp => {
    return resp.data.payload.created_id;
  });
}

async function postPatientMedication(medication_id, comment) {
  const link = baseURL + "patient_medication";
  const body = {
    medication_id,
    comment
  };
  return await axios.post(link, body, { withCredentials: true }).then(resp => {
    return resp.data.payload.created_id;
  });
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    if (array[index] !== undefined) {
      await callback(array[index], index, array);
    }
  }
}

export async function setPatientDetails(id_image, face_image) {
  const link = baseURL + "patient_details";
  const res = await axios
    .post(
      link,
      {
        id_image,
        face_image
      },
      { withCredentials: true }
    )
    .then(res => res);
  return res;
}

export async function createSubscription(data) {
  const { offerID } = data;
  const link = baseURL + "summary?subscription_offering_id=" + offerID;
  const resp = await axios.get(link, { withCredentials: true });
  return resp.data.payload;
}

export async function putSummary(data) {
  const link = baseURL + "summary";
  const res = await axios.put(link, data.summary, { withCredentials: true });
  return res;
}

export async function postAnswer(answer) {
  let resp = "";
  let nextQuestion;
  let body = [];
  // generate question body
  // answer object is an array of questions responses with questionID, questionType, and answerObject.
  // Try console to see what you get from the `answer` object.
  var temp;
  await asyncForEach(answer, async element => {
    switch (element.qType) {
      case "TextInput":
        temp = {
          question_id: element.qID,
          text_answer: element.data.text
        };
        body.push(temp);
        break;
      case "Cascade":
        element.data.selectedID.forEach((eachQuestion, index) => {
          if (eachQuestion === true) {
            temp = {
              question_id: element.qID,
              answer_id: index + 1
            };
            body.push(temp);
            if (element.data.questionIDs[index] !== -1) {
              temp = {
                question_id: element.data.questionIDs[index],
                answer_id: element.data.contentID[index] + 1
              };
              body.push(temp);
            }
          }
        });
        break;
      case "Medication":
        await asyncForEach(element.data.medicationList, async (eachMedication, index) => {
          const medication_id = await postPatientMedication(eachMedication.value, element.data.reactionList[index]);
          temp = { question_id: element.qID, medication_id };
          body.push(temp);
        });
        break;
      case "Allergy":
        await asyncForEach(element.data.allergyList, async (eachAllergy, index) => {
          const patient_allergy_id = await postPatientAllergy(eachAllergy.value, element.data.reactionList[index]);
          temp = {
            question_id: element.qID,
            patient_allergy_id
          };
          body.push(temp);
        });
        break;
      case "Image":
        const id = await uploadFile(element.data.imgData);
        temp = {
          question_id: element.qID,
          file_id: parseInt(id)
        };
        body.push(temp);
        break;
      case "RadioButton":
        temp = {
          question_id: element.qID,
          answer_id: parseInt(element.data.selectedOption)
        };
        body.push(temp);
        break;
      case "YesNoButton":
      case "ControlDisplay_Yesno":
        if (element.data.selected === 1) {
          temp = {
            question_id: element.qID,
            answer_id: parseInt(element.data.selected)
          };
        } else if (element.data.selected === 2) {
          if (element.data.moreInfo === "" || element.data.moreInfo === null) {
            temp = {
              question_id: element.qID,
              answer_id: parseInt(element.data.selected)
            };
          } else {
            temp = {
              question_id: element.qID,
              answer_id: parseInt(element.data.selected),
              text_answer: element.data.moreInfo
            };
          }
        }
        body.push(temp);
        break;
      case "CheckButton":
        element.data.selectedOptions.forEach((checkedOption, index) => {
          if (checkedOption === true) {
            if (element.data.moreInfo[index] !== "") {
              temp = {
                question_id: element.qID,
                answer_id: parseInt(index) + 1,
                text_answer: element.data.moreInfo[index]
              };
            } else {
              temp = {
                question_id: element.qID,
                answer_id: parseInt(index) + 1
              };
            }
            body.push(temp);
          }
        });
        break;
      default:
        break;
    }
  });
  var axiosOption = {
    method: "POST",
    url: baseURL + "question_responses",
    data: body,
    json: true,
    withCredentials: true
  };
  try {
    resp = await axios(axiosOption);
    nextQuestion = resp.data.payload;
    if (nextQuestion.question === undefined) nextQuestion = { finished: true };
  } catch (e) {
    nextQuestion = e.response.data;
  }
  return nextQuestion;
}
