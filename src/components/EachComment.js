import React from 'react';
import styled from 'styled-components';

const Comment = styled.div`
    position:relative; width:1050px;
    white-space: pre-wrap;
    padding-bottom:20px;
`

const ID = styled.div`
    position: absolute;
    font-size:16px;
`

const Content = styled.input`
    position: absolute; left:0px; top:30px;
    font-size:18px; border:0px;
`

const user = "skmvmks4665";

export default function EachComment (props) {
    //댓글 수정, 삭제 추가기능 구현
    return (
        <Comment>
            <ID><b>{props.id}</b>&nbsp;&nbsp;&nbsp;{props.date}</ID><p /><br />
            <Content value={props.content} disabled/> 
        </Comment>
    );
}