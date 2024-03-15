//TODO: Добавить ссылки на стили
import DATA from "./styles_data.js"
import {Link} from "react-router-dom";

export default function StylesList({statesOfCheckboxes}) {
    let [classicStylesAreShown, modernStylesAreShown, ethnicStylesAreShown] = statesOfCheckboxes;

    const stylesItems = DATA.map(style => {
        switch(style.type) {
            case "Классический":
               if (classicStylesAreShown) {
                return (
                    <li key={style.name}>
                        <Link to={"/" + style.path}>{style.name}</Link>
                        <div className="classic" title="Это классический стиль">
                            <span className="visually-hidden">Это классический стиль</span>
                        </div>
                    </li>
                );
               }

               break;

            case "Современный": 
               if (modernStylesAreShown) {
                    return (
                        <li key={style.name}>
                            <Link to={"/" + style.path}>{style.name}</Link>
                            <div className="modern" title={style.comment ? style.comment : "Это современный стиль"}>
                                <span className="visually-hidden">{style.comment ? style.comment : "Это современный стиль"}</span>
                            </div>
                        </li>
                    );
               }

               break;

            case "Этнический":
               if (ethnicStylesAreShown) {
                return (
                    <li key={style.name}>
                        <Link to={"/" + style.path}>{style.name}</Link>
                        <div className="ethnic" title="Это этнический стиль">
                            <span className="visually-hidden">Это этнический стиль</span>
                        </div>
                    </li>
                );
            }
        }
    })


    return (
        <ol>
            {stylesItems}
        </ol>
    );
}