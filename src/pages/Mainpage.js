import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';
import UpperLayer from '../components/UpperLayer';
import EachPost from '../components/EachPost';
import SearchBar from '../components/SearchBar';
import '../css/Paging.css';

const Container = styled.div`
    position: relative; left:300px; top:180px;
    width:1000px; height:600px;
    margin-bottom:50px;
`

const TitleContainer = styled.div`
    position: absolute; width: 560px; height: 80px; left:500px; top: 70px;
    display:flex; justify-content: center; align-items: center; 
    border-bottom: 1px solid black;
    font-weight: 500; font-size: 40px; 
`

const Layer = styled.div`
    position:relative; width:100%; height:50px;
    border-bottom:1px solid black;
    font-size:20px; font-weight:600;
    display:flex; justify-content:left; align-items:center;
`

const Write = styled.button`
    position:absolute; left:1200px; top:200px; width:100px; height:40px;
    color:gray; font-size:20px; font-weight:600;
    border-radius:5px; border:2px solid gray;   
`

const Number = styled.div`
    position:absolute; left:0px;
    width:10%; height:30px;
    padding-left:30px; padding-top:10px;
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

const Paging = styled.div`
    display:flex; justify-content:center; margin-top:15px;
`

const dummyData = [
    {postID: 1, title: "제목1", id: "작성자1", date: "2023-02-01"},
    {postID: 2, title: "제목2", id: "작성자2", date: "2023-02-02"},
    {postID: 3, title: "제목3", id: "작성자3", date: "2023-02-03"},
    {postID: 4, title: "제목4", id: "작성자4", date: "2023-02-04"},
    {postID: 5, title: "제목5", id: "작성자5", date: "2023-02-05"},
    {postID: 6, title: "제목6", id: "작성자6", date: "2023-02-06"},
    {postID: 7, title: "제목7", id: "작성자7", date: "2023-02-07"},
    {postID: 8, title: "제목8", id: "작성자8", date: "2023-02-08"},
    {postID: 9, title: "제목9", id: "작성자9", date: "2023-02-09"},
    {postID: 10, title: "제목10", id: "작성자10", date: "2023-02-10"},
    {postID: 11, title: "제목11", id: "작성자11", date: "2023-02-11"}
];

export default function MainPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10; // posts가 보일 최대한의 갯수
    const offset = (page-1)*limit; // 시작점과 끝점을 구하는 offset
       
    function onChange(e) {
        setSearch(e.currentTarget.value);
    } 

    function GoWrite() {
        navigate('/write');
    }

    var i=0;
    let eachPost = dummyData.filter((p) => p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    .reverse().slice(offset, offset+limit)
    ?.map((data) => {
        i=i+1;
        return(
            <EachPost postID={data.postID} title={data.title} id={data.id} date={data.date} />
        )
    });
    return(
        <div>
            <UpperLayer />
            <TitleContainer>전체 게시판</TitleContainer>
            <SearchBar search={search} onChange={onChange} />
            <Write onClick = {GoWrite}>글작성</Write>
            <Container>
                <Layer>
                    <Number>번호</Number><Title>제목</Title><Author>작성자</Author><Date>작성날짜</Date>
                </Layer>
                {eachPost}
                <Paging>
                    <Pagination 
                        activePage={page}
                        itemsCountPerPage={limit}
                        totalItemsCount={dummyData.length}
                        pageRangeDisplayed={5}
                        prevPageText={"<"}
                        nextPageText={">"}
                        onChange={setPage}
                    />
                </Paging>
            </Container>
        </div>
    );
}