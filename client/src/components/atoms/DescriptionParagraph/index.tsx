// Arquivo criado: 10/12/2022 às 11:55

import React from 'react'
import * as S from './styles'


/**
 * 
 * @param {string} msg - Texto que será exibido no parágrafo
 * @param {string} className - Você pode passar uma classe para estilizar o parágrafo se quiser
 * @param {boolean} useDefaultStyle - Define se o parágrafo terá o estilo padrão
 * @param {string} textTransform - Define o text-transform do parágrafo
 * 
 * 
 * @returns {JSX.Element} - Retorna o componente parágrafo
 * 
 * @example
 * 
 * <DescriptionParagraph
 *   msg='Parágrafo' // required
 *   className='my-class'
 *   useDefaultStyle={false}
 *   textTransform='uppercase'
 * 
 * />
 * 
 */

interface Props {
  msg: string | JSX.Element
  className?: string
  useDefaultStyle?: boolean
  textTransform?: string
}

export default function DescriptionParagraph({
  msg,
  className,
  useDefaultStyle = true,
  textTransform = 'none'
}: Props) {

  const Component = useDefaultStyle ? S.p : 'p'

  return (
    <Component

      // Atributos do styled-components
      textTransform={textTransform}

      // Atributos do HTML
      className={className}
    >
      {msg}
    </Component>
  )
}
