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
export default Course;