import React, { useState } from 'react';
import styled from 'styled-components';
import UpperLayer from '../components/UpperLayer';
import EachBoard from '../components/EachBoard';

const SideBanner = styled.div`
    position:absolute; left:50px; top:200px;
    width:200px; height:600px;
    border-right:2px solid gray;  
`

const SideButton = styled.button`
    width:200px; height:50px;
    border:0px; background:white;
    font-size:20px; text-align:center;
`

export default function MainPage() {
    const [category, setCategory] = useState("전체");
    
    const diffCategory = (e) => {
        setCategory(e.target.value);
    }

    return(
        <div>
            <UpperLayer />
            <SideBanner>
                <p />
                <SideButton value="전체" onClick={diffCategory}>전체 게시판</SideButton><p />
                <SideButton value="자유" onClick={diffCategory}>자유 게시판</SideButton><p />
                <SideButton value="스포츠" onClick={diffCategory}>스포츠 게시판</SideButton><p />
                <SideButton value="홍보" onClick={diffCategory}>홍보 게시판</SideButton><p />
            </SideBanner>
            <EachBoard key={category} category={category} />
        </div>
    );
}