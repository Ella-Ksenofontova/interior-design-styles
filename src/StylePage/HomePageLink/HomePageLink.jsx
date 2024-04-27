import { Link } from "react-router-dom";

export default function HomePageLink() {
    return (
        <div className="home-page-link">
            <div className="homepage-img"></div>
            <Link to="/">На главную</Link>
        </div>
    )
}