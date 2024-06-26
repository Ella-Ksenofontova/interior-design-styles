import { useFloating, offset, autoPlacement, autoUpdate } from '@floating-ui/react';
import { number, string, arrayOf } from "prop-types";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useState } from 'react';
import styles from "./StyleDescription.module.css"

const firebaseConfig = {
    apiKey: "AIzaSyDq1ZY-CdiWgtPAUNaLyZKyfi0KKWr20mk",
    authDomain: "interior-design-styles-eef77.firebaseapp.com",
    projectId: "interior-design-styles-eef77",
    storageBucket: "interior-design-styles-eef77.appspot.com",
    messagingSenderId: "617285631640",
    appId: "1:617285631640:web:4feecb5b608fcbb18c1aed",
    measurementId: "G-BPSKCJ06PB"
};

/**
 * Gets information that is neccessary for display of description from Firestore Database.
 * @async
 * @param {number} numberOfMark - The number of mark in list of all marks. Descriprtions initially come with substrings like !markn, where n is a number of mark. Then these substrings are replaced with appropriate _MARK_ tags and tooltips.
 * @returns {Promise<{text: string,
* orientation: "vertical" | "horizontal", 
* descriptionOfImage: string,
* text: string}>} The promise that returns object with neccessary attributes when it's fullfiled.
*/

