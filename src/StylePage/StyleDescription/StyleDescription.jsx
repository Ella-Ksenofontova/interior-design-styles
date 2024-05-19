import {useFloating, offset, autoPlacement, autoUpdate} from '@floating-ui/react';
import {number, string} from "prop-types"

import styles from "./StyleDescription.module.css"

function getAttributes(attributesString) {
    let attributesEntries = attributesString.split(" ");
    let attributesObject = {};
    
    for (let attributeEntry of attributesEntries) {
        let dataIndex = attributeEntry.indexOf("data-");
        let assigningIndex = attributeEntry.indexOf("=");
        if (dataIndex >= 0) {
            if (assigningIndex >= 0) {
                let attributeName = attributeEntry.slice(dataIndex + 5, assigningIndex).trim().toLowerCase();
                let attributeValue = attributeEntry.slice(assigningIndex + 1).trim().replace(/'/g, "").replace(/&nbsp;/g, " ");

                attributesObject[attributeName] = attributeValue;
            } else {
                let attributeName = attributeEntry.slice(dataIndex + 5).trim().toLowerCase();

                attributesObject[attributeName] = true;
            }
        } else {
            if (assigningIndex >= 0) {
                let attributeName = attributeEntry.slice(0, assigningIndex).trim().toLowerCase();
                let attributeValue = attributeEntry.slice(assigningIndex + 1).trim().replace(/'/g, ""); 
                
                attributesObject[attributeName] = attributeValue;
            } else {
                let attributeName = attributeEntry.slice(0).trim().toLowerCase();

                attributesObject[attributeName] = true;
            }
        }
    }

    return attributesObject;
}



export default function StyleDescription({description}) {
    description = description.split("\n");
    const {refs, floatingStyles} = useFloating({
        middleware: [
            offset(5), 
            autoPlacement()
        ],
        whileElementsMounted: autoUpdate
    });    

    let title;
    let indexOfStyleWord = document.title.indexOf(" стиль");
    if (indexOfStyleWord > -1) {
        title = document.title.slice(0, indexOfStyleWord);
    } else {
        title = document.title;
    }

    return (<section>
            <h2>Описание стиля</h2>
            <div id={styles["description"]}>
                {description.map((paragraph, index) => {
                    return (<div className={styles["style-description"]} key={index + 1}> 
                        {paragraph.split("<mark").map((paragraphPart, paragraphIndex) => {
                                    if (paragraphIndex === 0) {
                                        return (<span key={`paragraph-part-${paragraphIndex + 1}`}>
                                                {paragraphPart}
                                            </span>
                                        );
                                    } else {
                                        let closingBraceIndex = paragraphPart.indexOf(">");

                                        let attributesString = paragraphPart.substring(0, closingBraceIndex);
                                        let attributesObject = getAttributes(attributesString);

                                        let image = attributesObject.image;
                                        let orientation = attributesObject.orientation;
                                        let descriptionOfImage = attributesObject.description;

                                        let text = paragraphPart.substring(closingBraceIndex + 1)
                                        let openingBraceIndex = text.indexOf("<");
                                        let lastClosingBraceIndex = text.indexOf(">");
                                        let textInMark = text.substring(0, openingBraceIndex);
                                        let remainingText = text.substring(lastClosingBraceIndex + 1);

                                        if (window.matchMedia("(min-width: 500px)").matches) {
                                            return (
                                                <span key={`paragraph-part-${index + 1}`}>
                                                    <mark ref={refs.setReference} 
                                                    key={`mark-${index + 1}`}
                                                    onPointerOver={() => document.getElementById(`describing-block-${index + 1}`).classList.add(styles["hidden"])}
                                                    onFocus = {() => document.getElementById(`describing-block-${index + 1}`).classList.add(styles["hidden"])}
                                                    onPointerOut={() => document.getElementById(`describing-block-${index + 1}`).classList.remove(styles["hidden"])}
                                                    onBlur={() => document.getElementById(`describing-block-${index + 1}`).classList.remove(styles["hidden"])} tabIndex={0}>{textInMark}</mark>
                                                    <figure className={`${styles["describing-block"]} ${styles["hidden"]}`} id={`describing-block-${index + 1}`} 
                                                    key={`describing-block-${index + 1}`} ref={refs.setFloating} style={floatingStyles}>
                                                        <img src={`/src/assets/Images/${title}/${image}`} 
                                                        className={styles['describing-image']}
                                                        id={`image-${index + 1}`}
                                                        key={`image-${index + 1}`}
                                                        alt={image.substring(0, image.indexOf("."))}
                                                        height="200"
                                                        width = {orientation.toLowerCase() === "vertical" ? "140" : "600"}>
                                                        </img>
                                                        <figcaption key={`caption-${index + 1}`}>{descriptionOfImage}</figcaption>
                                                    </figure>
                                                    {remainingText}
                                                </span>);
                                        } else {
                                            return (
                                                <span key={`paragraph-part-${index + 1}`}>
                                                    <mark 
                                                    key={`mark-${index + 1}`}
                                                    onPointerDown={() => {
                                                        document.querySelector(`.${styles["describing-block-mobile"]}`).showModal();
                                                    }}
                                                    >{textInMark}</mark>
                                                    <DescribingMobileDialog
                                                    index={index}
                                                    image={image}
                                                    descriptionOfImage={descriptionOfImage}
                                                    ></DescribingMobileDialog>
                                                    {remainingText}
                                                </span>);
                                        }
                                    }
                                }
                            )}
                    </div>)})}
            </div>
        </section>);
}

StyleDescription.propTypes = {
    description: string
};

function DescribingMobileDialog({index = 0, image="", orientation="vertical", descriptionOfImage="Нет описания картинки"}) {
    let title;
    let indexOfStyleWord = document.title.indexOf(" стиль");
    if (indexOfStyleWord > -1) {
        title = document.title.slice(0, indexOfStyleWord);
    } else {
        title = document.title;
    }

    return (
            <dialog className={styles['describing-block-mobile']} key={`describing-block-mobile-${index + 1}`}>
                <img src={`/src/assets${image ? "/Images/" + title : ""}/${image ? image : "placeholder.png"}`} 
                className={styles['describing-image']}
                id={`image-${index + 1}`}
                key={`image-${index + 1}`}
                alt={image.substring(0, image.indexOf("."))}
                height="200"
                width = {orientation.toLowerCase() === "vertical" ? "140" : "600"}>
                </img>
                <span key={`description-${index + 1}`}>{descriptionOfImage}</span>
                <button className={styles["close-mobile-dialog"]}
                onClick={() => document.querySelector(`.${styles["describing-block-mobile"]}`).close()}></button>
            </dialog>);
}

DescribingMobileDialog.propTypes = {
    index: number,
    image: string,
    orientation: string,
    descriptionOfImage: string
};