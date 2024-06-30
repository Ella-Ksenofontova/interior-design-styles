import { string } from "prop-types";
import styles from "./StyleCard.module.css";

/**
 * This component consists of image of style (or placeholder if image isn't found) and its name. It is used on style page.
 * @component
 * @param {Object} props - This component accepts _styleName_, _styleOrder_ and _source_ as props.
 * @param {string} props.styleName - The name of style.
 * @param {"before" | "after"} props.styleOrder - indicates whether the word "Стиль" (means "style" in Russian) goes before its name or after it.
 * @param {string} props.source - link to information about either source on author of image.
 * @returns {React.JSX.Element} The rendered StyleCard component
 */

export default function StyleCard({styleName, styleOrder, source}) {
    const styleTitle = styleOrder === "before" ? `${styleName} стиль` : `Стиль ${styleName.toLowerCase()}`;


    return (
        <div className={styles["style-image"]} style={{background: `url(/interior-design-styles/assets/styles_images/${styleName}/card.jpg) center / cover, url(/interior-design-styles/assets/styles_images/${styleName}/card.svg) center / cover, #F3DAB3 center / cover`}}>
            <div className={styles["style-name"]}
            >
                <h2 tabIndex={0}>{styleTitle}</h2>
            <a href={source} className={styles["source-link"]}>Ссылка на источник изображения или его автора</a>
            </div>
            
        </div>
    );
}

StyleCard.propTypes = {
    styleName: string,
    styleOrder: string,
    source: string,
};

