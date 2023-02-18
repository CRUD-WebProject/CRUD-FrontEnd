import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const TitleContainer = styled.div`
    position: absolute; width: 560px; height: 80px; left:500px; top: 70px;
    display:flex; justify-content: center; align-items: center; 
    border-bottom: 1px solid black;
    font-weight: 500; font-size: 40px; 
`

const IdLayer = styled.div`
    position: absolute; left:430px; top:200px;
    width:120px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const Id = styled.input`
    position: absolute; left:570px; top:200px;
    width:400px; height:40px;
    font-size:20px;
`

const Dup = styled.button`
    position: absolute; left:1000px; top:200px;
    width:100px; height:40px;
    font-size:20px; color:gray; background:beige;
    border-radius:10px; border:2px solid gray;
`

const NameLayer = styled.div`
    position: absolute; left:430px; top:260px;
    width:120px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const Name = styled.input`
    position: absolute; left:570px; top:260px;
    width:400px; height:40px;
    font-size:20px;
`

const PwLayer = styled.div`
    position: absolute; left:430px; top:320px;
    width:120px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const Pw = styled.input`
    position: absolute; left:570px; top:320px;
    width:400px; height:40px;
    font-size:20px;
`

const CheckPwLayer = styled.div`
    position: absolute; left:370px; top:380px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const CheckPw = styled.input`
    position: absolute; left:570px; top:380px;
    width:400px; height:40px;
    font-size:20px;
`

const SexLayer = styled.div`
    position: absolute; left:430px; top:440px;
    width:120px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const Sex = styled.select`
    position: absolute; left:570px; top:440px;
    width:407px; height:40px;
    font-size:20px;
`

const AgeLayer = styled.div`
    position: absolute; left:430px; top:500px;
    width:120px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const Age = styled.input`
    position: absolute; left:570px; top:500px;
    width:400px; height:40px;
    font-size:20px;
`

const EmailLayer = styled.div`
    position: absolute; left:370px; top:560px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const Email = styled.input`
    position: absolute; left:570px; top:560px;
    width:400px; height:40px;
    font-size:20px;
`

const PhoneLayer = styled.div`
    position: absolute; left:370px; top:620px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align: right;
`

const Phone = styled.input`
    position: absolute; left:570px; top:620px;
    width:400px; height:40px;
    font-size:20px;
`

const Join = styled.button`
    position: absolute; left:730px; top:700px;
    width:100px; height:50px;
    font-size:20px; font-weight:600; color:gray; background:beige;
    border-radius:10px; border:2px solid gray;
`

export default function Joinpage() {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        id: "", name: "", pw: "", checkpw: "", age: "", email: "", phone: ""
    })
    const {id, name, pw, checkpw, age, email, phone} = input;
    const [sex, setSex] = useState("M");
    const onChange = (e) => {
        const {value, name} = e.target;
        setInput({
            ...input,
            [name]: value
        })
    }
    const checkDup = () => { //아이디 중복 확인
        if(id === "jiwoo") alert("이미 존재하는 아이디입니다.")
        else alert("사용 가능한 아이디입니다.")
    }
    const onSelect = (e) => {
        setSex(e.target.value)
    }
    const onJoin = () => {
        if(id === "") alert("아이디를 입력하세요.")
        else if(id === "jiwoo") alert("이미 존재하는 아이디입니다.") //아이디 중복 확인
        else if(name === "") alert("이름을 입력하세요.")
        else if(pw === "" || checkpw === "") alert("비밀번호를 입력하세요.")
        else if(pw !== checkpw) alert("두 비밀번호가 서로 일치하지 않습니다.")
        else if(age === "") alert("나이를 입력하세요.")
        else {
            if(email === "" || phone === "") {
                if(window.confirm("이메일 또는 전화번호를 입력하지 않을 경우, 비밀번호를 찾을 때 어려움이 있을 수 있습니다.\n 회원가입하시겠습니까?")) {
                    alert("회원가입되었습니다.\n로그인화면으로 이동합니다.")
                    navigate(`/`);
                }
            }
            else {
                if(window.confirm("회원가입하시겠습니까?")) {
                    alert("회원가입되었습니다.\n로그인화면으로 이동합니다.")
                    navigate(`/`);
                }
            }
        }
    }

    return(
        <div>
            <TitleContainer>회원가입</TitleContainer>
            <IdLayer>아이디: </IdLayer>
            <Id name="id" value={id} alt="아이디" onChange={onChange} />
            <Dup onClick={checkDup}>중복확인</Dup>
            <NameLayer>이름: </NameLayer>
            <Name name="name" value={name} alt="이름" onChange={onChange} />
            <PwLayer>비밀번호: </PwLayer>
            <Pw type="password" name="pw" value={pw} alt="비밀번호" onChange={onChange} />
            <CheckPwLayer>비밀번호 확인: </CheckPwLayer>
            <CheckPw type="password" name="checkpw" value={checkpw} alt="비밀번호 확인" onChange={onChange} />
            <SexLayer>성별: </SexLayer>
            <Sex name="sex" value={sex} onChange={onSelect}>
                <option value="M" key="M">남</option>
                <option value="W" key="W">여</option>
            </Sex>
            <AgeLayer>나이: </AgeLayer>
            <Age name="age" value={age} alt="나이" onChange={onChange} />
            <EmailLayer>이메일(선택): </EmailLayer>
            <Email name="email" value={email} alt="이메일" onChange={onChange} />
            <PhoneLayer>연락처(선택): </PhoneLayer>
            <Phone name="phone" value={phone} alt="연락처 (xxx-xxxx-xxxx 꼴로 입력해주세요)" onChange={onChange} />
            <Join onClick={onJoin}>회원가입</Join>
        </div>
    );
}