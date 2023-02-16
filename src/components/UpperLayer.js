import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import home from '../images/Home.jpg';
import profile from '../images/Profile.jpg'

const Container = styled.div`
    display:flex; justify-content:center; align-items:center;
    width: 100%; height:60px; z-index:1;
    background-color: beige;
`

const Home = styled.img`
    width:50px; height:50px;
    position:absolute; left:20px; top:5px;
`

const ProfileContainer = styled.div`
    position:absolute; left:50%; top:0px;
    display:flex; justify-content:right;
    width:50%; height:60px; z-index:1;
    background-color:beige;
`    

const Profile = styled.img`
    width:50px; height:50px; 
    position:absolute; top:5px; right:150px;
`

const Log = styled.button`
    width:100px; height:50px;
    position:absolute; top:5px; right:30px;
    color:gray; font-size:20px; font-weight:600;
    border-radius:5px; border:2px solid gray;
`

var login = true;
var diffLog;

export default function UpperLayer() {
    const navigate = useNavigate();
    
    if(login) diffLog = "로그아웃";
    else diffLog = "로그인"; 
    
    function diffFunc() {
        if(login) {
            if(window.confirm("로그아웃 하시겠습니까?")) {
                login = false;
                alert("로그아웃 되었습니다.");
                navigate("/main");
            } else {
                //동작 x
            }
        } else {
            alert("로그인 화면으로 이동합니다.");
            navigate("/");
        }
    }

    function GoInfo() {
        navigate(`/info`, {state:{
            ID: "jiwoo"
        }});
    }

    return(
        <Container>
            <Link to="/main"><Home src={home} alt="홈으로" /></Link>
            <ProfileContainer>
                <Profile src={profile} alt="내 프로필" onClick={GoInfo} />
                <Log onClick = {diffFunc}>{diffLog}</Log>
            </ProfileContainer>
        </Container>
    );
}