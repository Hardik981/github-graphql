import { useNavigate } from 'react-router-dom';
import { AppContext } from '.';
import { useContext, useRef, useEffect, useState, FormEvent } from 'react';
import styles from './CSS/Form.module.css'

export default function Form() {
    const { token, setToken } = useContext(AppContext)
    const [clicked, setClicked] = useState(false)
    const navigate = useNavigate();
    const getToken = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (clicked) navigate("/ui");
    }, [clicked])
    function gotoUI(e: FormEvent) {
        e.preventDefault()
        if (setToken) setToken((getToken.current as HTMLInputElement).value)
        setClicked(true)
    }
    return (
        <section className={styles.formBlock}>
            <form className={styles.formStyle} onSubmit={gotoUI}>
                <h3>Type your Github Token</h3>
                <input type='password' title='token' ref={getToken} /><br />
                <input type='submit' />
            </form>
        </section>
    )
}