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
    const [type, setType] = useState("all");
    
    const diffType = (e) => {
        setType(e.target.value);
    }

    return(
        <div>
            <UpperLayer />
            <SideBanner>
                <p />
                <SideButton value="all" onClick={diffType}>전체 게시판</SideButton><p />
                <SideButton value="free" onClick={diffType}>자유 게시판</SideButton><p />
                <SideButton value="sports" onClick={diffType}>스포츠 게시판</SideButton><p />
                <SideButton value="promote" onClick={diffType}>홍보 게시판</SideButton><p />
            </SideBanner>
            <EachBoard type={type} />
        </div>
    );
}