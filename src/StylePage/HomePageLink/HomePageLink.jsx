import { Link } from "react-router-dom";
import styles from "./HomePageLink.module.css"

export default function HomePageLink() {
    return (
        <div className={styles["home-page-link"]}>
            <div className={styles["homepage-img"]}></div>
            <Link to="/interior-design-styles/">На главную</Link>
        </div>
    )
}