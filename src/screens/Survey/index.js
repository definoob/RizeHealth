import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { postAnswer, getFirstQuestion, getPrevQuestion, setQuestionCount } from "../../actions";
import ProgressMeter from "../../Components/ProgressMeter";
import RadioButton from "../../Components/RadioButton";
import CheckButton from "../../Components/CheckButton";
import YesNoButton from "../../Components/YesNoButton";
import ImageComponent from "../../Components/Image";
import Allergy from "../../Components/Allergy";
import TextInput from "../../Components/TextInput";
import Medication from "../../Components/Medication";
import Cascade from "../../Components/Cascade";
import ErrPage from "./errorpage";

import { ClipBoardTopDesktop } from "../../constants";
import { ClipBoardLeftDesktop } from "../../constants";
import { ClipBoardRightDesktop } from "../../constants";
import { ClipBoardBotDesktop } from "../../constants";
import { ClipBoardRizeLogo } from "../../constants";

import "../../assets/css/onlinevisit_custom.css";

class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: new Array(5), isAnswered: false };
    this.question = "";
    this.questionType = "";
    this.surveyType = "";
    this.onSubmit = this.onSubmit.bind(this);
    this.onBackSubmit = this.onBackSubmit.bind(this);
  }
  componentDidMount() {
    const {
      match: {
        params: { type }
      }
    } = this.props;
    this.surveyType = type;
    this.props.getFirstQuestion(type);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isAnswered === false) {
      window.scrollTo(0, 0);
    }
    if (this.props.isFinished === true) {
      if (this.surveyType === "hairloss") this.props.history.push("/disclaimer");
      else this.props.history.push("/treatment_preference/" + this.surveyType);
    }
  }
  onChange(data, id, qID, qType, flag) {
    var temp = this.state.data;
    temp[id] = { qID, qType, data };
    this.setState({ ...this.state, data: temp, isAnswered: true });
    if (flag === false) {
      this.props.postAnswer(temp);
      this.props.setQuestionCount(this.props.questionCount + 1);
      this.setState({ data: new Array(5), isAnswered: false });
    }
  }
  onSubmit() {
    if (this.state.isAnswered !== false) {
      this.props.postAnswer(this.state.data);
      this.props.setQuestionCount(this.props.questionCount + 1);
      this.setState({ data: new Array(5), isAnswered: false });
    }
  }
  onBackSubmit() {
    this.props.setQuestionCount(this.props.questionCount - 1);
    this.props.getPrevQuestion(this.props.questionID);
  }
  QuestionType(question) {
    if (question.questions !== undefined) {
      if (question.display_hint === "controldisplay") return "ControlDisplay";
      return "GroupQuestion";
    }
    if (question.image === true) return "Image";
    if (question.freeform === true) return "TextInput";
    if (question.allergy === true) return "Allergy";
    if (question.medication === true) return "Medication";
    if (question.options !== null) {
      if (question.display_hint === "cascade") return "Cascade";
      if (question.display_hint === "yesno") return "YesNoButton";
      if (question.display_hint === "controldisplay") return "ControlDisplay_Yesno";
      if (question.allowmultiple === true) return "CheckButton";
      if (question.allowmultiple === false) return "RadioButton";
    }
  }
  QuestionBodyGenerator(question, elementID, responses) {
    var resp = [];
    if (responses !== undefined) {
      resp = Object.values(
        responses.reduce((acc, cur) => {
          if (!acc[cur.question_id]) {
            acc[cur.question_id] = [];
          }
          acc[cur.question_id].push(cur);
          return acc;
        }, {})
      );
    }

    const qType = this.QuestionType(question);
    const props = { key: question.id, title: question.text, id: elementID, qID: question.id, qType, details: question.details, onChange: (data, id, qID, qType) => this.onChange(data, id, qID, qType) };
    let temp = [];
    switch (qType) {
      case "ControlDisplay":
        question.questions.forEach((element, key) => {
          if (key === 0) temp.push(this.QuestionBodyGenerator(element, key, resp[key]));
          if (key > 0 && this.state.data[0] && this.state.data[0].data.selected === 2) temp.push(this.QuestionBodyGenerator(element, key, resp[key]));
        });
        return (
          <React.Fragment>
            <h4 className='step-title'>{question.text}</h4>
            <p className='h5 mb-4'>{question.details}</p>
            {temp}
          </React.Fragment>
        );
      case "GroupQuestion":
        question.questions.forEach((element, key) => {
          temp.push(this.QuestionBodyGenerator(element, key, resp[key]));
        });
        return (
          <React.Fragment>
            <h4 className='step-title'>{question.text}</h4>
            <p className='h5 mb-4'>{question.details}</p>
            {temp}
          </React.Fragment>
        );
      case "Image":
        return <ImageComponent {...props} resp={responses} placeholder={question.placeholder_image_url} />;
      case "TextInput":
        return <TextInput {...props} resp={responses} />;
      case "Allergy":
        return <Allergy {...props} resp={responses} />;
      case "Medication":
        return <Medication {...props} resp={responses} />;
      case "Cascade":
        return <Cascade {...props} options={question.options} resp={responses} />;
      case "YesNoButton":
      case "ControlDisplay_Yesno":
        return (
          <YesNoButton
            key={question.id}
            title={question.text}
            id={elementID}
            qID={question.id}
            qType={qType}
            details={question.details}
            onChange={(data, id, qID, qType, flag) => this.onChange(data, id, qID, qType, flag)}
            options={question.options}
            resp={responses}
          />
        );
      case "CheckButton":
        return <CheckButton {...props} options={question.options} resp={responses} />;
      case "RadioButton":
        return (
          <RadioButton
            key={question.id}
            title={question.text}
            id={elementID}
            qID={question.id}
            qType={qType}
            details={question.details}
            onChange={(data, id, qID, qType, flag) => this.onChange(data, id, qID, qType, flag)}
            options={question.options}
            resp={responses}
          />
        );
      default:
        return <div />;
    }
  }
  render() {
    if (!this.props.question.question) return <div />;
    let progressStep = this.question.short_text === "Medical History" ? 2 : this.question.short_text === "Treatment" ? 3 : 1;
    this.resp = this.props.question.responses;
    this.question = this.props.question.question;
    this.questionType = this.QuestionType(this.question);
    if (this.props.isError === true) {
      return <ErrPage type={this.surveyType} currentStep={progressStep} />;
    }
    return (
      <div>
        <div className='py-5'>
          <div className='container'>
            <div className='vertical-steps-wrap clearfix'>
              <ProgressMeter type={this.surveyType} currentStep={progressStep} title={"Question " + this.question.progress_text} />
              <div className='steps-content-wrap' style={{ height: "100%" }}>
                <div className='clipboard-container'>
                  <img src={ClipBoardTopDesktop} alt='ClipBoardTopDesktop' />
                  <div className='clipboard-left'>
                    <img src={ClipBoardLeftDesktop} alt='ClipBoardLeftDesktop' />
                  </div>
                  <div className='clipboard-content'>
                    <label className='form-label font-lg form-tag-line' style={{ color: "rosybrown" }}>
                      {this.question.progress_text}
                    </label>
                    <div className='max-600'>
                      <div className='form-group text-center' style={{ marginTop: "5px", marginBottom: "0px" }}>
                        <span className='btn btn-sm btn-empty-white' style={{ width: "100%" }}>
                          <br />
                        </span>
                      </div>
                      <div className='mb-5'>{this.QuestionBodyGenerator(this.question, 0, this.resp)}</div>
                      <div className='form-group mb-5' style={{ display: "flex", justifyContent: this.props.questionCount > 1 ? "space-between" : "flex-end" }}>
                        {this.props.questionCount > 1 && (
                          <span className='btn btn-sm btn-secondary' onClick={this.onBackSubmit}>
                            <i className='fa fa-angle-left' /> Back
                          </span>
                        )}
                        {"   "}
                        {this.questionType !== "RadioButton" || this.resp !== undefined ? (
                          <span className='btn btn-sm btn-secondary' onClick={this.onSubmit} style={{ float: "right" }}>
                            Next <i className='fa fa-angle-right' />
                          </span>
                        ) : (
                          ""
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
  question: state.questionReducer.question,
  questionID: state.questionReducer.questionID,
  questionCount: state.questionReducer.questionCount,
  isFinished: state.questionReducer.isFinished,
  isError: state.questionReducer.isError
});

const mapDispatchToProps = dispatch => {
  return {
    getFirstQuestion: type => dispatch(getFirstQuestion(type)),
    getPrevQuestion: id => dispatch(getPrevQuestion(id)),
    postAnswer: answer => dispatch(postAnswer(answer)),
    setQuestionCount: x => dispatch(setQuestionCount(x))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Survey));
