// Arquivo criado: 19/01/2023 às 15:43
import React, { useEffect, useState } from 'react'
import ConsumoAdmin from '../ConsumoAdmin'
import FuncionariosAdmin from '../FuncionariosAdmin'
import HeaderAdmin from '../HeaderAdmin'
import HomeAdmin from '../HomeAdmin'
import ReservasAdmin from '../ReservasAdmin'


const ControllerAdmin = () => {

  const [page, setPage] = useState('home')
  const [component, setComponent] = useState(<HomeAdmin />)


  useEffect(() => {
    const handlePage = () => {
      switch (page) {
        case 'home':
          return setComponent(<HomeAdmin />)
        case 'hospedes':
          return setComponent(<ConsumoAdmin />)
        case 'funcionarios':
          return setComponent(<FuncionariosAdmin />)
        case 'reservas':
          return setComponent(<ReservasAdmin />)
      }
    }
    handlePage()
  }, [page])

  return (
    <>
      <HeaderAdmin setPage={setPage} />
      {component}
    </>
  )

}

export default ControllerAdmin
