import { useState, useEffect } from 'react';
import { type ChangeEvent, type SubmitEvent  } from "react";
import { useSnackbar } from "notistack";
import type { Todo } from './types/todo';
import "./style.css";

function TodoList({userId, userName}: {userId?: number, userName: string}) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [value, setValue] = useState<string>("");
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const handleTodoChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        setTodos(prevTodos => 
            prevTodos.map((todo) =>
                todo.id === id ? {...todo, name: e.target.value} : todo
            )
        )
    }

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const todo = { name: value, userId: userId };

            const res = await fetch(`http://localhost:5000/todos/${userId}`, {
                method: "POST", 
                headers: {
                "Content-Type": "application/json"
                }, 
                body: JSON.stringify(todo)
            });

            if (!res.ok) {
                throw new Error("Todoの作成に失敗");
            }

            const newTodo = await res.json();
            setTodos([...todos, newTodo]);
            setValue("");
            enqueueSnackbar(
                "Todo is created", {
                    variant: "success"
                }
            );
        } catch (err) {
            console.error(err);
        }
    }

    const fetchTodos = async (userId?: number) => {
        const res = await fetch(`http://localhost:5000/todos/${userId}`);
        const todos: Todo[] = await res.json();
        setTodos(todos);
    };

    useEffect(() => {
        fetchTodos(userId);
    }, [userId]);

    const handleEdit = async (id: number) => {
        try {
            const editedTodo = todos.find((todo) => todo.id === id);
            const res = await fetch(`http://localhost:5000/todos/todo_id/${id}`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(editedTodo)
            });

            if (!res.ok) {
                console.log("Failed to edit Todo.")
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const todo = todos.find((todo) => todo.id === id);
            await fetch(`http://localhost:5000/todos/todo_id/${id}`, {
                method: "DELETE", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(todo)
            });
            const newTodos = todos.filter(todo => todo.id !== id);
            setTodos(newTodos);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1>Welcome {userName ? `${userName}さん` : "Guest"}</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    value={value}
                    type='text'
                    onChange={(e) => handleChange(e)}
                />
                <input
                    value='create'
                    type='submit'
                />
            </form>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input value={todo.name} className='todo' onChange={(e) => handleTodoChange(e, todo.id)} />
                        <button type='button' onClick={() => handleEdit(todo.id)}>編集</button>
                        <button type='button' onClick={() => handleDelete(todo.id)}>削除</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TodoList;
