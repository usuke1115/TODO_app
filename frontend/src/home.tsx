import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import TodoList from "./features/todos";

function Home() {
    const [userName, setUserName] = useState<string>("");
    const [userId, setUserId] = useState<number|undefined>(undefined);
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.toast) {
            enqueueSnackbar(location.state.toast, {
                variant: "success"
            });
            navigate(location.pathname, {
                replace: true,
                state: null,
            });
        }
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
            {userId === undefined ? <div>Loading...</div> : <TodoList userId={userId} userName={userName} />} 
        </>  
    )
}

export default Home;
