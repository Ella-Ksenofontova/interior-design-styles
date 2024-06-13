import { useContext } from "react";
import {Link} from "react-router-dom";
import {arrayOf, bool} from "prop-types"
import styles from "./StylesList.module.css";

import { StylesDataContext } from "../StylesDataContext";

/**
 * The component that represents styles list. It's used on homepage.
 * @component
 * @param {Object} props - This component accepts _statesOfCheckboxes_ as prop.
 * @param {boolean[]} props.statesOfCheckboxes - Array with three boolean values that indicate should styles of each type be shown.
 * @returns {React.JSX.Element} The rendered StylesList component.
 */

export default function StylesList({statesOfCheckboxes}) {
    let [classicStylesAreShown, modernStylesAreShown, ethnicStylesAreShown] = statesOfCheckboxes;
    const stylesData = useContext(StylesDataContext);

    const stylesItems = stylesData.map(style => {
        switch(style.type) {
            case "Классический":
               if (classicStylesAreShown) {
                return (
                    <li key={style.name}>
                        <Link to={"/interior-design-styles/" + style.path}>{style.name}</Link>
                        <div className={styles.classic} title="Это классический стиль">
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
                            <Link to={"/interior-design-styles/" + `${style.path}`}>{style.name}</Link>
                            <div className={styles.modern} title={style.comment ? style.comment : "Это современный стиль"}>
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
                        <Link to={"/interior-design-styles/" + style.path}>{style.name}</Link>
                        <div className={styles.ethnic} title="Это этнический стиль">
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

StylesList.propTypes = {
    statesOfCheckboxes: arrayOf(bool)
};