import React from 'react'
import styled from 'styled-components'


const Container = styled.div`

    margin : 0px 0px 10px 10px;
`

const ContainerWrapper = styled.div`

    display : flex;
    align-items : center;
    font-weight: 500;
    cursor : pointer;
`

const ImaContainer = styled.div`
    position : relative;
    margin-right : 10px;

`

const Avatar = styled.img`
    width: 40px;
    height : 40px;
    border-radius : 50%;
    object-fit : cover;
    border : 1px solid white;
`;

const Badge = styled.div`
    position : absolute;
    width: 10px;
    height: 10px;
    border-radius : 50%;
    background-color : limegreen;
    top : 0;
    right : 0;
`;

const Name = styled.span``;

export default function ChatOnline() {
  return (
    <Container>
        <ContainerWrapper>
            <ImaContainer>
                <Avatar src="https://cdn.spotvnews.co.kr/news/photo/202204/520937_728045_5426.jpg"/>
                <Badge></Badge>
            </ImaContainer>
            <Name>Sooji</Name>
        </ContainerWrapper>
    </Container>
  )
}
