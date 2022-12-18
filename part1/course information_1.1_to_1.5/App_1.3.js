const App = () => {
  const course = 'Half Stack application development'
  const part1 = { // in App_1.2.js, part1 is just name, here, part1 is an object
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3}/> 
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
    </div>
  )
}

const Header=(props)=>{
  console.log(props.course)
  return(
    <h1>{props.course}</h1>
  )
}

const Content=(props)=>{
  return(
    <div>
      <Part part={props.part1} />
      <Part part={props.part2} />
      <Part part={props.part3} />
    </div>
  )
}
const Total=(props)=>{
  console.log(props)
  return (
    <p>Number of exercises {props.exercises1+props.exercises2+props.exercises3}</p>
  )
}
const Part=(props)=>{
  return(
    <p>
      {props.part.name}:{props.part.exercises}
    </p>
    )
}

export default App
