import React from 'react'
import Banner from '../Pages/Banner'
import Overview from '../Pages/Overview'

const Home = () => {
  return (
    <div className='max-w-11/12 mx-auto pt-4'>
        <Banner></Banner>
        <Overview></Overview>
    </div>
  )
}

export default Home