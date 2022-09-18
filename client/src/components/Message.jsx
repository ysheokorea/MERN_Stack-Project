import React from 'react'
import styled from 'styled-components'
import {format} from 'timeago.js'

const Container = styled.div`
    display : flex;
    flex-direction : column;
    margin-top : 20px;
`

const MessageTop = styled.div`
    display : flex;
    align-items : center;
    gap : 10px;
`;

const Avatar = styled.img`
    width : 32px;
    height : 32px;
    border-radius : 50%;
    object-fit : cover;
    
`;

const MessageText = styled.p`
    padding : 10px;
    border-radius : 20px;
    background-color : green;
    color : white;
    max-width : 300px;
`;

const MesasgeBottom = styled.div`
    font-size : 12px;
    margin-top : 10px;
`;

export default function Message({message, own}) {

  return (
    <Container style={own ? {alignItems : "flex-end"} : {}}>
        <MessageTop>
            <Avatar src="https://img.hankyung.com/photo/202206/BF.30386175.1.jpg"/>
            <MessageText style={own ? {backgroundColor : "#D0D0D0", color : "#111"} : {}}>{message?.text}</MessageText>
        </MessageTop>
        <MesasgeBottom>
            {format(message?.createdAt)}
        </MesasgeBottom>
    </Container>
  )
}
