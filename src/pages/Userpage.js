import React, {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import UpperLayer from '../components/UpperLayer';

const TitleContainer = styled.div`
    position: absolute; width: 560px; height: 80px; left:500px; top: 70px;
    display:flex; justify-content: center; align-items: center; 
    border-bottom: 1px solid black;
    font-weight: 500; font-size: 40px; 
`

const SideBanner = styled.div`
    position:absolute; left:50px; top:200px;
    width:200px; height:500px;
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

const NameLayer = styled.div`
    position: absolute; left:0px; top:120px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align:right;
`

const Name = styled.input`
    position: absolute; left:200px; top:120px;
    width:500px; height:50px;
    font-size:20px;
`

const Id_pw = styled.input`
    position: absolute; left:200px; top:190px;
    width:500px; height:50px;
    font-size:20px;
`

const SexLayer = styled.div`
    position: absolute; left:0px; top:190px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align:right;
`

const Sex = styled.select`
    position: absolute; left:200px; top:190px;
    width:507px; height:50px;
    font-size:20px;
`
const AgeLayer = styled.div`
    position: absolute; left:0px; top:260px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align:right;
`

const Age = styled.input`
    position: absolute; left:200px; top:260px;
    width:500px; height:50px;
    font-size:20px;
`
const EmailLayer = styled.div`
    position: absolute; left:0px; top:330px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align:right;
`

const Email = styled.input`
    position: absolute; left:200px; top:330px;
    width:500px; height:50px;
    font-size:20px;
`
const PhoneLayer = styled.div`
    position: absolute; left:0px; top:400px;
    width:180px; height:50px;
    font-size:30px; font-weight:600;
    text-align:right;
`

const Phone = styled.input`
    position: absolute; left:200px; top:400px;
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
        name: "정지우",
        sex: "M",
        age: 25,
        email: "wldn990629@gmail.com",
        phone: "010-3757-2108"
    })
    const {ID, name, sex, age, email, phone} = info;
    const onChange = (e) => {
        const {value, name} = e.target;
        setInfo({
            ...info,
            [name] : value
        })
    }
    const [selected, setSelected] = useState(sex);
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
        ID_pw: "", name_pw: ""
    })
    const {ID_pw, name_pw} = info_pw;
    const onChange_pw = (e) => {
        const {value, name} = e.target;
        setInfo_pw({
            ...info_pw,
            [name] : value
        })
    } 
    const goChangePW = () => {
        //백에서 response 받아온 결과에 따라 다르게 동작
        if(ID_pw === "jiwoo" && name_pw === "정지우") {
            setPage("changepw");
        } else {
            alert("일치하지 않는 회원정보입니다.");
        }
    }
    const [newPW, setNewPW] = useState({
        pw: "", check: ""
    })
    const {cur_pw, new_pw, check} = newPW;
    const onNewPW = (e) => {
        const {value, name} = e.target;
        setNewPW({
            ...newPW,
            [name] : value
        })
    }
    const goNewPW = () => {
        if(new_pw === check) {
            if(cur_pw === new_pw) alert("기존 비밀번호와 같은 비밀번호입니다.")
            else if(window.confirm("비밀번호를 변경하시겠습니까?")) {
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
                    <IdLayer>아이디 : </IdLayer>
                    <Id name="ID" value={ID} onChange={onChange} />
                    <NameLayer>이름: </NameLayer>
                    <Name name="name" value={name} onChange={onChange} />
                    <SexLayer>성별 : </SexLayer>
                    <Sex name="sex" defaultValue={selected} onChange={onSelect}>
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
                    <SexLayer>아이디 : </SexLayer>
                    <Id_pw name="ID_pw" value={ID_pw} onChange={onChange_pw} />
                    <EmailLayer>이름 : </EmailLayer>
                    <Email name="name_pw" value={name_pw} onChange={onChange_pw} />
                    <Update value="changepw" onClick={goChangePW}>인증하기</Update>
                </Userpage>
            )
        } else if(page === "changepw") {
            return(
                <Userpage>
                    <p />새로운 비밀번호를 입력하세요.
                    <SexLayer>기존 비밀번호 : </SexLayer>
                    <Id_pw type="password" name="cur_pw" value={cur_pw} onChange={onNewPW} />
                    <AgeLayer>새 비밀번호 : </AgeLayer>
                    <Age type="password" name="new_pw" value={new_pw} onChange={onNewPW} />
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
                <p />
                <SideButton value="profile" onClick={onChangePage}>내 정보</SideButton><p />
                <SideButton value="pw" onClick={onChangePage}>비밀번호 변경</SideButton> <p />
            </SideBanner>
            {diffPage(page)}
        </div>   
    );
}