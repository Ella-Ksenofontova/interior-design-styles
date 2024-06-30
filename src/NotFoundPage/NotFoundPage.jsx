import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css"

import Header from "../Header/Header";

/**
 * The component which is mounted when 404 error occurs.
 * @component
 * @returns {React.JSX.Element} The rendered NotFoundPage component.
 */

export default function NotFoundPage() {
  document.title = "Страница не найдена";

  return (
    <>
      <Header/>
      <main className={"not-found-page-main"}>
        <div className={styles["not-found-wrapper"]}>
          <div className={styles["not-found-image"]}>
          </div>
          <div className="text-wrapper">
            <h2>На сайте нет такой страницы</h2>
            <Link to="/interior-design-styles/">Вернуться на главную</Link>
          </div>
        </div>
      </main>
    </>
  );
}