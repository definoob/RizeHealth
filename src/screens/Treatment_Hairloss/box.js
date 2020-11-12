import React from "react";
import "./box.css";

import Bundle from "../../assets/images/bundle.png";
import Finasteride from "../../assets/images/finasteride.png";
import Minoxidil from "../../assets/images/minoxidil.png";
import Product1 from "../../assets/images/product1.31d84bbd.png";
import Product2 from "../../assets/images/product2.1d9fc3e2.png";

export function Box1(props) {
  return (
    <div className='col-lg-4 plan-spacer' onClick={() => props.onClick(props.id)}>
      <div className='ribbon ribbon-top-right' style={{ pointerEvents: "none" }}>
        <span>Most Popular</span>
      </div>
      <div className='plan-box' style={{ cursor: "pointer" }}>
        <div className='plan-intro plan-badge'>
          <h4 className='description_'>The combination bundle is best for</h4>
          <h3 className='symptom_'>Overall thinning hair</h3>
        </div>
        <div className='row plan-art-title-row'>
          <div className='plan-art col-md-12'>
            <img src={Bundle} alt=' ' />
          </div>
          <div className='plan-title col-md-12'>
            <h3 className='title_'>Finasteride &amp; Minoxidil</h3>
          </div>
        </div>
        <div className='plan-summary'>
          <span className='plan-desc'>Daily prescription tablet &amp; topical treatment</span>
        </div>
        <div className='plan-details' style={{ marginBottom: "10px" }}>
          <hr />
          <p>The combination of both treatments is best for reducing overall hair loss and supporting hair regrowth</p>
        </div>
        <div className='plan-products'>
          <table style={{ textAlign: "center", width: "100%" }}>
            <tbody>
              <tr>
                <td style={{ width: "50%", textAlign: "right", verticalAlign: "bottom" }}>
                  <img src={Product2} alt='prescription table' style={{ maxWidth: "60px", border: "0", width: "100px", margin: "0 auto" }} />
                </td>
                <td style={{ width: "50%", textAlign: "left", verticalAlign: "bottom" }}>
                  <img src={Product1} alt='topical treatment' style={{ maxWidth: "120px", border: "0", width: "100px", margin: "0 auto" }} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button type='button' className='btn btn-primary btn-plan'>
          Get 3 months for $100
        </button>
      </div>
    </div>
  );
}

export function Box2(props) {
  return (
    <div className='col-lg-4 plan-spacer' onClick={() => props.onClick(props.id)}>
      <div style={{ cursor: "pointer" }}>
        <div className='plan-box' style={{ pointerEvents: "none" }}>
          <div className='plan-intro'>
            <h4 className='description_'>Daily finasteride is best for</h4>
            <h3 className='symptom_'>Receding hairlines</h3>
          </div>
          <div className='row plan-art-title-row'>
            <div className='plan-art col-md-12'>
              <img src={Finasteride} alt=' ' />
            </div>
            <div className='plan-title col-md-12'>
              <h3 className='title_'>Finasteride, 1mg</h3>
            </div>
          </div>
          <div className='plan-summary'>
            <span className='plan-desc'>Daily prescription tablet</span>
          </div>
          <div className='plan-details' style={{ marginBottom: "10px" }}>
            <hr />
            <p className='plan-p-spacing'>Best for reducing hair loss along the hairline, crown and vertex</p>
          </div>
          <div className='plan-products products-padding'>
            <table style={{ textAlign: "center", width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ width: "100%", textAlign: "center", verticalAlign: "bottom" }}>
                    <img src={Product2} alt='prescription table' style={{ maxWidth: "60px", border: "0", width: "100px", margin: "0 auto" }} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button type='button' className='btn btn-primary btn-plan'>
            Get 3 months for $65
          </button>
        </div>
      </div>
    </div>
  );
}

export function Box3(props) {
  return (
    <div className='col-lg-4 plan-spacer' onClick={() => props.onClick(props.id)}>
      <div style={{ cursor: "pointer" }}>
        <div className='plan-box' style={{ pointerEvents: "none" }}>
          <div className='plan-intro'>
            <h4 className='description_'>Minoxidil topical solution is best for</h4>
            <h3 className='symptom_'>Thinning at the crown</h3>
          </div>
          <div className='row plan-art-title-row'>
            <div className='plan-art col-md-12'>
              <img src={Minoxidil} alt=' ' />
            </div>
            <div className='plan-title col-md-12'>
              <h3 className='title_'>Minoxidil, 5%</h3>
            </div>
          </div>
          <div className='plan-summary'>
            <span className='plan-desc'>Daily Topical solution</span>
          </div>
          <div className='plan-details' style={{ marginBottom: "10px" }}>
            <hr />
            <p className='plan-p-spacing'>Best for regrowing hair on the crown and vertex</p>
          </div>
          <div className='plan-products'>
            <table style={{ textAlign: "center", width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ width: "100%", textAlign: "center", verticalAlign: "bottom" }}>
                    <img src={Product1} alt='topical treatment' style={{ maxWidth: "120px", border: "0", width: "100px", margin: "0 auto" }} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button type='button' className='btn btn-primary btn-plan'>
            Get 3 months for $45
          </button>
        </div>
      </div>
    </div>
  );
}
