import Header from "../Header/Header";
import HomePageLink from "../StylePage/HomePageLink/HomePageLink";

export default function LoadingPage() {
  document.title = "Загрузка информации..."
  return (
    <>
      <Header />
      <main>
          <HomePageLink />
          <div className={"loading-wrapper"}>
              <img src="/public/assets/loading.gif" alt="Страница загружается" height={100} width={100}/>
              Получаем информацию о стилях...
          </div>
      </main>
    </>
  );
}