import { string } from "prop-types";
import styles from "./StyleCard.module.css";

export default function StyleCard({styleName, styleOrder, source}) {
    const styleTitle = styleOrder === "before" ? `${styleName} стиль` : `Стиль ${styleName.toLowerCase()}`;


    return (
        <div className={styles["style-image"]} style={{background: `url(/interior-design-styles/assets/styles_images/${styleName}/card.jpg) center / cover, url(/interior-design-styles/assets/styles_images/${styleName}/card.svg) center / cover, #F3DAB3 center / cover`}}>
            <div className={styles["style-name"]}
            >
                <h2>{styleTitle}</h2>
            <a href={source} className={styles["source-link"]}>Ссылка на источник изображения или его автора</a>
            </div>
            
        </div>
    );
}

StyleCard.propTypes = {
    styleName: string,
    styleOrder: string
};

