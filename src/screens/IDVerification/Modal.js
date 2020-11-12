import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';

function Modal (props) {
	const webcam = useRef(null);
	const onClick = () => {
		props.onGetScreenshot(webcam.current.getScreenshot());
		props.close();
	};
	return (
		<div>
			<ModalWrapper show={props.show}>
				<ModalHeader>
					<SubHeader>Take a photo</SubHeader>
					<CloseModalBtn onClick={props.close}>×</CloseModalBtn>
				</ModalHeader>
				<ModalBody>
					<Webcam ref={webcam} style={{ width: '300px' }} />
				</ModalBody>
				<ModalFooter>
					<BtnTakePhoto onClick={onClick}>Take a photo</BtnTakePhoto>
				</ModalFooter>
			</ModalWrapper>
		</div>
	);
}

export default Modal;

const ModalWrapper = styled.div`
	background: white;
	border: 1px solid #d0cccc;
	box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
	margin: auto;
	transition: all 0.8s;
	width: 310px;
	position: fixed;
	z-index: 100;
	top: 100px;
	opacity: ${(props) => (props.show ? '1' : '0')};
	transform: ${(props) => (props.show ? 'translateY(0vh)' : 'translateY(-100vh)')};
`;

const ModalHeader = styled.div`
	background: #263238;
	height: 40px;
	line-height: 40px;
	padding: 5px 20px;
	text-align: right;
`;
const SubHeader = styled.h4`
	color: white;
	float: left;
	margin: 0;
	padding: 0;
	line-height: 1.6;
`;

const ModalBody = styled.div`
	padding: 5px;
	text-align: center;
`;

const CloseModalBtn = styled.span`
	color: white;
	cursor: pointer;
	float: right;
	font-size: 30px;
	margin: 0;
	line-height: 1;
`;

const ModalFooter = styled.div`
	background: #263238;
	height: 50px;
	padding: 10px;
`;

const BtnTakePhoto = styled.button`
	background: coral;
	border: none;
	color: white;
	font-weight: bold;
	outline: none;
	background-color: #1b5e20;
	float: right;
`;
