import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { LinkLearnED, LinkLearnHairLoss } from "../../Config";
import TitleComponent from "../../Components/TitleComponent";
class SelectType extends Component {
  render() {
    return (
      <Fragment>
        <TitleComponent title='Consultation | ED and Hair Loss | Rize' />
        <div style={{ backgroundColor: "#001246", height: "100vh" }}>
          <div className='page_title'>
            <h1 className='text-center text-white font-weight-bold'>How can Rize help you?</h1>
          </div>
          <div className='rize_help'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-6 offset-md-6 col-sm-6 offset-sm-6 col-8 offset-4'>
                  <div className='rize_help-box'>
                    <h1>Erectile Dysfunction</h1>
                    <p>Perform with confidence in the bedroom for a satisfied partner and a happier, more productive you!</p>
                    <Link to='/?type=ed' className='btn btn-sm start-btn-green'>
                      START NOW <i className='fa fa-angle-right' />
                    </Link>
                    &nbsp;
                    <a href={LinkLearnED} className='btn btn-sm learn-btn-green'>
                      LEARN MORE <i className='fa fa-angle-right' />
                    </a>
                  </div>
                  <div className='rize_help-box blue mt-4'>
                    <h1 style={{ color: "#161944" }}>Hair Loss</h1>
                    <p>Do you look in the mirror and notice you don't have as much hair as you used to? Stop your hair loss today.</p>
                    <Link to='/?type=hairloss' className='btn btn-sm start-btn-blue'>
                      START NOW <i className='fa fa-angle-right' />
                    </Link>
                    &nbsp;
                    <a href={LinkLearnHairLoss} className='btn btn-sm learn-btn-blue'>
                      LEARN MORE <i className='fa fa-angle-right' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SelectType;
