import { useState } from 'react';
import { StylesDataContext } from "./StylesDataContext"
import {Routes, Route} from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore"; 
import {arrayOf, string, bool, object} from "prop-types";

import Header from './Header/Header';
import ControlledStylesList from "./ControlledStylesList/ControlledStylesList";
import StylePage from "./StylePage/StylePage";
import CopyrightPage from "./CopyrightPage/CopyrightPage";
import LoadingPage from './LoadingPage/LoadingPage';
import NotFoundPage from './NotFoundPage/NotFoundPage'

/**
 * List of styles in interior design and architecture, about which articles on website exist.
 * @constant
 * @readonly
 */

const STYLES = [
    "Авангард", "Ампир", "Античный", "Ар-деко", "Африканский", "Барокко", "Брутальный", "Восточный", "Готический", "Египетский", "Кантри", "Китайский", "Китч", "Классический", "Консерватизм", "Конструктивизм", "Лофт", "Минимализм", "Модерн", "Неоклассицизм", "Поп-арт", "Постмодернизм", "Прованс", "Ренессанс", "Рококо", "Романский", "Скандинавский", "Техно", "Шале", "Эклектика", "Этнический", "Японский"
]

/**
 * List of paths which are corresponding to styles.
 * @constant
 * @readonly
 * @see {@link STYLES}
 */

const PATHS = [
    "avant-garde", "empire", "antique", "art-deco", "african", "baroque", "brutal", "oriental", "gothic", "egyptian", "country", "chinese", "kitsch", "classic", "conservative", "constructivism", "loft", "minimalism", "modern", "neoclassic", "pop-art", "postmoden", "provence", "renaissanse", "rococo", "romanesque", "scandinavian", "techno", "chalet", "eclectism", "ethnic", "japanese"
]

/**
 * Component of Home page.
 * 
 * @component
 * @param {Object} props - This component accepts _loaded_ and _stylesData_ as props.
 * @param {boolean} props.loaded - Indicates whether information about styles that is neccessary for their correct display is received.
 * @param {Array.<Object>} props.stylesData - Data about styles that is recieved from Firstore Database.
 * @returns {React.JSX.Element} The rendered HomePage component.
 */

function HomePage({loaded, stylesData}) {
    document.title = "Стили в дизайне интерьеров и архитектуре";

    if (loaded) {
        return (
            <StylesDataContext.Provider value={stylesData}>
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
            </StylesDataContext.Provider>
        );
    }
     else {
        return (
            <StylesDataContext.Provider value={stylesData}>
                <Header />
                <div className="image-container">
                </div>
                <main>  
                    <p className="info">
                        <span id="info-header">Информация о сайте</span> <br />
                        На этом сайте собрана информация о 33 стилях в дизайне интерьера и архитектуре. <br />
                        Материал для этого сайта взят с сайта <a href="http://zaholstom.ru/?page_id=1157">zaholstom.ru</a>, однако я исправила 
                        грамматические ошибки и добавила иллюстрации.
                    </p>

                <div className="loading-wrapper">
                <img src="assets/loading.gif" alt="Стили загружаются" height={100} width={100}/>
                        Стили загружаются
                </div>
                </main>
            </StylesDataContext.Provider>
        );
     }
}

HomePage.propTypes = {
    loaded: bool,
    stylesData: arrayOf(object)
};

/**
 * 
 * @param {string[]} styles - List of styles.
 * @async
 * @returns {Array.<Object>} List of objects, each with data about certain style.
 */

async function getStylesData(styles) {
    const firebaseConfig = {
        apiKey: "AIzaSyDq1ZY-CdiWgtPAUNaLyZKyfi0KKWr20mk",
        authDomain: "interior-design-styles-eef77.firebaseapp.com",
        projectId: "interior-design-styles-eef77",
        storageBucket: "interior-design-styles-eef77.appspot.com",
        messagingSenderId: "617285631640",
        appId: "1:617285631640:web:4feecb5b608fcbb18c1aed",
        measurementId: "G-BPSKCJ06PB"
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    let stylesData = [];

    for (let style of styles) {
        const docRef = doc(db, "Styles Data", `${style}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            stylesData.push({
                styleOrder: docSnap.get("styleOrder"),
                type: docSnap.get("type"),
                comment: docSnap.get("comment"),
            });
        }
    }

    return stylesData;
}

/**
 * Root component of app. It uses routing for React.
 * @returns {React.JSX.Element} The rendered App component. 
 */

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [stylesData, setStylesData] = useState([]);

    if (!loaded) {
        let response = getStylesData(STYLES);

        response.then(result => {
            setLoaded(true);
            setStylesData(result);
        });
    }
    return (
            <Routes>
                <Route path="/interior-design-styles/" element={<HomePage loaded={loaded} stylesData={stylesData}/>} />
                <Route path="/interior-design-styles/copyright" element={<StylesDataContext.Provider value = {stylesData}><CopyrightPage /></StylesDataContext.Provider>}/>
                {loaded ? stylesData.map((item, index) => {
                        item.name = STYLES[index]
                        item.path = PATHS[index]

                        return (
                            <Route key={item.name} path={`/interior-design-styles/${item.path}`} element={
                            <StylesDataContext.Provider value = {stylesData}><StylePage styleName={item.name} styleOrder={item.styleOrder}/></StylesDataContext.Provider>
                        }/>);
                    }) : STYLES.map((item, index) =>
                        <Route key={item} path={`/interior-design-styles/${PATHS[index]}`} element={<LoadingPage />}/>
                )}
                <Route path="*" element={<StylesDataContext.Provider value = {stylesData}><NotFoundPage /></StylesDataContext.Provider>}/>
            </Routes>
    );
}