async function getAttributes(numberOfMark) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const docRef = doc(db, "Marks", `Mark${numberOfMark}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let attributes = {
            text: docSnap.get("text"),
            orientation: docSnap.get("orientation") || "vertical",
            image: docSnap.get("image"),
            descriptionOfImage: docSnap.get("description"),
        };

        if (!docSnap.get("orientation")) console.log("Error in Mark#" + numberOfMark);

        return attributes;
    }

    return {
        text: "Ошибка: не найден соответствующий документ",
        orientation: "vertical",
        image: "",
        descriptionOfImage: "Нет описания картинки"
    };
}

/**
 * Description of style split at paragraphs.
 * @component
 * @param {Object} props - This component accepts _description_ as props.
 * @param {string[]} props.description - The description of style, which is array of paragraphs. 
 * @returns {React.JSX.Element} The rendered StyleDescription component.
 */

export default function StyleDescription({ description }) {
    return (<section>
        <h2>Описание стиля</h2>
        <div id={styles["description"]}>
            {description.map((paragraph, index) => {
                let initialParagraphParts = paragraph.split("!mark");

                return (
                    <div key={`paragraph-${index + 1}`}
                        className={styles["style-description"]}>
                        {initialParagraphParts.map((paragraphPart, paragraphIndex) =>
                            <ParagraphPart
                                key={`part-component-${index}-${paragraphIndex}`}
                                initialText={paragraphPart}
                                index={index}
                                paragraphIndex={paragraphIndex}
                            ></ParagraphPart>
                        )}
                    </div>)
            })
            }

        </div>
    </section>);
}

StyleDescription.propTypes = {
    description: arrayOf(string)
};

/**
 * The part of the paragraph before or after !markn substring (where _n_ is number). Also includes mark and tooltip themselves, if its index is bigger than 0.
 * @component
 * @param {Object} props - This component accepts _initialText_, _index_ and _paragraphIndex_ as props.
 * @param {string} props.initialText - Initial text of paragraph part, that is edited before being added to the page.
 * @param {number} props.index - The index of whole paragraph among all paragraphs on the page.
 * @param {number} props.paragraphIndex - The index of paragraph part in current paragraph.
 * @returns {React.JSX.Element} The rendered ParagraphPart component.
 * @listens focus, blur, mouseover, mouseout, touchstart
 */

function ParagraphPart({ initialText, index, paragraphIndex }) {
    const { refs, floatingStyles } = useFloating({
        middleware: [
            offset(5),
            autoPlacement()
        ],
        whileElementsMounted: autoUpdate
    });

    const [requested, setRequested] = useState(false);
    const [markParams, setMarkParams] = useState({
        text: "",
        orientation: "vertical",
        image: "",
        descriptionOfImage: "",
        source: ""
    });

    let title;
    let indexOfStyleWord = document.title.indexOf(" стиль");
    if (indexOfStyleWord > -1) {
        title = document.title.slice(0, indexOfStyleWord);
    } else {
        title = document.title;
    }

    if (paragraphIndex === 0) {
        return (
            <span key={`paragraph-part-${index + 1}-${paragraphIndex + 1}`}>
                {initialText}
            </span>
        )
    } else {
        let regexp = /^\d+/;
        let match = initialText.match(regexp);
        let remainingText = initialText.substring(match[0].length);
        
        if (!requested) {
            let attributes = getAttributes(match[0]);

            attributes.then((result) => {
                setMarkParams(result);
                setRequested(true);
            });
        };
        return (
            <>
                <mark ref={refs.setReference}
                    key={`mark-${index + 1}`}
                    onMouseOver={() => document.getElementById(`describing-block-${index + 1}-${paragraphIndex + 1}`).classList.remove(styles["hidden"])}
                    onFocus={() => document.getElementById(`describing-block-${index + 1}-${paragraphIndex + 1}`).classList.remove(styles["hidden"])}
                    onMouseOut={() => document.getElementById(`describing-block-${index + 1}-${paragraphIndex + 1}`).classList.add(styles["hidden"])}
                    onBlur={(e) => {
                        if (!e.relatedTarget.classList.contains(styles["describing-block"])) {
                            document.getElementById(`describing-block-${index + 1}-${paragraphIndex + 1}`).classList.add(styles["hidden"]);
                        }
                    }}
                    onTouchStart={() => document.getElementById(`describing-block-mobile-${index + 1}-${paragraphIndex + 1}`).showModal()}
                    tabIndex={0}>{markParams.text}</mark>
                <figure className={`${styles["describing-block"]} ${styles["hidden"]}`} id={`describing-block-${index + 1}-${paragraphIndex + 1}`}
                    key={`describing-block-${index + 1}-${paragraphIndex + 1}`} ref={refs.setFloating} style={floatingStyles}
                    tabIndex={0}
                    onBlur={(e) => {
                        if (!e.relatedTarget.classList.contains("description-of-tooltip")) {
                            document.getElementById(`describing-block-${index + 1}-${paragraphIndex + 1}`).classList.add(styles["hidden"]);
                        }
                    }}>
                    <img src={`/interior-design-styles/assets/${markParams.image? `styles_images/${title}/${markParams.image}` : "placeholder.png"}`}
                        className={styles['describing-image']}
                        id={`image-${index + 1}`}
                        key={`image-${index + 1}`}
                        alt={markParams.image.substring(0, markParams.image.indexOf("."))}
                        height={markParams.orientation.toLowerCase() === "vertical" ? "200" : "150"}
                        width={markParams.orientation.toLowerCase() === "vertical" ? "125" : "300"}
                    />
                    <figcaption key={`caption-${index + 1}`}>
                        <span className="description-of-tooltip" tabIndex={0}>{markParams.descriptionOfImage}</span><br />
                    </figcaption>
                </figure>
                <DescribingMobileDialog
                    index={index}
                    paragraphIndex={paragraphIndex}
                    orientation={markParams.orientation}
                    image={markParams.image}
                    descriptionOfImage={markParams.descriptionOfImage}
                ></DescribingMobileDialog>
                {remainingText}
            </>);
    }
}

ParagraphPart.propTypes = {
    initialText: string,
    index: number,
    paragraphIndex: number
};

/**
 * Dialog that is alternative of tooltips that describe probably unknown words for mobile devices.
 * @component
 * @param {Object} props - This component accepts _index_, _paragraphIndex_, _image_, _orientation_ and _descriptionOfImage_ as props.
 * @param {number} props.index - The index of paragraph among all paragraphs on the page (like in {@link ParagraphPart} component). Default value is 0.
 * @param {number} props.paragraphIndex - The index of paragraph part in current paragraph. Default value is 0.
 * @param {string} props.image - Path to image. Default value is empty string.
 * @param {"vertical" | "horizontal"} props.orientation - Orientation of image. Default value is vertical.
 * @param {string} props.descriptionOfImage - The text that describes word(s) in mark hovering on (or touching of) which caused display of tooltip.
 * @param {string} props.source - Source of image used in dialog.
 * @returns {React.JSX.Element} The rendered DescribingMobileDialog component.
 * @listens click
 */

function DescribingMobileDialog({ index = 0, paragraphIndex = 0, image = "", orientation = "vertical", descriptionOfImage = "Нет описания картинки"}) {
    let title;
    let indexOfStyleWord = document.title.indexOf(" стиль");
    if (indexOfStyleWord > -1) {
        title = document.title.slice(0, indexOfStyleWord);
    } else {
        title = document.title;
    }

    return (
        <dialog className={styles['describing-block-mobile']} key={`describing-block-mobile-${index + 1}-${paragraphIndex + 1}`} id={`describing-block-mobile-${index + 1}-${paragraphIndex + 1}`}>
            <img src={`/interior-design-styles/assets${image ? "/styles_images/" + title : ""}/${image ? image : "placeholder.png"}`}
                className={styles['describing-image']}
                id={`image-${index + 1}`}
                key={`image-${index + 1}`}
                alt={image.substring(0, image.indexOf("."))}
                height={orientation.toLowerCase() === "vertical" ? "200" : "150"}
                width={orientation.toLowerCase() === "vertical" ? "125" : "300"}>
            </img>
            <span key={`description-${index + 1}`}>
                {descriptionOfImage}<br/>
            </span>
            <button className={styles["close-mobile-dialog"]}
                onClick={() => document.getElementById(`describing-block-mobile-${index + 1}-${paragraphIndex + 1}`).close()}
                title='Закрыть пояснение'
            >
            </button>
        </dialog>);
}

DescribingMobileDialog.propTypes = {
    index: number,
    paragraphIndex: number,
    image: string,
    orientation: string,
    descriptionOfImage: string,
    source: string
};