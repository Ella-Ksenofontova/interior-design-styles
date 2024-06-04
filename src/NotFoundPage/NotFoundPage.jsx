import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css"

import Header from "../Header/Header";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className={styles["not-found-main"]}>
        <div className={styles["not-found-wrapper"]}>
          <div className={styles["not-found-image"]}>
          </div>
          <div className="text-wrapper">
            <h2>На сайте нет такой страницы</h2>
            <Link to="/">Вернуться на главную</Link>
          </div>
        </div>
      </main>
    </>
  );
}