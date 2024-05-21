import {string} from "prop-types"
import styles from "./StyleCard.module.css"

export default function StyleCard({styleName, styleOrder}) {
    const styleTitle = styleOrder === "before" ? `${styleName} стиль` : `Стиль ${styleName.toLowerCase()}`

    return (
        <div className={styles["style-image"]} style={{background: `url(/src/assets/styles_images/${styleName}/card.jpg) center / cover, url(/src/assets/styles_images/${styleName}/card.svg) center / cover, #F3DAB3 center / cover`}}>
            <div className={styles["style-name"]}><h2>{styleTitle}</h2></div>
        </div>
    );
}

StyleCard.propTypes = {
    styleName: string,
    styleOrder: string
};

