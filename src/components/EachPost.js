import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const Layer = styled.div`
    position:relative; width:100%; height:40px;
    border-bottom:1px solid black;
    font-size:16px; font-weight:500;
    display:flex; justify-content:left; align-items:center;
`

const Number = styled.div`
    position:absolute; left:0px;
    width:10%; height:30px;
    padding-left:45px; padding-top:10px; 
`

const Title = styled.div`
    position:absolute; left:10%;
    width:50%; height:30px;
    padding-left:30px; padding-top:10px;
`

const Author = styled.div`
    position:absolute; left:60%;
    width:20%; height:30px;
    padding-left:30px; padding-top:10px;
`

const Date = styled.div`
    position:absolute; left:80%;
    width:20%; height:30px;
    padding-left:30px; padding-top:10px;
`

export default function EachPost(props) {
    const navigate = useNavigate();
    const onView = () => {
        navigate(`/view/${props.postID}`, {state:{
            postID: props.postID
        }});
    }
    return(
        <Layer>
            <Number>{props.postID}</Number>
            <Title onClick={onView}>{props.title}</Title>
            <Author>{props.id}</Author>
            <Date>{props.date}</Date>
        </Layer>
    );
}