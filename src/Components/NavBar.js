import { useState } from "react"
import styles from '../CSS/NavBar.module.css'
export default function NavBar() {
    const [links] = useState(() => ['Repositories', 'Stars', 'Gist'])
    const [clickedLinkIndex, setClickedLinkIndex] = useState(0)
    return (
        <>
            <div className={styles.linksBlock}>
                {
                    links.map((link, index) => {
                        if (clickedLinkIndex === index)
                            return <span className={`${styles.links} ${styles.clickedLink}`} onClick={() => setClickedLinkIndex(index)} key={link}>{link}</span>
                        else
                            return <span className={styles.links} onClick={() => setClickedLinkIndex(index)} key={link}>{link}</span>
                    }
                    )}
            </div>
        </>
    )
}