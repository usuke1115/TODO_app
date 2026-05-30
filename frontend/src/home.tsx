import { useEffect, useState } from "react";
import TodoList from "./features/todos";

function Home() {
    const [userName, setUserName] = useState<string>("");
    const [userId, setUserId] = useState<number|undefined>(undefined);

    useEffect(() => {
        fetch("http://localhost:5000/users/me", {
            method: "GET", 
            headers: {
                "Content-Type": "application/json"
            }, 
            credentials: "include", 
        }).then(res => res.json())
          .then(user => {
            setUserName(user.name);
            setUserId(user.id);
        })
    }, []);

    return (
        <>
            <TodoList userId={userId} userName={userName} /> 
        </>  
    )
}

export default Home;
