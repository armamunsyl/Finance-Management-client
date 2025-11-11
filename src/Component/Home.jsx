import React from 'react'
import Banner from '../Pages/Banner'
import Overview from '../Pages/Overview'
import BudgetingTips from '../Pages/BudgetingTips'
import FinancialPlanning from '../Pages/FinancialPlanning'

const Home = () => {
  return (
    <div className='max-w-11/12 mx-auto pt-4'>
        <Banner></Banner>
        <Overview></Overview>
        <BudgetingTips></BudgetingTips>
        <FinancialPlanning></FinancialPlanning>
    </div>
  )
}

export default Home