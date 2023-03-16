import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import api from '../JWT/customAPI';
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
    position: absolute; top:550px; left:400px;
    width:100px; height:55px;
    color:gray; font-size:20px; font-weight:600;
    border-radius:5px; border:2px solid gray;
`

const GoMain = styled.button`
    position: absolute; top:550px; left:550px;
    width:100px; height:55px;
    color:gray; font-size:20px; font-weight:600;
    border-radius:5px; border:2px solid gray;
`

const GoMain2 = styled.button`
    position: absolute; top:550px; left:700px;
    width:100px; height:55px;
    color:gray; font-size:20px; font-weight:600;
    border-radius:5px; border:2px solid gray;
`

const Like = styled.button`
    position: absolute; top:550px; left:950px;
    width:100px; height:55px;
    color:gray; font-size:20px; font-weight:600;
    border-radius:5px; 
    border: ${props => props.like ? '3px solid blue' : '2px solid gray'};
`

const CommentLayer = styled.div`
    position: absolute; top:700px; left:0px;
    width:120px;
    font-size:30px; font-weight:600;
    border-bottom:1px solid black;
`

const EnterComment = styled.textarea`
    position: absolute; top:750px; left:0px;
    width:1050px; height:100px;
    font-size:16px;
`

const AddComment = styled.button`
    position: absolute; top:700px; left:990px;
    width:70px; height: 40px;
    font-size:20px; font-weight:600;
    border: 2px solid gray; border-radius:10px;
`

const CommentLayer2 = styled.div`
    position: absolute; top:900px; left:0px;
    width:120px;
    font-size:30px; font-weight:600;
    border-bottom:1px solid black;
`

const CommentList = styled.div`
    position:absolute; top:950px; left:0px;
    display: grid; flex-direction: row;
    padding-bottom:50px;
`

export default function ViewPage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [post, setPost] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [like, setLike] = useState(false);
    useEffect(()=>{
        api.get('/post/get', {
            params: {postID: location.state.postID},
            headers: { Authorization: localStorage.getItem("grantType") + localStorage.getItem("accessToken") }
        })
        .then((response)=>{setPost(response.data)})
        .catch((error)=>{console.log(error)})
    },[location.state.postID, like])
    useEffect(()=>{
        api.get('/comment/get', {
            params: {postID: location.state.postID},
            headers: { Authorization: localStorage.getItem("grantType") + localStorage.getItem("accessToken") }
        })
        .then((response)=>{setCommentList(response.data)})
        .catch((error)=>{console.log(error)})
    },[location.state.postID])
    useEffect(()=>{
        api.get('/likes/check', {
            params: { postID: location.state.postID, id: localStorage.getItem("id") },
            headers: { Authorization: localStorage.getItem("grantType") + localStorage.getItem("accessToken") }
        })
        .then((response) => { setLike(response.data) })
        .catch((error) => {console.log(error)})
    }, [like])

    const onLike = () => {
        if(like === false) {
            setLike(true);
            api.post('/post/like', {
                postID: location.state.postID,
                id: localStorage.getItem("id")
            }, {
                headers: { 
                    "Content-Type" : "application/json",
                    Authorization: localStorage.getItem("grantType") + localStorage.getItem("accessToken") 
                }
            })
            .then()
            .catch((error) => {console.log(error)});
        }
        else {
            setLike(false);
            api.post('/post/like_cancel', {
                postID: location.state.postID,
                id: localStorage.getItem("id")
            }, {
                headers: { 
                    "Content-Type" : "application/json",
                    Authorization: localStorage.getItem("grantType") + localStorage.getItem("accessToken") 
                }
            })
            .then()
            .catch((error) => {console.log(error)});
        }
    }
    
    
    const [comment, setComment] = useState("");
    const onChange = (e) => {
        setComment(e.target.value);
    }
    const onMain = () => {
        navigate('/main');
    }
    const onDelete = () => {
        if(window.confirm("게시글을 삭제하시겠습니까?")) {
            alert("게시글이 삭제되었습니다.")
            api.delete("/post/delete", {
                params: { postID: location.state.postID },
                headers: { Authorization: localStorage.getItem("grantType") + localStorage.getItem("accessToken") }
            })
            .then(navigate('/main'))
            .catch((error)=>{console.log(error)})
        } else {
            
        }
    }

    const diffButton = () => {
        if(localStorage.getItem("id") === post.id) {
            return(
                <div>
                    <Like onClick={onLike} like={like}>좋아요👍 {post.likes}</Like>
                    <Link to={`/update/${location.state.postID}`} state={{
                        data: post
                    }}><GoUpdate>글 수정</GoUpdate></Link>
                    <GoMain onClick={onDelete}>글 삭제</GoMain>
                    <GoMain2 onClick={onMain}>목록으로</GoMain2>
                </div>
            );
        } else {
            return (
                <div>
                    <Like>좋아요</Like>
                    <GoMain onClick={onMain}>목록으로</GoMain>
                </div>
            );
        }
    }

    const onEnter = () => {
        if(comment === "") alert("댓글을 입력하세요.");
        else {
            alert("댓글이 입력되었습니다.");
            api.post('/comment/write', {
                postID: location.state.postID,
                id: localStorage.getItem("id"),
                content: comment
            }, { 
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: localStorage.getItem("grantType") + localStorage.getItem("accessToken")
                }
            })
            .then(window.location.reload())
            .catch((error)=>{console.log(error)})
        }
    }

    return(
        <>
            <UpperLayer />
            <TitleContainer>게시글 조회</TitleContainer>
            <Container>
                <TitleLayer>제목</TitleLayer>
                <Title type="text" name="title" value={post.title} placeholder="제목" disabled />
                <CategoryLayer>카테고리</CategoryLayer>
                <Category type="text" name="category" value={post.category} placeholder="카테고리" disabled />
                <ContentLayer>내용</ContentLayer>
                <Content name="content" value={post.content} placeholder="내용" disabled />
                {diffButton()}
                <CommentLayer>댓글 달기</CommentLayer>
                <EnterComment onChange={onChange} value={comment} placeholder="댓글을 입력하세요."/>
                <AddComment onClick={onEnter}>입력</AddComment>
                <CommentLayer2>댓글({commentList.length})</CommentLayer2>
                <CommentList>
                    {
                        commentList.map((item) => {
                            return(
                                <EachComment comment={item} />
                            )
                        })
                    }
                </CommentList>
            </Container>
        </>
    );
}   