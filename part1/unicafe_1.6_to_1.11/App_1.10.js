import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handle_good_vote = () => setGood(good + 1)
  const handle_neutral_vote = () => setNeutral(neutral + 1)
  const handle_bad_vote = () => setBad(bad + 1)
  const all=bad+good+neutral
  const positive_rate = (all ? (good * 100) / all : 0) + " %";
  const average=all/3
  return (
    <div>
      <Header text='give feedback'/>
      <Button handleClick={handle_good_vote} text="good" />
      <Button handleClick={handle_neutral_vote} text="neutral" />
      <Button handleClick={handle_bad_vote} text="bad" />
      <Header text='statistics'/>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        all={all} 
        average={average} 
        positive_rate={positive_rate}
      />
      
      
    </div>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive_rate }) => {
  if(all>0){
    return(
      <>
        <Part name='good' value={good}/>
        <Part name='neutral' value={neutral}/>
        <Part name='bad' value={bad}/>
        <Part name='all' value={all}/>
        <Part name='average' value={average}/>
        <Part name='positive' value={positive_rate}/>
      </>
      
    )
  }else{
    return <p> No feedback given</p>
  }
  
}

const Part=({name,value})=>{
  return(
    <p>
      {name} {value}
    </p>
    )
}


const Header=(props)=>{
  return(
    <h1>{props.text}</h1>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)



export default App;