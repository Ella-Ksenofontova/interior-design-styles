import Header from './Header/Header';
import ControlledStylesList from "./ControlledStylesList/ControlledStylesList";
import StylePage from "./StylePage/StylePage";
import CopyrightPage from "./CopyrightPage/CopyrightPage";
import DATA from "./styles_data.js";

import {Routes, Route } from 'react-router-dom';

function HomePage() {
    document.title = "Стили в дизайне интерьеров и архитектуре"

    return (
        <>
            <Header />
            <div className="image-container">
            </div>
            <main>  
                <p>
                    <span id="info-header">Информация о сайте</span> <br />
                    На этом сайте собрана информация о 33 стилях в дизайне интерьера и архитектуре. <br />
                    Материал для этого сайта взят с сайта <a href="http://zaholstom.ru/?page_id=1157">zaholstom.ru</a>, однако я исправила 
                    грамматические ошибки и добавила иллюстрации.
                </p>

            <h2>Список стилей</h2>
            <ControlledStylesList />
            </main>
        </>
    );
}

export default function App() {
    return (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/copyright" element={<CopyrightPage />}/>
            {DATA.map(item => 
                <Route key={item.name} path={"/" + item.path} element={<StylePage styleName={item.name} styleOrder={item.styleOrder}/>}/>)}
          </Routes>
      );
}
