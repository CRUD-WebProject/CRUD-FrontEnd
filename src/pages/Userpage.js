import React, {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import UpperLayer from '../components/UpperLayer';

const TitleContainer = styled.div`
    position: absolute; left:300px; top: 100px; 
    font-weight: 500; font-size: 50px; 
`

const SideBanner = styled.div`
    position:absolute; left:50px; top:100px;
    width:200px; height:600px;
    border-right:2px solid gray;
    
`

const SideButton = styled.button`
    width:200px; height:50px;
    border:0px; background:white;
    font-size:20px; text-align:center;
`

const Userpage = styled.div`
    position:absolute; left:300px; top: 150px;
    width:1000px; height:550px;
`

const IdLayer = styled.div`
    position: absolute; left:0px; top:50px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align:right;
`

const Id = styled.input`
    position: absolute; left:200px; top:50px;
    width:500px; height:50px;
    font-size:20px;
`

const Id_pw = styled.input`
    position: absolute; left:200px; top:140px;
    width:500px; height:50px;
    font-size:20px;
`

const SexLayer = styled.div`
    position: absolute; left:0px; top:140px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align:right;
`

const Sex = styled.select`
    position: absolute; left:200px; top:140px;
    width:507px; height:50px;
    font-size:20px;
`
const AgeLayer = styled.div`
    position: absolute; left:0px; top:230px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align:right;
`

const Age = styled.input`
    position: absolute; left:200px; top:230px;
    width:500px; height:50px;
    font-size:20px;
`
const EmailLayer = styled.div`
    position: absolute; left:0px; top:320px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align:right;
`

const Email = styled.input`
    position: absolute; left:200px; top:320px;
    width:500px; height:50px;
    font-size:20px;
`
const PhoneLayer = styled.div`
    position: absolute; left:0px; top:410px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align:right;
`

const Phone = styled.input`
    position: absolute; left:200px; top:410px;
    width:500px; height:50px;
    font-size:20px;
`

const Update = styled.button`
    position: absolute; left:300px; top:500px;
    width:100px; height:50px;
    color:gray; font-size:20px; font-weight:600;
    border-radius:5px; border:2px solid gray;
`

export default function UserPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [info, setInfo] = useState({
        ID: "jiwoo",
        sex: "M",
        age: 25,
        email: "wldn990629@gmail.com",
        phone: "010-3757-2108"
    })
    const {ID, sex, age, email, phone} = info;
    var diffSex;
    if(sex === "M") diffSex = "남";
    else if(sex === "W") diffSex = "여";
    const onChange = (e) => {
        const {value, name} = e.target;
        setInfo({
            ...info,
            [name] : value
        })
    }
    const [selected, setSelected] = useState(diffSex);
    const onSelect = (e) => {
        setSelected(e.target.value);
    }
    const onUpdate = () => {
        if(window.confirm("정보를 수정하시겠습니까?")) {
            alert("정보가 수정되었습니다.");
            navigate(`/info`);
        }
    }
    const onChangePage = (e) => {
        setPage(e.target.value);
    }

    const [page, setPage] = useState("profile");
    var diffTitle;
    if(page === "profile") diffTitle = "내 프로필";
    else if(page === "pw" || page === "changepw") diffTitle = "비밀번호 변경";

    const [info_pw, setInfo_pw] = useState({
        ID_pw: "", email_pw: "", phone_pw: ""
    })
    const {ID_pw, email_pw, phone_pw} = info_pw;
    const onChange_pw = (e) => {
        const {value, name} = e.target;
        setInfo_pw({
            ...info_pw,
            [name] : value
        })
    } 
    const goChangePW = () => {
        //백에서 response 받아온 결과에 따라 다르게 동작
        if(ID_pw === "jiwoo") {
            setPage("changepw");
        } else {
            alert("일치하지 않는 회원정보입니다.");
        }
    }
    const [newPW, setNewPW] = useState({
        pw: "", check: ""
    })
    const {pw, check} = newPW;
    const onNewPW = (e) => {
        const {value, name} = e.target;
        setNewPW({
            ...newPW,
            [name] : value
        })
    }
    const goNewPW = () => {
        if(pw === check) {
            if(window.confirm("비밀번호를 변경하시겠습니까?")) {
                alert("비밀번호가 변경되었습니다.");
                setPage("profile");
            }
        } else {
            alert("입력한 두 비밀번호가 일치하지 않습니다. 다시 입력하세요.")
        }
    }

    const diffPage = (page) => {
        if(page === "profile") {
            return (
                <Userpage>
                    <IdLayer>ID : </IdLayer>
                    <Id name="ID" value={ID} onChange={onChange} />
                    <SexLayer>성별 : </SexLayer>
                    <Sex name="sex" defaultValue={diffSex} onChange={onSelect}>
                        <option value="M" key="M">남</option>
                        <option value="W" key="W">여</option>
                    </Sex>
                    <AgeLayer>나이 : </AgeLayer>
                    <Age name="age" value={age} onChange={onChange} />
                    <EmailLayer>이메일 : </EmailLayer>
                    <Email name="email" value={email} onChange={onChange} />
                    <PhoneLayer>연락처 : </PhoneLayer>
                    <Phone name="phone" value={phone} onChange={onChange} />
                    <Update onClick={onUpdate}>정보수정</Update>
                </Userpage>
            );
        } else if(page === "pw") {
            return (
                <Userpage>
                    <p />회원정보 확인을 위해 정보를 입력하세요.
                    <SexLayer>ID : </SexLayer>
                    <Id_pw name="ID_pw" value={ID_pw} onChange={onChange_pw} />
                    <AgeLayer>이메일 : </AgeLayer>
                    <Age name="email_pw" value={email_pw} onChange={onChange_pw} />
                    <EmailLayer>연락처 : </EmailLayer>
                    <Email name="phone_pw" value={phone_pw} onChange={onChange_pw} />
                    <Update value="changepw" onClick={goChangePW}>인증하기</Update>
                </Userpage>
            )
        } else if(page === "changepw") {
            return(
                <Userpage>
                    <p />새로운 비밀번호를 입력하세요.
                    <SexLayer>새 비밀번호 : </SexLayer>
                    <Id_pw type="password" name="pw" value={pw} onChange={onNewPW} />
                    <EmailLayer>비밀번호 확인 : </EmailLayer>
                    <Email type="password" name="check" value={check} onChange={onNewPW} />
                    <Update onClick={goNewPW}>변경하기</Update>
                </Userpage>
            );
        }
    }

    return (
        <div>
            <UpperLayer />
            <TitleContainer>{diffTitle}</TitleContainer>
            <SideBanner>
                <p /><br /><br />
                <SideButton value="profile" onClick={onChangePage}>내 정보</SideButton><p />
                <SideButton value="pw" onClick={onChangePage}>비밀번호 변경</SideButton> <p />
            </SideBanner>
            {diffPage(page)}
        </div>   
    );
}