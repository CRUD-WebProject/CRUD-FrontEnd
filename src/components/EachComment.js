import React from 'react';
import styled from 'styled-components';

const Comment = styled.div`
    width:1050px;
    white-space: pre-wrap;
    padding-bottom:20px;
`

const ID = styled.div`
    position: absolute;
    font-size:16px;
`

export default function EachComment (props) {
    return (
        <Comment>
            <ID><b>{props.id}</b>&nbsp;&nbsp;&nbsp;{props.date}</ID><p /><br />
            {props.content}
        </Comment>
    );
}