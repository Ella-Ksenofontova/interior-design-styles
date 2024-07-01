import Header from "../Header/Header";
import HomePageLink from "../StylePage/HomePageLink/HomePageLink";


/**
 * The component that represents loading page. It is mounted when even basic information about styles is not loaded (you can see it if you reload page about style).
 * @component
 * @returns {React.JSX.Element} The rendered LoadingPage component.
 */
export default function LoadingPage() {
  document.title = "Загрузка информации..."
  return (
    <>
      <Header />
      <main className="loading-page-main" id="main">
          <HomePageLink />
          <div className={"loading-wrapper"}>
              <img src="/interior-design-styles/assets/loading.gif" alt="Страница загружается" height={100} width={100}/>
              Получаем информацию о стилях...
          </div>
      </main>
    </>
  );
}