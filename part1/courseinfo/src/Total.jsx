const Total = (props) => {
    let total = 0
    for (let part of props.course.parts) {
        total += part.exercises
    }
    return <p>Number of exercises {total}</p>
}

export default Total
