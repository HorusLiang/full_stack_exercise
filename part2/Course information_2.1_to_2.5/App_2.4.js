import React from "react";
import ReactDOM from "react-dom";
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return <Course courses={courses} />
}
const Course=({courses})=>{
  console.log(courses[0].name)
  return(
    <>
      <h1>Web development curriculum</h1>
      { 
        courses && courses.map((course)=>(
          <div>
            
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
          </div>
        ))
      }
    </>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((t,part)=>t+part.exercises,0)
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