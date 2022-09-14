import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display : flex;
  align-items : center;
  border-radius : 5px;
  padding : 10px;
  margin : 10px;
  gap : 10px;
  &:hover {
    background-color : #EEE;
  }
`

const Avatar = styled.img`
    height : 40px;
    width : 40px;
    border-radius : 50%;
    object-fit : cover;
`

const ConversationName = styled.span`
  font-weight: 500;
`

export default function Conversation() {
  return (
    <Container>
        <Avatar src="https://image.ajunews.com/content/image/2022/07/06/20220706160753669738.jpg"/>
        <ConversationName>Anna Chris</ConversationName>
    </Container>
  )
}
