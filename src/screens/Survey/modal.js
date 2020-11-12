import React from "react";
import "./modal.css";

export default () => (
  <div className='modal fade' id='ModalCenter' tabIndex='-1' role='dialog' aria-labelledby='ModalCenterTitle' aria-hidden='true'>
    <div className='modal-dialog modal-dialog-centered' role='document'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title' id='ModalLongTitle'>
            Disclaimer
          </h5>
          <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
        <div className='modal-body modal-info'>
          Clinical Studies for PROPECIA (finasteride 1 mg) in the Treatment of Male Pattern Hair Loss In three controlled clinical trials for PROPECIA of 12-month duration, 1.4% of patients taking PROPECIA (n=945) were discontinued due to adverse
          experiences that were considered to be possibly, probably or definitely drug-related (1.6% for placebo; n=934). Clinical adverse experiences that were reported as possibly, probably or definitely drug-related in ≥1% of patients treated with
          PROPECIA or placebo are presented in Table 1.
          <br />
          <br />
          TABLE 1: Drug-Related Adverse Experiences for PROPECIA (finasteride 1 mg) in Year 1 (%) MALE PATTERN HAIR LOSS PROPECIA N=945 Placebo N=934 Decreased Libido 1.8 1.3 Erectile Dysfunction 1.3 0.7 Ejaculation Disorder (Decreased Volume of
          Ejaculate) 1.2 (0.8) 0.7 (0.4) Discontinuation due to drug-related sexual adverse experiences 1.2 0.9
          <br />
          <br />
          Integrated analysis of clinical adverse experiences showed that during treatment with PROPECIA, 36 (3.8%) of 945 men had reported one or more of these adverse experiences as compared to 20 (2.1%) of 934 men treated with placebo (p=0.04).
          <br />
          <br />
          Resolution occurred in men who discontinued therapy with PROPECIA due to these side effects and in most of those who continued therapy. The incidence of each of the above adverse experiences decreased to ≤0.3% by the fifth year of treatment
          with PROPECIA.
          <br />
          <br />
          In a study of finasteride 1 mg daily in healthy men, a median decrease in ejaculate volume of 0.3 mL (- 11%) compared with 0.2 mL (-8%) for placebo was observed after 48 weeks of treatment. Two other studies showed that finasteride at 5
          times the dosage of PROPECIA (5 mg daily) produced significant median decreases of approximately 0.5 mL (-25%) compared to placebo in ejaculate volume, but this was reversible after discontinuation of treatment.
          <br />
          <br />
          In the clinical studies with PROPECIA, the incidences for breast tenderness and enlargement, hypersensitivity reactions, and testicular pain in finasteride-treated patients were not different from those in patients treated with placebo.
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-sm btn-secondary' data-dismiss='modal'>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);
