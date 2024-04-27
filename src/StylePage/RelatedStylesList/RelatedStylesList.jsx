import DATA from "../../styles_data";
import { Link } from "react-router-dom";
import {arrayOf, string} from "prop-types"

RelatedStylesList.propTypes = {
    relatedStyles: arrayOf(string)
};

export default function RelatedStylesList({relatedStyles}) {
    return (
        <div className="related-styles-list">
            <h2>Связанные стили</h2>
            <ul>
                {relatedStyles.sort().map(styleName => <li key={styleName}><Link to={"/" + DATA.find(style => styleName == style.name).path}>{styleName}</Link></li>)}
            </ul>
        </div>
    );
}