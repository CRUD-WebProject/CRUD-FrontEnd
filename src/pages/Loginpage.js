import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const TitleContainer = styled.div`
    position: absolute; width: 560px; height: 80px; left:500px; top: 70px;
    display:flex; justify-content: center; align-items: center; 
    border-bottom: 1px solid black;
    font-weight: 500; font-size: 40px; 
`

const Container = styled.div`
    position:relative; left:400px; top:150px;
    width:700px; height:500px;
`

const IdLayer = styled.div`
    position: absolute; left:50px; top:170px;
    width:120px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const Id = styled.input`
    position: absolute; left:200px; top:170px;
    width:450px; height:40px;
    font-size:20px;
`

const PwLayer = styled.div`
    position: absolute; left:50px; top:250px;
    width:120px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const Pw = styled.input`
    position: absolute; left:200px; top:250px;
    width:450px; height:40px;
    font-size:20px;
`

const Login = styled.button`
    position: absolute; left:330px; top:330px;
    width:100px; height:50px;
    font-size:25px; font-weight:600; color:gray;
    border-radius:5px; border:2px solid gray;
`

const Join = styled.div`
    position:absolute; left:180px; top:420px; 
    font-size:20px; color:gray; background:white;
    border:0px;
`

const FindID = styled.div`
    position:absolute; left:335px; top:420px;
    font-size:20px; color:gray; background:white;
    border:0px;
`

const FindPW = styled.div`
    position:absolute; left:480px; top:420px;
    font-size:20px; color:gray; background:white;
    border:0px;
`

export default function LoginPage() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        id: "", pw: ""
    })
    const {id, pw} = input;
    const onChange = (e) => {
        const {value, name} = e.target;
        setInput({
            ...input,
            [name]: value
        })
    }
    const onLogin = () => {
        if(id === "jiwoo" && pw === "jiwoo@0629") navigate(`/main`);
        else alert("일치하지 않는 회원정보입니다.");
    }

    return(
        <div>
            <TitleContainer>로 그 인</TitleContainer>
            <Container>
                <IdLayer>아이디: </IdLayer>
                <Id name="id" value={id} alt="ID" onChange={onChange} />
                <PwLayer>비밀번호: </PwLayer>
                <Pw type="password" name="pw" value={pw} alt="PW" onChange={onChange}/>
                <Login onClick={onLogin}>로그인</Login>
                <Join><Link to={`/join`} style={{ textDecoration: "none", color: "gray" }}>회원가입</Link></Join>
                <FindID><Link to={`/findID`} style={{ textDecoration: "none", color: "gray" }}>아이디찾기</Link></FindID>
                <FindPW><Link to={`/findPW`} style={{ textDecoration: "none", color: "gray" }}>비밀번호찾기</Link></FindPW>    
            </Container>
        </div> 
    );
}