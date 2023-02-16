import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import UpperLayer from '../components/UpperLayer';

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

const Category = styled.select`
    position: absolute; left:150px; top:100px;
    width:907px; height:50px;
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

const Write = styled.button`
    position: absolute; top: 550px; left:550px;
    width:100px; height:50px;
    color:gray; font-size:20px; font-weight:600;
    border-radius:5px; border:2px solid gray;
`

export default function WritePage() {
    const navigate = useNavigate();
    const selectList = ["자유 게시판", "스포츠 게시판", "홍보 게시판"];
    const [selected, setSelected] = useState("");
    const [Inputs, setInput] = useState({
        title: "", content: ""
    });
    const {title, content} = Inputs;
    const onSelect = (e) => {
        setSelected(e.target.value);
    }
    const onChange = (e) => {
        const {value, name} = e.target;
        setInput({
            ...Inputs,
            [name]: value
        });
    }
    const onWrite = () => {
        if(window.confirm("게시글을 등록하시겠습니까?")) {
            if(title === "") alert("제목을 입력하세요.");
            else if(content === "") alert("내용을 입력하세요.");
            else {
                alert("게시글이 등록되었습니다.");
                navigate('/main');
            }
        }
    }
    return(
        <>
            <UpperLayer />
            <TitleContainer>게시글 작성</TitleContainer>
            <Container>
                <TitleLayer>제목</TitleLayer>
                <Title type="text" name="title" value={title} placeholder=" 제목" onChange={onChange} />
                <CategoryLayer>카테고리</CategoryLayer>
                <Category onChange={onSelect} value={selected}>
                    {
                        selectList.map((item) => (
                            <option value={item} key={item}>{item}</option>
                        ))
                    }
                </Category>
                <ContentLayer>내용</ContentLayer>
                <Content name="content" value={content} placeholder=" 내용" onChange={onChange} />
                <Write onClick={onWrite}>글 작성</Write>
            </Container>
        </>
    );
}