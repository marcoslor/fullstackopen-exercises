const Header = (props) => {
    return (<h1>{props.course}</h1>)
}

const Part = (props) =>
(
    <p>
        {props.name} {props.exercises}
    </p>
)

const Content = (props) => props.parts.map(
    (part, index) => (<Part key={index} name={part.name} exercises={part.exercises} />)
)

const Footer = (props) => (
    <p style={{ fontWeight: "bold" }}>
        Number of exercises {props.parts.reduce((prev, cur) => prev + cur.exercises, 0)}
    </p>
)

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Footer parts={course.parts} />
        </div>
    )
}

export default Course