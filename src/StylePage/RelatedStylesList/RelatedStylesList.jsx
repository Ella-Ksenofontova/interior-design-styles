import {Link} from "react-router-dom";
import {arrayOf, string} from "prop-types";
import styles from "../StylePage.module.css";
import STYLES_DATA from "../../styles_data";


RelatedStylesList.propTypes = {
  relatedStyles: arrayOf(string),
};

/**
 * List of styles that are similar to one described on the page.
 * @component
 * @param {Object} props - This component accepts _relatedStyles_ as props.
 * @param {string[]} props.relatedStyles - Array of related styles' names.
 * @returns {React.JSX.Element} The rendered RelatedStylesList component.
 */

export default function RelatedStylesList({relatedStyles}) {
  return (
    <div className={styles["related-styles-list"]}>
      <img src="/interior-design-styles/assets/link.png" alt="" aria-hidden className={styles["list-icon"]} />
      <h2 tabIndex={0}>Связанные стили</h2>
      <ul className={styles["related-styles"]}>
        {relatedStyles.sort().map(styleName => <li key={styleName}><Link to={`/interior-design-styles/${STYLES_DATA.find(style => styleName === style.name).path}`}>{styleName}</Link></li>)}
      </ul>
    </div>
  );
}