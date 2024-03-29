// Arquivo criado: 01/12/2022 às 19:20

import Button from 'components/atoms/Button/';
import ImageDefault from 'components/atoms/ImageDefault';
import MiniTitle from 'components/atoms/MiniTitle';
import SubTitle from 'components/atoms/SubTitle';
import { Comment } from 'interfaces/Comment';
import { Content } from 'interfaces/Content';
import React, { Component, Dispatch, SetStateAction } from 'react';
import backEnd from 'utils/backEnd';
import CommentArea from '../CommentArea';
import * as S from './styles';


interface Props {
  content: Content
  setStage: Dispatch<SetStateAction<string>>
  comments?: Comment[]
}


export default class ClassAvaliationRoom extends Component<Props> {

  content: Content
  setStage: Dispatch<SetStateAction<string>>

  state = {
    comments: []
  }


  constructor(props: Props) {
    super(props)
    this.content = props.content
    this.setStage = props.setStage
  }

  componentDidMount(): void {

    backEnd(`/comentarios/${this.content.id}`, 'GET', false).then(res => {
      if (res.status === 200) {
        this.setState({ comments: res.data })
      }
    })


  }

  handleButton = () => {
    this.setStage('avaliation')
  }

  render(): JSX.Element {
    return (
      <S.Wrapper>
        <S.TitleContainer id='title-container'>
          <SubTitle>{this.content.title}</SubTitle>
        </S.TitleContainer>
        <S.ImageContainer>
          <ImageDefault src={this.content.src} altText={this.content.alt} />
        </S.ImageContainer>
        <MiniTitle span={'Descrição: '} text={this.content.description} />
        {this.state.comments.length > 0 && (
          <>
            <S.TitleCommentContainer>
              <MiniTitle span={'Comentários'} />
            </S.TitleCommentContainer>
            <S.CommentContainer>
              {this.state.comments.map((val: Comment, index: number) => (
                <CommentArea key={index} name={val.user_name} comment={val.description} star={val.avaliation} />
              ))}
            </S.CommentContainer>
          </>
        )}
        <S.ButtonContainer>
          <Button action={this.handleButton}>Avaliar quarto</Button>
        </S.ButtonContainer>
      </S.Wrapper>
    )
  }

}
