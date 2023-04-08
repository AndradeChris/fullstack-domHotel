// Arquivo criado: 15/12/2022 às 20:47
import { Content } from 'interfaces/Content'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Anchor from '../../components/atoms/Anchor'
import DescriptionParagraph from '../../components/atoms/DescriptionParagraph'
import ImageDefault from '../../components/atoms/ImageDefault'
import PrincipalTitle from '../../components/atoms/PrincipalTitle'
import SubTitle from '../../components/atoms/SubTitle'
import ModalAvaliationRoom from '../../components/organisms/ModalAvaliationRoom'
import { content } from './data'
import * as S from './styles'

const Home = () => {

  const [showModal, setShowModal] = useState(false)
  const [actualImage, setActualImage] = useState<Content>({
    title: '',
    src: '',
    alt: '',
    description: '',
    id: 0
  })

  // passei como any porq tem um campo em especifico com outro nome.
  const handleShowComments = (img: any) => {
    setShowModal(true)
    setActualImage({
      ...img,
      description: img.titleDescription
    })
  }

  const test = async () => {
    const payload = {
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRmxhdmlhbm8iLCJlbWFpbCI6ImZsYXZpYW5vQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2ODA5ODg2NDcsImV4cCI6MTY4MDk4OTU0N30.PKLEqa20frNtHis82--0mK-pcyYFClftedFVnyJDyx0"

    }

    try {
      const response = await fetch(`http://localhost:3002/refresh-token`, {
        method: 'POST', headers: {
          'X-Powered-By': 'Express',
          'Content-Type': 'application/json',
          'Connection': 'keep-alive',
          'Keep-Alive': 'timeout=5',
        },
        body: JSON.stringify(payload)
      })
      const result = await response.json()
      console.log('refresh token', result.data)
    } catch (error) {
      console.log('erro', error);

    }
  }

  return (
    <>
      <Helmet>
        <title>DOM Hotel - Home</title>
        <meta name='description' content='DOM Hotel - Inicio' />
      </Helmet>
      <S.Wrapper>
        <PrincipalTitle>{content.section1.title}</PrincipalTitle>
        <button onClick={test}>testeeeeeee</button>
        <DescriptionParagraph msg={content.section1.description} />
        <SubTitle>{content.section2.title}</SubTitle>
        <S.AccommodationContainer>
          <S.ImageContainer>
            {content.section1.imageCollection.map((img, index) => (
              <ImageDefault onClick={() => handleShowComments(img)} key={index} src={img.src} />
            ))}
          </S.ImageContainer>
          <DescriptionParagraph msg={content.section2.description} />
          <Anchor msg={content.section2.link} href={content.section2.path} />
        </S.AccommodationContainer>
        <S.GastronomyContainer>
          <S.GastronomyDescription>
            <SubTitle>{content.section3.title}</SubTitle>
            <DescriptionParagraph msg={content.section3.description1} />
            <DescriptionParagraph msg={content.section3.description2} />
          </S.GastronomyDescription>
          <S.GastronomyImage>
            <ImageDefault src={content.section3.image.src} />
          </S.GastronomyImage>
        </S.GastronomyContainer>
      </S.Wrapper>

      <ModalAvaliationRoom
        showModal={showModal}
        setShowModal={setShowModal}
        actualImage={actualImage}
      />
    </>
  )
}

export default Home
