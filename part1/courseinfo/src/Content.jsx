const get_row = (part, exercise, key) => {
    return (
        <p key={key}>{part} {exercise}</p>
    )
}

const Content = (props) => {
    let rows = []
    for (let part of props.course.parts) {
        console.log(String(part.name).split(' ').join('-'))
        rows.push(get_row(part.name, part.exercises, String(part.name).split(' ').join('-')))
    }
    return rows
}

export default Content