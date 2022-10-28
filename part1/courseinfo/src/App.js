const Header = (props) => {
    return (<h1>{props.course}</h1>)
}

const Content = (props) => props.parts.map(
    (part, index) => (
        <p key={index}>
            {part.name} {part.exercises} {index}
        </p>
    )
)

const Footer = (props) => (<p>Number of exercises {props.parts.reduce((prev, cur) => prev + cur.exercises, 0)}</p>)

const App = () => {
    const course = 'Half Stack application development'

    const parts = [{
        name: 'Fundamentals of React',
        exercises: 10,
    }, {
        name: 'Using props to pass data',
        exercises: 7
    }, {
        name: 'State of a component',
        exercises: 14
    }];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Footer parts={parts} />
        </div>
    )
}

export default App