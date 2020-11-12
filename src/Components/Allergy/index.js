import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAllergySaga } from "../../actions";
import { baseURL } from "../../Config";
import axios from "axios";
const getAllergyList = async () => {
  return await axios.get(baseURL + "patient_allergy", { withCredentials: true });
};

function Allergy(props) {
  const [allergyList, setAllergyList] = useState([]);
  const [reactionList, setReactionList] = useState([]);
  const [selectedAllergy, setSelectedAllergy] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await getAllergyList();
      if (res !== [] && res.data.payload.allergy_search_results !== undefined) {
        let allergyListFromResp = res.data.payload.allergy_search_results;
        let reactionListFromResp = res.data.payload.allergies;
        let temp1 = [],
          temp2 = [];
        allergyListFromResp.forEach((ele, index) => {
          temp1.push({
            value: ele.allergy_id,
            label: ele.name
          });
          temp2.push(reactionListFromResp[index].reaction);
        });
        setAllergyList(temp1);
        setReactionList(temp2);
        props.onChange({ allergyList: temp1, reactionList: temp2 }, props.id, props.qID, props.qType);
      }
    }
    fetchData(); // eslint-disable-next-line
  }, []);

  const onInputChange = event => {
    if (event.target.value !== "") {
      props.getAllergySaga(event.target.value);
      setIsSearching(true);
    } else setIsSearching(false);
    setTextInput(event.target.value);
  };
  const onSelectItem = event => {
    const data = {
      value: parseInt(event.target.id),
      label: event.target.innerText
    };
    setSelectedAllergy(data);
    setTextInput(event.target.innerText);
    setIsSearching(false);
  };
  const onAddClick = () => {
    var temp = allergyList;
    if (temp.some(item => item.label === selectedAllergy.label) === false && selectedAllergy !== "") {
      const allergyList2 = [...allergyList, selectedAllergy];
      const reactionList2 = [...reactionList, ""];
      setAllergyList(prevList => [...prevList, selectedAllergy]);
      setReactionList(prevList => [...prevList, ""]);
      props.onChange({ allergyList: allergyList2, reactionList: reactionList2 }, props.id, props.qID, props.qType);
    }
    setSelectedAllergy("");
    setTextInput("");
  };
  const onRemoveItem = event => {
    const id = event.target.id;
    let allergyList2 = [...allergyList],
      reactionList2 = [...reactionList];
    allergyList2.splice(id, 1);
    reactionList2.splice(id, 1);
    setAllergyList(prevList => {
      const temp = prevList;
      temp.splice(id, 1);
      return [...temp];
    });
    setReactionList(prevList => {
      const temp = prevList;
      temp.splice(id, 1);
      return [...temp];
    });
    props.onChange({ allergyList: allergyList2, reactionList: reactionList2 }, props.id, props.qID, props.qType);
  };
  const onTextChange = event => {
    const temp = reactionList;
    temp[event.target.id] = event.target.value;
    setReactionList([...temp]);
    props.onChange({ allergyList, reactionList: temp }, props.id, props.qID, props.qType);
  };
  return (
    <div>
      <h4 className='step-title'>{props.title}</h4>
      <div className='search-wrap'>
        <input type='text' className='form-control' placeholder='Search for medication or supplements' onChange={onInputChange} value={textInput} />
        <span className='btn btn-sm btn-primary add-btn' onClick={onAddClick}>
          ADD
        </span>
      </div>
      {isSearching === true && props.allergy.allergy_search_results !== undefined && (
        <div>
          <ul className='searchDown' style={{ zIndex: "10", position: "absolute" }}>
            {props.allergy.allergy_search_results.map((element, index) => {
              return (
                <li id={element.allergy_id} key={index} onClick={onSelectItem}>
                  {element.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className='search-results'>
        {allergyList.map((element, index) => {
          return (
            <div className='search-item' key={index}>
              <span className='remove' id={index} onClick={onRemoveItem}>
                <i className='fa fa-times-circle' id={index} />
              </span>
              <h4>{element.label}</h4>
              <p style={{ fontFamily: "Helvetica Neue", fontStyle: "italic", color: "#1b1d50" }}>Please describe the reaction you experienced...</p>
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
  allergy: state.allergyReducer.allergy
});

const mapDispatchToProps = dispatch => ({
  getAllergySaga: keyword => dispatch(getAllergySaga(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(Allergy);
