import { useState } from 'react'
import Header from '../components/Pages/Home/Header'
import LoginModal from '../components/Pages/Home/LoginModal'
import withUnprotected from '../hoc/withUnprotected'

const Home = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Header OpenModal={() => setOpen(true)} />

      <LoginModal open={open} CloseModal={() => setOpen(false)} />
    </>
  )
}

export default withUnprotected(Home)
