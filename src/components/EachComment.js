import React, {useState} from 'react';
import axios from 'axios';
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
    position: absolute; left:0px; top:30px; width:900px;
    font-size:18px; border:0px;
    background:white;
`

const Content_update = styled.input`
    position: absolute; left:0px; top:30px; width:900px;
    font-size:18px; border:1px solid black; border-radius:3px;
    background:white;
`

const Update = styled.button`
    position: absolute; left:950px; top:0px;
    border:0px; border-bottom:1px solid black;
    background:white; 
    font-size:15px; font-weight:600;
`

const Delete = styled.button`
    position: absolute; left:1000px; top:0px;
    border:0px; border-bottom:1px solid black;
    background:white; 
    font-size:15px; font-weight:600;
`

const Enter = styled.button`
    position: absolute; left:970px; top:30px;
    width:50px; height:30px;
    border:2px solid gray; border-radius:7px;
    font-size:15px; font-weight:600;
`

export default function EachComment ({comment}) {
    //댓글 수정, 삭제 추가기능 구현
    const [update, setUpdate] = useState(false);
    const [content, setContent] = useState(comment.content);
    const goUpdate = () => {
        if(update === false) setUpdate(true);
        else setUpdate(false)
    }
    const onChange = (e) => {
        setContent(e.target.value);
    }
    const onUpdate = () => {
        if(window.confirm("댓글을 수정하시겠습니까?")) {
            axios.put("/comment/update", {
                comID: comment.comID,
                postID: comment.postID,
                id: comment.id,
                content: content
            }, {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: localStorage.getItem("grantType") + localStorage.getItem("accessToken") 
                }
            })
            .then(() => {
                alert("댓글이 수정되었습니다.")
                window.location.reload()
            })
            .catch((error) => {console.log(error)})
        } else {

        }
    }
    const onDelete = () => {
        if(window.confirm("댓글을 삭제하시겠습니까?")) {
            axios.delete("/comment/delete", {
                params: { postID: comment.postID, comID: comment.comID},
                headers: { Authorization: localStorage.getItem("grantType") + localStorage.getItem("accessToken") }
            })
            .then(() => {
                alert("댓글이 삭제되었습니다.")
                window.location.reload()
            })
            .catch((error)=>{console.log(error)})
        } else {

        }
    }
    const diffContent = () => {
        if(update === true) 
            return (
                <div>
                    <Content_update name="content" value={content} placeholder="내용을 입력하세요." onChange={onChange} /> 
                    <Enter onClick={onUpdate} >입력</Enter>
                </div>
            );
        else
            return <Content value={content} disabled />
    }
    const diffButton = () => {
        if(localStorage.getItem("id") === comment.id) {
            return(
                <div>
                    <Update onClick={goUpdate}>수정</Update>
                    <Delete onClick={onDelete}>삭제</Delete>
                </div>
            )
        }
    }
    return (
        <Comment>
            <ID><b>{comment.id}</b>&nbsp;&nbsp;&nbsp;{comment.com_time.replace('T', ' ')}</ID><p /><br />
            {diffContent()}
            {diffButton()}
            <p />
        </Comment>
    );
}