import { Link } from "react-router-dom";
import {arrayOf, string} from "prop-types";
import { useContext } from "react";

import styles from "../StylePage.module.css";
import { StylesDataContext } from "../../StylesDataContext";


RelatedStylesList.propTypes = {
    relatedStyles: arrayOf(string)
};

export default function RelatedStylesList({relatedStyles}) {
    const stylesData = useContext(StylesDataContext);

    return (
        <div className={styles["related-styles-list"]}>
            <h2>Связанные стили</h2>
            <ul>
                {relatedStyles.sort().map(styleName => <li key={styleName}><Link to={"/interior-design-styles/" + stylesData.find(style => styleName == style.name).path}>{styleName}</Link></li>)}
            </ul>
        </div>
    );
}