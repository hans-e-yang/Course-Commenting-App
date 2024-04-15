import { useState, useEffect } from 'react'

function CourseList({onCourseSelected}) {
    const [courses, setCourses] = useState([])
    useEffect(()=>{
        fetch("http://localhost:3001/courseList")
            .then(async(res) => {
                setCourses(await res.json())
            })
    }, [])
    return (
        <div>
            {courses.map(course => (
                <button 
                    onClick={()=>{onCourseSelected(course.name)}} 
                    key={course.name}>
                        {course.name}
                </button>
            ))}
        </div>
    )
}

export default CourseList