// Arquivo criado: 10/12/2022 às 11:55

import React from 'react'
import pallete from '../../../pallete'
import * as S from './styles'


/**
 * 
 * @param {boolean} useDefaultStyle - Se false, o componente não usa o estilo padrão.
 * @param {string} className - Classe CSS do componente.
 * @param {boolean} disabled - Se true, o componente fica desabilitado.
 * @param {string} name - Nome do componente.
 * @param {string} id - Id do componente.
 * @param {string} width - Largura do componente.
 * @param {string} children - Conteúdo do componente.
 * @param {string} backgroundColor - Cor de fundo do componente.
 * @param {string} hoverColor - Cor de fundo do componente quando o mouse está sobre ele.
 * @param {string} color - Cor do texto do componente.
 * @param {string} paddingHorizontal - Padding horizontal do componente.
 * @param {string} paddingVertical - Padding vertical do componente.
 * @param {function} action - Função que será executada quando o componente for clicado.
 * @param {string} href - Link do componente caso queira que ele seja um link.
 * @param {string} target - Alvo do link do componente (caso ele seja um link).
 * 
 * @returns {JSX.Element} - Componente Button.
 * 
 * @example
 * 
 * <Button
 *   useDefaultStyle={true}
 *   className='className'
 *   disabled={false}
 *   name='name'
 *   id='id'
 *   width='100%'
 *   backgroundColor='#000'
 *   hoverColor='#000'
 *   color='#000'
 *   paddingHorizontal='20px'
 *   paddingVertical='15px'
 *   action={() => console.log('Clicou')}
 *   href='https://www.google.com'
 *   target='_blank'
 * >
 *  Conteúdo
 * </Button>
 * 
 */

interface Props {
  useDefaultStyle?: boolean
  className?: string
  disabled?: boolean
  name?: string
  id?: string
  width?: string
  children: React.ReactNode
  backgroundColor?: string
  hoverColor?: string
  color?: string
  paddingHorizontal?: string
  paddingVertical?: string
  action?: () => void
  href?: string
  target?: string
}

const Button = ({
  useDefaultStyle = true,
  children,
  color = pallete.fontColorAlternative,
  backgroundColor = pallete.greenDefault,
  hoverColor = pallete.greenDark,
  className,
  disabled = false,
  name,
  id,
  width,
  paddingHorizontal = '20px',
  paddingVertical = '15px',
  action,
  href,
  target = '_self'
}: Props) => {

  const Component = useDefaultStyle ? S.button : S.empty

  const handleClick = (a: Event) => {
    if (action) {
      a.preventDefault()
      action()
    }
  }

  return (
    <Component

      // Atributos do styled-components
      width={width}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      color={color}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      as={href ? 'a' : 'button'}

      // Atributos padrões do HTML
      className={className}
      name={name}
      id={id}
      // @ts-expect-error
      onClick={handleClick}
      href={href}
      target={target}

      // os dois
      disabled={disabled}

    >
      {children}
    </Component>
  )
}

export default Button