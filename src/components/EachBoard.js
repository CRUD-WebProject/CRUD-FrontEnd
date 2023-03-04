import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import EachPost from '../components/EachPost';
import '../css/Paging.css';

const TitleContainer = styled.div`
    position: absolute; width: 560px; height: 80px; left:500px; top: 70px;
    display:flex; justify-content: center; align-items: center; 
    border-bottom: 1px solid black;
    font-weight: 500; font-size: 40px; 
`

const Container = styled.div`
    position: relative; left:300px; top:180px;
    width:1000px; height:600px;
    margin-bottom:50px;
`

const Write = styled.button`
    position:absolute; left:1200px; top:200px; width:100px; height:40px;
    color:gray; font-size:20px; font-weight:600;
    border-radius:5px; border:2px solid gray;   
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

export default function EachBoard({category}) {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10; // posts가 보일 최대한의 갯수
    const offset = (page-1)*limit; // 시작점과 끝점을 구하는 offset
    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get(`/post/list`, {
            params: {category: category}
        })
        .then((response)=>{
            setData(response.data);
        })
        .catch((error)=>console.log(error));
    },[category])

    const onChange = (e) => {
        setSearch(e.currentTarget.value);
    } 
    const GoWrite = () => {
        navigate('/write');
    }

    var diffTitle;
    if(category === "전체") diffTitle = "전체 게시판";
    else if(category === "자유") diffTitle = "자유 게시판";
    else if(category === "스포츠") diffTitle = "스포츠 게시판";
    else if(category === "홍보") diffTitle = "홍보 게시판";

    var i=0;
    let eachPost = data?.filter((p) => p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    .reverse().slice(offset, offset+limit)
    ?.map((d) => {
        i=i+1;
        return(
            <EachPost num={i} postID={d.postID} title={d.title} id={d.id} date={d.up_time} />
        )
    });

    return(
        <div>
            <TitleContainer>{diffTitle}</TitleContainer>
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
                        totalItemsCount={data.length}
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