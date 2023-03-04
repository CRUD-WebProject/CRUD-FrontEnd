import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const TitleContainer = styled.div`
    position: absolute; width: 560px; height: 80px; left:500px; top: 70px;
    display:flex; justify-content: center; align-items: center; 
    border-bottom: 1px solid black;
    font-weight: 500; font-size: 40px; 
`

const NameLayer = styled.div`
    position: absolute; left:430px; top:200px;
    width:120px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const Name = styled.input`
    position: absolute; left:570px; top:200px;
    width:400px; height:40px;
    font-size:20px;
`

const EmailLayer = styled.div`
    position: absolute; left:370px; top:300px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const Email = styled.input`
    position: absolute; left:570px; top:300px;
    width:400px; height:40px;
    font-size:20px;
`

const PhoneLayer = styled.div`
    position: absolute; left:370px; top:400px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const Phone = styled.input`
    position: absolute; left:570px; top:400px;
    width:400px; height:40px;
    font-size:20px;
`

const Find = styled.button`
    position: absolute; left:720px; top:500px;
    width:120px; height:50px;
    font-size:20px; font-weight:600; color:gray; background:beige;
    border-radius:10px; border:2px solid gray;
`

export default function FindID() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: "", email: "", phone: ""
    })
    const {name, email, phone} = input;
    const onChange = (e) => {
        const {value, name} = e.target;
        setInput({
            ...input,
            [name]: value
        })
    }
    const onFind = () => {
        if(name === "") alert("이름을 입력하세요.")
        else if(email === "") alert("이메일을 입력하세요.")
        else if(phone === "") alert("연락처를 입력하세요.")
        else {
            axios.get("user/findID", {
                params: {name: name, email: email, phone: phone}
            })
            .then((response) => {
                if(response.data === "") alert("일치하는 회원정보가 없습니다.")
                else {
                    alert(`회원님의 아이디는 ${response.data}입니다. 로그인 화면으로 이동합니다.`)
                    navigate('/');
                }
            })
        }
    }
    return(
        <div>
            <TitleContainer>아이디 찾기</TitleContainer>
            <NameLayer>이름: </NameLayer>
            <Name name="name" value={name} alt="이름" onChange={onChange} />
            <EmailLayer>이메일: </EmailLayer>
            <Email name="email" value={email} alt="이메일" onChange={onChange} />
            <PhoneLayer>연락처: </PhoneLayer>
            <Phone  name="phone" value={phone} alt="연락처 (xxx-xxxx-xxxx 꼴로 입력해주세요)" onChange={onChange} />
            <Find onClick={onFind}>아이디 찾기</Find>
        </div>
    );
}