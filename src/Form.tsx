import { useNavigate } from 'react-router-dom';
import { AppContext } from '.';
import { useContext, useRef, useEffect, useState } from 'react';
export default function Form() {
    const { token, setToken } = useContext(AppContext)
    const [clicked, setClicked] = useState(false)
    const navigate = useNavigate();
    const getToken = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (clicked) navigate("/ui");
    }, [clicked])
    function gotoUI() {
        if (setToken) setToken((getToken.current as HTMLInputElement).value)
        setClicked(true)
    }
    return (
        <div onSubmit={gotoUI}>
            <label>Type your Github Token</label>
            <input type='password' title='token' ref={getToken} />
            <button onClick={gotoUI}>Submit</button>
        </div>
    )
}