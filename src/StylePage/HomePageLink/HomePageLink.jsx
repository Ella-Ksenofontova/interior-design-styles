import { Link } from "react-router-dom";
import styles from "./HomePageLink.module.css"

/**
 * This component is used on styles and copyright pages.
 * @component
 * @returns {React.JSX.Element} The rendered HomePageLink component.
 */

export default function HomePageLink() {
    return (
        <div className={styles["home-page-link"]}>
            <div className={styles["homepage-img"]}></div>
            <Link to="/interior-design-styles/">На главную</Link>
        </div>
    )
}