import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  //console.log(props.sushiBelt);
  const renderSushiBelt = (sushis, budget) => {
    //console.log("the budget passed as prop from app=", props.sushiBudget);
    return sushis.map(sushi => {
      return <Sushi key={sushi.id} sushi={sushi} handleEatenSushi={props.handleEatenSushi} sushiBudget={budget}/>
    });
  }
  return (
    <Fragment>
      <div className="belt">
        {
          renderSushiBelt(props.sushiBelt, props.sushiBudget)
        }
        <MoreButton handleMoreSushi={props.handleMoreSushi}/>
      </div>
    </Fragment>
  )
}


export default SushiContainer