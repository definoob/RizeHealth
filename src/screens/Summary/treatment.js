import React from "react";

function Treatment(props) {
  return (
    <React.Fragment>
      <h4 className='step-title bordered-title my-5'>Treatment Preference</h4>
      <div className='tretment_wrapper'>
        <div className='treatment_box'>
          <div className='treatment_box_inner'>
            <div className='treatment_box-img'>
              <img src={props.data.image_url} className='img-fluid' alt='' />
            </div>
            <div className='treatment_desc'>
              <h3>{props.data.name}</h3>
              <p>{props.data.description}</p>
              <hr style={{ borderTop: "2px solid black" }} />
              <ul>
                <li>
                  <p>{props.data.doses[0].description}</p>
                </li>
                <li>
                  <p>
                    ${props.data.doses[0].shipping_frequency[0].cost} every {props.data.doses[0].shipping_frequency[0].description[0]} month(s)
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Treatment;
