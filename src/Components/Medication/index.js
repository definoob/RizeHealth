import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getMedicationSaga } from "../../actions";
import { baseURL } from "../../Config";
const getMedicationList = async () => {
  return await axios.get(baseURL + "patient_medication", { withCredentials: true });
};

function Medication(props) {
  const [medicationList, setMedicationList] = useState([]);
  const [reactionList, setReactionList] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await getMedicationList();
      if (res !== [] && res.data.payload.medication_search_results !== undefined) {
        let medicationListFromResp = res.data.payload.medication_search_results;
        let reactionListFromResp = res.data.payload.medications;
        let temp1 = [],
          temp2 = [];
        medicationListFromResp.forEach((ele, index) => {
          temp1.push({
            value: ele.allergy_id,
            label: ele.name
          });
          temp2.push(reactionListFromResp[index].reaction);
        });
        setMedicationList(temp1);
        setReactionList(temp2);
        props.onChange({ medicationList: temp1, reactionList: temp2 }, props.id, props.qID, props.qType);
      }
    }
    fetchData(); // eslint-disable-next-line
  }, []);

  const onInputChange = event => {
    if (event.target.value !== "") {
      props.getMedicationSaga(event.target.value);
      setIsSearching(true);
    } else setIsSearching(false);
    setTextInput(event.target.value);
  };
  const onSelectItem = event => {
    const data = {
      value: parseInt(event.target.id),
      label: event.target.innerText
    };
    setSelectedMedication(data);
    setTextInput(event.target.innerText);
    setIsSearching(false);
  };
  const onAddClick = () => {
    var temp = medicationList;
    if (temp.some(item => item.label === selectedMedication.label) === false && selectedMedication !== "") {
      const medicationList2 = [...medicationList, selectedMedication];
      const reactionList2 = [...reactionList, ""];
      setMedicationList(prevList => [...prevList, selectedMedication]);
      setReactionList(prevList => [...prevList, ""]);
      props.onChange({ medicationList: medicationList2, reactionList: reactionList2 }, props.id, props.qID, props.qType);
    }
    setSelectedMedication("");
    setTextInput("");
  };
  const onRemoveItem = event => {
    const id = event.target.id;
    let medicationList2 = [...medicationList],
      reactionList2 = [...reactionList];
    medicationList2.splice(id, 1);
    reactionList2.splice(id, 1);
    setMedicationList(prevList => {
      const temp = prevList;
      temp.splice(id, 1);
      return [...temp];
    });
    setReactionList(prevList => {
      const temp = prevList;
      temp.splice(id, 1);
      return [...temp];
    });
    props.onChange({ medicationList: medicationList2, reactionList: reactionList2 }, props.id, props.qID, props.qType);
  };
  const onTextChange = event => {
    const temp = reactionList;
    temp[event.target.id] = event.target.value;
    setReactionList([...temp]);
    props.onChange({ medicationList, reactionList: temp }, props.id, props.qID, props.qType);
  };
  return (
    <div>
      <h4 className='step-title'>{props.title}</h4>
      <div className='search-wrap'>
        <input type='text' className='form-control' placeholder='Search for a medication ...' onChange={onInputChange} value={textInput} />
        <span className='btn btn-sm btn-primary add-btn' onClick={onAddClick}>
          ADD
        </span>
      </div>
      {isSearching === true && props.medication.medication_search_results !== undefined && (
        <div>
          <ul className='searchDown' style={{ zIndex: "10", position: "absolute" }}>
            {props.medication.medication_search_results.map((element, index) => {
              return (
                <li id={element.medication_id} key={index} onClick={onSelectItem}>
                  {element.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className='search-results'>
        {medicationList.map((element, index) => {
          return (
            <div className='search-item' key={index}>
              <span className='remove' id={index} onClick={onRemoveItem}>
                <i className='fa fa-times-circle' id={index} />
              </span>
              <h4>{element.label}</h4>
              <p style={{ fontFamily: "Helvetica Neue", fontStyle: "italic", color: "#1b1d50" }}>Please enter any additional information that might be helpful to the doctor, such as your dosage and how frequently you take this medication.</p>
              <div className='max-600'>
                <textarea className='form-control' rows='2' style={{ backgroundColor: "white" }} value={reactionList[index]} id={index} onChange={onTextChange} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  medication: state.medicationReducer.medication
});

const mapDispatchToProps = dispatch => ({
  getMedicationSaga: keyword => dispatch(getMedicationSaga(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(Medication);
