import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <h1> {course.name}</h1>
            {course.parts.map((part, i) =>
                <p key={i}>
                    {part.name} {part.exercises}
                </p>
            )}
            <b> total of {course.parts.map(part => part.exercises).reduce((sum, a) => sum + a, 0)} exercises</b>
        </div>
    )
}
export default Course