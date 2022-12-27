import React from "react";
import ReactDOM from "react-dom";
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id:2
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id:2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id:3
      }
    ]
  }
  return <Course course={course} />
}
const Course=({course})=>{
  return(
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </>
  )
}

const Total = ({ course }) => {
  let sum = 0
  for(let i=0;i<course.parts.length;i++){
    sum+=course.parts[i].exercises
    console.log(sum)
  }
  return <p><strong>total of {sum} exercises</strong></p>
}

const Header=({course})=>{
  return(
    <h1>{course.name}</h1>
  )
}

const Content=({course})=>{
  return(
    <>
      {course.parts.map((part)=>(
        <Part part={part}/>
      ))}
    </>
  )
}

const Part=({part})=>{
  return(
    <p>
      {part.name}:{part.exercises}
    </p>
    )
}

export default App