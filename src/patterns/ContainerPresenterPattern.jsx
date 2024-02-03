import {useEffect, useState} from "react";

export default function ContainerPresenterPattern() {
    return (
        <div>
            <h1>Container Presenter Pattern</h1>
            <Container/>
        </div>
    )
}

/*
    Todo Body
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false

 */

function Container() {

    let [todos, setTodos] = useState([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.log(err));

        console.log("Dog list - ", todos);
    }, []);
    return (
        <div>
            <h1>Container</h1>
            <Presenter todos={todos}/>
        </div>
    )
}

function Presenter({todos}) {
    return (
        <div>
            <h1>Presenter</h1>
            <ul>
                {todos.map(todo => <li key={todo.id}>
                    <div style={{margin: "10px", padding: "10px", border: "2px solid orange"}}>
                        <h3>{todo.title} - by user({todo.userId})</h3>
                        <p>{todo.completed ? "Completed" : "Not Completed"}</p>
                    </div>
                </li>)}
            </ul>
        </div>
    )
}
