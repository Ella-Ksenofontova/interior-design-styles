import { string } from "prop-types"
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useState, useEffect} from "react";

import Header from "../Header/Header";
import HomePageLink from "./HomePageLink/HomePageLink";
import StyleCard from "./StyleCard/StyleCard";
import StyleDescription from "./StyleDescription/StyleDescription";
import RelatedStylesList from "./RelatedStylesList/RelatedStylesList";
import SourcesList from "./SourcesList/SourcesList";
import Gallery from "./Gallery/Gallery";

import styles from "./StylePage.module.css"

/**
 * Gets information about specified style from Firestore Database.
 * @async
 * @param {string} styleName - The name of the style.
 * @returns {Promise<{desciption: string,
 *  relatedStyles: string[],
 *  imagesData: {
 *      desciptions: string[],
 *      imagesExtensions: string[],
 *      imagesSources: string[]
 * },
 * infoSources: string[]
 * }>} Data about specified style.
 */

async function getStyleData(styleName) {
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

    let styleData = {
        description: "Ошибка: не найден соответствующий документ",
        relatedStyles: [],
        imagesData: {
            desciptions: [],
            imagesExtensions: [],
            imagesSources: [],
        },
        infoSources: []
    };

    const docRef = doc(db, "Styles Data", `${styleName}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        styleData.relatedStyles = docSnap.get("relatedStyles") || [];

        const descriptions = docSnap.get("galleryDescriptions") || [];
        const imagesExtensions = docSnap.get("imagesExtensions") || [];
        const imagesSources = docSnap.get("imagesSources") || [];

        styleData.imagesData = descriptions.map((item, index) => {
            return {
                description: item,
                source: imagesSources[index] || "",
                extension: imagesExtensions[index] || "jpg"
            };
        });

        styleData.infoSources = docSnap.get("infoSources") || [];

        styleData.cardSource = docSnap.get("cardSource");
    }

    const descriptionRef = doc(db, "Styles descriptions", `${styleName}`);
    const descriptionDocSnap = await getDoc(descriptionRef);
    if (descriptionDocSnap.exists()) {
        styleData.description = descriptionDocSnap.get("description");
    }

    return styleData;
}

/**
 * Finds information that is neccessary for displaying list of tooltip images' sources.
 * @param {string[]} numbersOfMarks - Array with numbers of marks we've got to search. Note that these "numbers" are actually strings, and theoretically, you can pass a sequence of letters - that will not cause any mistake.
 * @returns {Promise<{
*  url: string,
*  description: string
* }>} The promise that returns object with neccessary attributes when it's fullfiled.
*/

async function getSourcesAndImageName(numbersOfMarks) {
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
   let sources = [];

   for (let number of numbersOfMarks) {
       const docRef = doc(db, "Marks", `Mark${number}`);
       const docSnap = await getDoc(docRef);
       if (docSnap.exists()) {
           const imageName = docSnap.get("image");
           sources.push({
               url: docSnap.get("source"),
               description: imageName.substring(0, imageName.indexOf("."))
           });
       }
   }

   return sources;
}

getStyleData.propTypes = {
    styleName: string
};

/**
 * The component of style page.
 * @param {Object} props - This component accepts _styleName_ and _styleOrder_ as props.
 * @param {string} props.styleName - name of the style.
 * @param {"before" | "after"} props.styleOrder - indicates whether word "Стиль" (means "style" in Russian) should be written before or after style's name.
 * @returns {React.JSX.Element} The rendered StylePage component.
 */

export default function StylePage({styleName, styleOrder}) {
    document.title = styleOrder == "before" ? `${styleName} стиль` : styleName;
    window.scrollTo(0, 0);

    const [loaded, setLoaded] = useState(false);
    const [sources, setSources] = useState([]);

    useEffect(() => setLoaded(false), [styleName])

    const [styleData, setStyleData] = useState({
        description: "",
        relatedStyles: "",
        infoSources: "",
    });

    const regexp = /!mark\d+/g;
    const matches = styleData.description.match(regexp);
    if (matches && sources.length === 0) {
        const numbersOfMarks = matches.map(item => item.substring(5));
        const sourcesResponse = getSourcesAndImageName(numbersOfMarks);
        sourcesResponse.then(result => {
            setSources(result);
        })
    }

    if(!loaded) {
        const response = getStyleData(styleName);
        response.then((result) => {
                setStyleData(result);

                let fieldsLoaded = 0;
                let totalFields = 0;

                for (let key in styleData) {
                    if(styleData[key]) {
                        fieldsLoaded ++;
                    }
            
                    totalFields ++;
                }
            
                if (fieldsLoaded == totalFields) {
                    setLoaded(true);
                }
            }
        )
    }
    
    if (loaded) {
        return (
            <>
                <Header />
                <main className={styles["style-page-main"]}>
                    <span className="visually-hidden" tabIndex={0}>Поиск по сайту стал доступен. Он расположен в шапке сайта.</span>
                    <HomePageLink />
                    <StyleCard styleName={styleName} 
                    styleOrder={styleOrder} 
                    source={styleData.cardSource}/>
                    <StyleDescription description={styleData.description.split("\\n")} />

                    {styleData.imagesData.length > 0 ?
                    <Gallery imagesData={styleData.imagesData} /> : ""
                    }

                    {styleData.relatedStyles.length > 0 ? <RelatedStylesList relatedStyles={styleData.relatedStyles} /> : ""}

                    {styleData.infoSources.length > 0 ?
                    <SourcesList title="Источники информации" sources={styleData.infoSources}/> : ""}

                    {sources.length ? 
                    <SourcesList title="Источники изображений" 
                    explanation="Здесь перечислены источники картинок, которые использовались во всплывающих подсказках к следующим словам: "
                    sources={sources}/> : ""}
                </main>
            </>
        );
    } else {
        return (
            <>
                <Header />
                <main className={styles["style-page-main"]}>
                    <span className="visually-hidden" tabIndex={0}>Поиск по сайту стал доступен. Он расположен в шапке сайта.</span>
                    <HomePageLink />
                    <div className={"loading-wrapper"}>
                        <img src="/interior-design-styles/assets/loading.gif" alt="Страница загружается" height={100} width={100}/>
                        Страница загружается
                    </div>
                </main>
            </>
        )
    }
}

StylePage.propTypes = {
    styleName: string,
    styleOrder: string
};