import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';
import UpperLayer from '../components/UpperLayer';
import EachPost from '../components/EachPost';
import '../css/Paging.css';

const Container = styled.div`
    position: relative; left:300px; top:50px;
    width:1000px;
    border: 2px solid black;
`

const Layer = styled.div`
    position:relative; width:100%; height:50px;
    border-bottom:1px solid black;
    font-size:20px; font-weight:600;
    display:flex; justify-content:left; align-items:center;
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
    {num: 1, title: "제목1", author: "작성자1", date: "2023-02-01"},
    {num: 2, title: "제목2", author: "작성자2", date: "2023-02-02"},
    {num: 3, title: "제목3", author: "작성자3", date: "2023-02-03"},
    {num: 4, title: "제목4", author: "작성자4", date: "2023-02-04"},
    {num: 5, title: "제목5", author: "작성자5", date: "2023-02-05"},
    {num: 6, title: "제목6", author: "작성자6", date: "2023-02-06"},
    {num: 7, title: "제목7", author: "작성자7", date: "2023-02-07"},
    {num: 8, title: "제목8", author: "작성자8", date: "2023-02-08"},
    {num: 9, title: "제목9", author: "작성자9", date: "2023-02-09"},
    {num: 10, title: "제목10", author: "작성자10", date: "2023-02-10"},
    {num: 11, title: "제목11", author: "작성자11", date: "2023-02-11"}
];

export default function MainPage() {
    const [page, setPage] = useState(1);
    const limit = 10; // posts가 보일 최대한의 갯수
    const offset = (page-1)*limit; // 시작점과 끝점을 구하는 offset

    return(
        <>
            <UpperLayer />
            <Container>
                <Layer>
                    <Number>번호</Number><Title>제목</Title><Author>작성자</Author><Date>작성날짜</Date>
                </Layer>
                {
                    dummyData.slice(offset, offset+limit)
                    .map((data) => (
                        <EachPost num={data.num} title={data.title} author={data.author} date={data.date} />
                    ))
                }
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
        </>
    );
}