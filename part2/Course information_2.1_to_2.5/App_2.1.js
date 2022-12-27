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
    </>
  )
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