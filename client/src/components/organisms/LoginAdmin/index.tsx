import Button from 'components/atoms/Button'
import GenericInput from 'components/atoms/GenericInput'
import GenericLabel from 'components/atoms/GenericLabel'
import MiniTitle from 'components/atoms/MiniTitle'
import Modal from 'components/atoms/Modal'
import React, { useEffect, useState } from 'react'
import backEnd from 'utils/backEnd'
import { validateEmail } from 'utils/validateFields'
import * as S from './styles'

interface Props {
  setIsLogged: (isLogged: boolean) => void
}

interface LoginArr {
  email: string
  password: string
}

const LoginAdmin = ({ setIsLogged }: Props) => {


  const [valueField, setValueFields] = useState({
    email: '',
    password: ''
  })

  const [errorFields, setErrosFields] = useState({
    email: false,
    password: false
  })

  const [showModal, setShowModal] = useState(false)
  const [messageModal, setMessageModal] = useState('')

  const handleShowMessage = (msg: string) => {
    setShowModal(true)
    setMessageModal(msg)
  }

  const handleEmail = (value: string) => {
    setValueFields((prev) => ({ ...prev, email: value }))
    if (validateEmail(valueField.email)) {
      setErrosFields((prev) => ({ ...prev, email: true }))
      return
    }
    setErrosFields((prev) => ({ ...prev, email: false }))
  }

  const handlePassword = (value: string) => {
    setValueFields((prev) => ({ ...prev, password: value }))
    setErrosFields((prev) => ({ ...prev, password: false }))
  }

  const actionSignIn = async (data: LoginArr) => {
    if (data.email === '' || data.password === '') {
      if (data.email === '') {
        setErrosFields((prev) => ({ ...prev, email: true }))
      }
      if (data.password === '') {
        setErrosFields((prev) => ({ ...prev, password: true }))
      }
      return
    }


    await backEnd('/login?admin', 'POST', false, { email: data.email, password: data.password }).then(res => {

      if (res.status === 200) {
        setIsLogged(true)
        sessionStorage.setItem('isLoggedAdmin', JSON.stringify({
          ...res.data,
          email: data.email,
          isLogged: true,
          token: res.token,
          id_user: res.data.id_user
        }))

      } else {
        handleShowMessage(res.message)
        setIsLogged(false)
      }


    }).catch(err => {
      handleShowMessage(err.message)
    })

  }

  const handleButton = () => {
    const data = {
      email: valueField.email,
      password: valueField.password
    }
    actionSignIn(data)
  }

  const inputsSignIn = [
    {
      id: 'email-login',
      label: 'E-mail:',
      method: handleEmail,
      model: errorFields.email,
      valueId: 'email',
      type: 'email'
    },
    {
      id: 'password-login',
      label: 'Senha:',
      method: handlePassword,
      model: errorFields.password,
      valueId: 'password',
      type: 'password'
    }
  ]

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedAdmin')) {
      const result = JSON.parse(sessionStorage.getItem('isLoggedAdmin') as string)
      setIsLogged(result.isLogged)
      return
    }
    setIsLogged(false)

  }, [])

  return (
    <>
      <S.Wrapper>
        <S.WrapperLogin>
          <MiniTitle text='Login Admin' />
          {inputsSignIn.map((element, index) => (
            <S.ContainerInputSignIn key={index}>
              <GenericLabel for={element.id}>{element.label}</GenericLabel>
              {/* @ts-ignore */}
              <GenericInput type={element.type} id={element.id} onChange={(e) => element.method(e.target.value)} error={element.model} value={valueField[`${element.valueId}`]} />
            </ S.ContainerInputSignIn>
          ))}
          <Button disabled={(errorFields.email || errorFields.password)} action={handleButton}>Entrar</Button>
        </S.WrapperLogin>
      </S.Wrapper>

      <Modal isOpen={showModal} setIsOpen={setShowModal}>
        <S.tittleAviso>{messageModal}</S.tittleAviso>
      </Modal>
    </>
  )
}

export default LoginAdmin