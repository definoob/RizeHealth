import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import { baseURL } from "../../Config";

const getFileByID = async id => {
  const file = await axios.get(baseURL + "file_data?id=" + id, { withCredentials: true }).then(resp => resp);
  return file.data.fileData;
};

function ImageComponent(props) {
  const [fileData, setFileData] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [opacity, setOpacity] = useState(0.4);
  const inputFile = useRef(null);

  useEffect(() => {
    async function fetchData() {
      if (props.resp === undefined) {
        setFileData(props.placeholder);
      } else {
        const file = await getFileByID(props.resp[0].file_id);
        setFileData(file);
        setOpacity(1);
        props.onChange({ imgData: file }, props.id, props.qID, props.qType);
      }
    }
    fetchData(); // eslint-disable-next-line
  }, []);
  const onTakePhoto = e => {
    setIsShowing(true);
  };
  const closeModalHandler = () => {
    setIsShowing(false);
  };
  const onGetScreenshot = data => {
    setFileData(data);
    setOpacity(1);
    props.onChange({ imgData: data }, props.id, props.qID, props.qType);
  };
  const onUpload = () => {
    inputFile.current.click();
  };
  const onFileChange = event => {
    if (event.target.files && event.target.files[0]) {
      var temp = URL.createObjectURL(event.target.files[0]);
      setFileData(temp);
      setOpacity(1);
      props.onChange({ imgData: temp }, props.id, props.qID, props.qType);
    }
  };
  return (
    <div className='history-list'>
      <div className='history-item clearfix'>
        <div className='thumb' style={{ position: "relative" }}>
          <img src={fileData} alt='' style={{ width: "236px", height: "226px", opacity }} />
          <div style={{ position: "absolute", bottom: "50%", transform: `translate(67%, 50%)`, display: opacity === 1 ? "none" : "" }}>Upload image</div>
        </div>
        <div className='history-details'>
          <h5>{props.title}</h5>
          <p>{props.details}</p>
          <p className='btn btn-sm btn-primary' onClick={onUpload}>
            <i className='fa fa-upload' /> Upload a Photo
          </p>
          <br />
          <p className='btn btn-sm btn-primary' onClick={onTakePhoto}>
            <i className='fa fa-camera' /> Take a Photo
          </p>
        </div>
      </div>
      <input type='file' ref={inputFile} style={{ display: "none" }} onChange={e => onFileChange(e)} accept='image/png, image/jpeg' />
      <Modal show={isShowing} close={closeModalHandler} key={props.id} onGetScreenshot={onGetScreenshot} />
    </div>
  );
}

export default ImageComponent;
