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
                    onClick={()=>{onCourseSelected(course)}} 
                    key={course.code}>
                        {course.code}
                </button>
            ))}
        </div>
    )
}

export default CourseList