import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handle_good_vote = () => setGood(good + 1)
  const handle_neutral_vote = () => setNeutral(neutral + 1)
  const handle_bad_vote = () => setBad(bad + 1)
  return (
    <div>
      <Header text='give feedback'/>
      <Button handleClick={handle_good_vote} text="good" />
      <Button handleClick={handle_neutral_vote} text="neutral" />
      <Button handleClick={handle_bad_vote} text="bad" />
      <Header text='statistics'/>
      <Part name='good' count={good}/>
      <Part name='neutral' count={neutral}/>
      <Part name='bad' count={bad}/>
    </div>
  )
}

const Part=(props)=>{
  return(
    <p>
      {props.name} {props.count}
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