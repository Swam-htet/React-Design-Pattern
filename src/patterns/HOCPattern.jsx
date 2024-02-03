import * as PropTypes from "prop-types";
import {useEffect, useState} from "react";

export default function HOCPattern() {
    return (
        <div>
            <h1>Higher Order Component Pattern</h1>

            <TodoListWithData/>

            <UserListWithData/>


        </div>
    )
}

// Higher Order Component Pattern
// A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.

function Todo(props) {
    return <div style={{margin: "10px", padding: "10px", border: "2px solid orange"}}>
        <h3>{props.todo.title} - by user({props.todo.userId})</h3>
        <p>{props.todo.completed ? "Completed" : "Not Completed"}</p>
    </div>;
}

Todo.propTypes = {todo: PropTypes.any};


// presentational component
function TodoList({data}) {
    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {data.map((todo, index) => <Todo todo={todo} key={index}/>)}
            </ul>
        </div>
    )
}

function UserList({data}) {
    return (
        <div>
            <h1>User List</h1>
            <ul>
                {data.map((user, index) => <li key={index}>{user.name}</li>)}
            </ul>
        </div>
    )
}

// higher order component - functional
function withData(Component, dataSource) {
    return function () {
        const [data, setData] = useState([]);
        useEffect(() => {
            fetch(dataSource)
                .then(res => res.json())
                .then(data => setData(data))
                .catch(err => console.log(err));
        }, []);

        return <Component data={data}/>
    }
}

const TodoListWithData = withData(TodoList, "https://jsonplaceholder.typicode.com/todos");
const UserListWithData = withData(UserList, "https://jsonplaceholder.typicode.com/users");

