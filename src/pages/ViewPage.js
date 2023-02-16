import React, {useState} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import UpperLayer from '../components/UpperLayer';
import EachComment from '../components/EachComment';

const TitleContainer = styled.div`
    position: absolute; width: 560px; height: 80px; left:500px; top: 70px;
    display:flex; justify-content: center; align-items: center; 
    border-bottom: 1px solid black;
    font-weight: 500; font-size: 40px; 
`

const Container = styled.div`
    position: relative; left:200px; top:100px;
    width:1200px; height:600px;
    font-size:18px;
    display:flex; justify-content:center;
`

const TitleLayer = styled.div`
    position: absolute; left:0px; top:30px;
    width:120px; height:50px;
    font-size:30px; font-weight:600;
    text-align:right;
`

const Title = styled.input`
    position: absolute; left:150px; top:30px;
    width:900px; height:50px;
    font-size:20px;
`

const CategoryLayer = styled.div`
    position: absolute; left:0px; top:100px;
    width:120px; height:50px;
    font-size:30px; font-weight:600;
    text-align:right;
`

const Category = styled.input`
    position: absolute; left:150px; top:100px;
    width:900px; height:50px;
    font-size:20px;
`

const ContentLayer = styled.div`
    position: absolute; left:0px; top:170px;
    width:120px; height:50px;
    font-size:30px; font-weight:600;
    text-align:right;
`

const Content = styled.textarea`
    position: absolute; left:150px; top:170px;
    width:900px; height:350px;
    font-size:20px;
    white-space: pre-wrap;
`

const GoUpdate = styled.button`
    position: absolute; top:550px; left:450px;
    width:100px; height:50px;
    color:gray; font-size:20px; font-weight:600;
    border-radius:5px; border:2px solid gray;
`

const GoMain = styled.button`
    position: absolute; top:550px; left:650px;
    width:100px; height:50px;
    color:gray; font-size:20px; font-weight:600;
    border-radius:5px; border:2px solid gray;
`

const GoMain2 = styled.button`
    position: absolute; top:550px; left:550px; 
    width:100px; height:50px;
    color:gray; font-size:20px; font-weight:600;
    border-radius:5px; border:2px solid gray;
`

const CommentLayer = styled.div`
    position: absolute; top:620px; left:0px;
    width:120px;
    font-size:30px; font-weight:600;
    border-bottom:1px solid black;
`

const EnterComment = styled.textarea`
    position: absolute; top:670px; left:0px;
    width:1050px; height:100px;
    font-size:16px;
`

const AddComment = styled.button`
    position: absolute; top:620px; left:990px;
    width:70px; height: 40px;
    font-size:20px; font-weight:600;
    border: 2px solid gray; border-radius:10px;
`

const CommentLayer2 = styled.div`
    position: absolute; top:800px; left:0px;
    width:120px;
    font-size:30px; font-weight:600;
    border-bottom:1px solid black;
`

const CommentList = styled.div`
    position:absolute; top:850px; left:0px;
    display: grid; flex-direction: row;
`

const user = "jiwoo";

export default function ViewPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const dummyData = {
        postID: location.state.postID,
        id: "jiwoo",
        title: "제목입니다",
        content: "내용입니다",
        category: "자유 게시판",
        up_time: "2023-02-14 19:35:00",
        likes: 0,
        unlikes: 0
    }
    const commentlist = [
        {id: "user1", content: "댓글1", date: "2023-02-14 20:55:00"},
        {id: "user2", content: "댓글2", date: "2023-02-14 20:56:00"},
        {id: "user3", content: "댓글3", date: "2023-02-14 20:57:00"},
        {id: "user4", content: "댓글4", date: "2023-02-14 20:58:00"},
        {id: "user5", content: "댓글5", date: "2023-02-14 20:59:00"},
        {id: "user6", content: "댓글6", date: "2023-02-14 21:00:00"}
    ];
    const [comment, setComment] = useState("");
    const onChange = (e) => {
        setComment(e.target.value);
    }
    const onMain = () => {
        navigate('/main');
    }
    const diffButton = () => {
        if(user === dummyData.id) {
            return(
                <div>
                    <Link to={`/update/${location.state.postID}`} state={{
                        data: dummyData
                    }}><GoUpdate>글 수정</GoUpdate></Link>
                    <GoMain onClick={onMain}>목록으로</GoMain>
                </div>
            );
        } else {
            return (
                <div><GoMain2 onClick={onMain}>목록으로</GoMain2></div>
            );
        }
    }
    const onEnter = () => {
        if(comment === "") alert("댓글을 입력하세요.");
        else {
            alert("댓글이 입력되었습니다.");
            setComment("");
        }
    }

    return(
        <>
            <UpperLayer />
            <TitleContainer>게시글 조회</TitleContainer>
            <Container>
                <TitleLayer>제목</TitleLayer>
                <Title type="text" name="title" value={dummyData.title} placeholder="제목" disabled />
                <CategoryLayer>카테고리</CategoryLayer>
                <Category type="text" name="category" value={dummyData.category} placeholder="카테고리" disabled />
                <ContentLayer>내용</ContentLayer>
                <Content name="content" value={dummyData.content} placeholder="내용" disabled />
                {diffButton()}
                <CommentLayer>댓글 달기</CommentLayer>
                <EnterComment onChange={onChange} value={comment} placeholder="댓글을 입력하세요."/>
                <AddComment onClick={onEnter}>입력</AddComment>
                <CommentLayer2>댓글({commentlist.length})</CommentLayer2>
                <CommentList>
                    {
                        commentlist.map((item) => {
                            return(
                                <EachComment id={item.id} content={item.content} date={item.date} />
                            )
                        })
                    }
                </CommentList>
            </Container>
        </>
    );
}   