import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const TitleContainer = styled.div`
    position: absolute; width: 560px; height: 80px; left:500px; top: 70px;
    display:flex; justify-content: center; align-items: center; 
    border-bottom: 1px solid black;
    font-weight: 500; font-size: 40px; 
`

const IdLayer = styled.div`
    position: absolute; left:370px; top:250px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const Id = styled.input`
    position: absolute; left:570px; top:250px;
    width:400px; height:40px;
    font-size:20px;
`

const NameLayer = styled.div`
    position: absolute; left:370px; top:350px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const Name2 = styled.input`
    position: absolute; left:570px; top:350px;
    width:400px; height:40px;
    font-size:20px;
`

const Change = styled.button`
    position: absolute; left:730px; top:500px;
    width:100px; height:50px;
    font-size:20px; font-weight:600; color:gray; background:beige;
    border-radius:10px; border:2px solid gray;
`

export default function FindPW() {
    const navigate = useNavigate();
    const [page, setPage] = useState("auth");
    const [input, setInput] = useState({ ID: "", Name: "" })
    const {ID, Name} = input;
    const [change, setChange] = useState({ pw: "", checkPW: "" }) 
    const {pw, checkPW} = change;
    const [curPW, setCurPW] = useState("");
    const onInput = (e) => {
        const {name, value} = e.target;
        setInput({
            ...input,
            [name]: value
        })
    }
    const onChange = (e) => {
        const {name, value} = e.target;
        setChange({
            ...change,
            [name]: value
        })
    }
    const onMove = () => {
        if(ID === "") alert("아이디를 입력하세요.")
        else if(Name === "") alert("이름을 입력하세요.")
        else {
            axios.get("user/findPW", {
                params: { id: ID, name: Name },
                headers: {Authorization: localStorage.getItem("grantType") + localStorage.getItem("accessToken")}
            })
            .then((response) => {
                if(response.data === "") alert("일치하는 회원정보가 없습니다.");
                else {
                    setCurPW(response.data);
                    setPage("changePW");
                }
            })
        }
    }

    const ChangePW = () => {
        if(pw === "" || checkPW === "") alert("비밀번호를 입력하세요.")
        else if(pw === curPW) alert("기존의 비밀번호와 같습니다. 다시 입력하세요.")
        else if(pw !== checkPW) alert("입력한 두 비밀번호가 일치하지 않습니다. 다시 입력하세요.")
        else {
            if(window.confirm("비밀번호를 변경하시겠습니까?")) {
                axios.put("user/changePW", {
                    id: ID, pw: pw
                }, { 
                    headers: {
                        Authorization: localStorage.getItem("grantType") + localStorage.getItem("accessToken"),
                        "Content-Type" : "application/json"
                    }
                })
                .then(() => {
                    alert(`비밀번호가 변경되었습니다.\n변경된 비밀번호는 '${pw}'입니다.\n로그인 화면으로 이동합니다.`)
                    navigate(`/`);
                })
                .catch((error) => {console.log(error)})
            }
        }
    }

    const diffPage = (concept) => {
        if(concept === "auth") {
            return(
                <div>
                    <IdLayer>아이디: </IdLayer>
                    <Id name="ID" value={ID} alt="아이디" onChange={onInput} />
                    <NameLayer>이름: </NameLayer>
                    <Name2 name="Name" value={Name} alt="이름" onChange={onInput} />
                    <Change onClick={onMove}>인증하기</Change>
                </div>
            );
        } else if(concept === "changePW") {
            return(
                <div>
                    <IdLayer>새 비밀번호: </IdLayer>
                    <Id type="password" name="pw" value={pw} alt="새 비밀번호" onChange={onChange} />
                    <NameLayer>비밀번호 확인: </NameLayer>
                    <Name2 type="password" name="checkPW" value={checkPW} alt="비밀번호 확인" onChange={onChange} />
                    <Change onClick={ChangePW}>변경하기</Change>
                </div>
            );
        }
    }
    return(
        <div>
            <TitleContainer>비밀번호 찾기</TitleContainer>
            {diffPage(page)}
        </div>
    );
}