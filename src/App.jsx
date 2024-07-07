import {Routes, Route} from "react-router-dom";

import Header from "./Header/Header";
import ControlledStylesList from "./ControlledStylesList/ControlledStylesList";
import StylePage from "./StylePage/StylePage";
import CopyrightPage from "./CopyrightPage/CopyrightPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

import STYLES_DATA from "./styles_data";

/**
 * Component of Home page.
 *
 * @component
 * @returns {React.JSX.Element} The rendered HomePage component.
 */

function HomePage() {
  document.title = "Стили в дизайне интерьеров и архитектуре";

  return (
      <>
        <Header />
        <div className="image-container">
        </div>
        <main id="main">
          <p className="info">
            <span id="info-header">Информация о сайте</span> <br />
                        На этом сайте собрана информация о 33 стилях в дизайне интерьера и архитектуре. <br />
                        Материал для этого сайта взят с сайта <a href="http://zaholstom.ru/?page_id=1157">zaholstom.ru</a>, однако я исправила
                        грамматические ошибки и добавила иллюстрации.
          </p>

          <h2>Список стилей</h2>
          <ControlledStylesList/>
        </main>
      </>
    );
}  

/**
 * Root component of app. It uses routing for React.
 * @returns {React.JSX.Element} The rendered App component.
 */

export default function App() {
  return (
    <Routes>
      <Route path="/interior-design-styles/" element={<HomePage/>} />
      <Route path="/interior-design-styles/copyright" element={<CopyrightPage/>}/>
      {STYLES_DATA.map((item) => {
        return (
          <Route key={item.name} path={`/interior-design-styles/${item.path}`} element={
            <StylePage styleName={item.name} styleOrder={item.styleOrder}/>
          }/>);
      })}
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  );
}
