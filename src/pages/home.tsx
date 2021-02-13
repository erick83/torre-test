import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { HeaderComponent, SideBarComponent } from '../components'
import { getUsername, getOpportunities } from '../redux/api-thunk'

const Home: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsername('ericklopez'))
  })
  useEffect(() => {
    dispatch(getOpportunities())
  })

  return (
    <div>
      <HeaderComponent />
      <SideBarComponent />
    </div>
  )
}

export default Home
