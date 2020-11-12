import React from "react";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFirst: "",
      nameLast: "",
      edited: props.edited,
      edited1: props.edited
    };
  }
  componentDidMount() {
    window.$('[data-toggle="popover"]').popover();
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps, prevState) {
    window.$('[data-toggle="tooltip"]').popover();
    if (prevProps.edited !== this.props.edited) {
      this.setState({ edited: this.props.edited, edited1: this.props.edited });
    }
  }
  onFirstNameChange(e) {
    this.setState({ nameFirst: e.target.value, edited: true });
    this.props.onDataChange({ account_id: this.props.data.account_id, name_prefix: "", name_first: e.target.value, name_middle: "", name_last: this.state.nameLast, name_suffix: "", email: this.props.data.email });
  }
  onLastNameChange(e) {
    this.setState({ nameLast: e.target.value, edited1: true });
    this.props.onDataChange({ account_id: this.props.data.account_id, name_prefix: "", name_first: this.state.nameFirst, name_middle: "", name_last: e.target.value, name_suffix: "", email: this.props.data.email });
  }
  render() {
    return (
      <React.Fragment>
        <h4 className='step-title bordered-title mt-5 pt-2'>Account Information</h4>
        <div className='form-group form-group-inline mb-3 align-items-center'>
          <label className='form-label'>Email</label>
          <div className='field-wrap success'>
            <input type='email' className='form-control' placeholder={this.props.data.email} disabled />
            <i className='verification-icon true_icon fa fa-check' />
          </div>
        </div>
        <div className='form-group form-group-inline mb-3 align-items-center'>
          <label className='form-label'>First Name</label>
          <div className={"field-wrap " + (!this.state.nameFirst ? "error" : "success")}>
            <input type='text' className='form-control' value={this.state.nameFirst} onChange={e => this.onFirstNameChange(e)} />
            <i
              className='verification-icon fa fa-times'
              data-trigger={"hover"}
              data-toggle={"popover"}
              data-container={"html"}
              data-placement={"bottom"}
              data-content={"*Required."}
              style={{ display: !this.state.nameFirst && this.state.edited === true ? "" : "none" }}
            />
            <i className='verification-icon fa fa-check' style={{ display: this.state.nameFirst && this.state.edited === true ? "" : "none" }}></i>
          </div>
        </div>
        <div className='form-group form-group-inline mb-3 align-items-center'>
          <label className='form-label'>Last Name</label>
          <div className={"field-wrap " + (!this.state.nameLast ? "error" : "success")}>
            <input type='text' className='form-control' value={this.state.nameLast} onChange={e => this.onLastNameChange(e)} />
            <i
              className='verification-icon fa fa-times'
              data-trigger={"hover"}
              data-toggle={"popover"}
              data-container={"html"}
              data-placement={"bottom"}
              data-content={"*Required."}
              style={{ display: !this.state.nameLast && this.state.edited1 === true ? "" : "none" }}
            />
            <i className='verification-icon fa fa-check' style={{ display: this.state.nameLast && this.state.edited1 === true ? "" : "none" }}></i>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Account;
