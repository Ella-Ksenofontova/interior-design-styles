import { Link } from "react-router-dom";
import {arrayOf, string} from "prop-types";
import { useContext } from "react";

import styles from "../StylePage.module.css";
import { StylesDataContext } from "../../StylesDataContext";


RelatedStylesList.propTypes = {
    relatedStyles: arrayOf(string)
};

/**
 * List of styles that are similar to one described on the page.
 * @component
 * @param {Object} props - This component accepts _relatedStyles_ as props.
 * @param {string[]} props.relatedStyles - Array of related styles' names.
 * @returns {React.JSX.Element} The rendered RelatedStylesList component.
 */

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