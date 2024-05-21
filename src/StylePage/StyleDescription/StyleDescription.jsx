import {useFloating, offset, autoPlacement, autoUpdate} from '@floating-ui/react';
import {number, string} from "prop-types";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useState } from 'react';

import styles from "./StyleDescription.module.css"

async function getAttributes(numberOfMark) {
    const firebaseConfig = {
        apiKey: "AIzaSyDq1ZY-CdiWgtPAUNaLyZKyfi0KKWr20mk",
        authDomain: "interior-design-styles-eef77.firebaseapp.com",
        projectId: "interior-design-styles-eef77",
        storageBucket: "interior-design-styles-eef77.appspot.com",
        messagingSenderId: "617285631640",
        appId: "1:617285631640:web:4feecb5b608fcbb18c1aed",
        measurementId: "G-BPSKCJ06PB"
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const docRef = doc(db, "Marks", `Mark${numberOfMark}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let attributes = {
            text: docSnap.get("text"),
            orientation: docSnap.get("orientation"),
            image: docSnap.get("image"),
            descriptionOfImage: docSnap.get("description")
        };

        return attributes;
    }

    return {text: "Ошибка: не найден соответствующий документ",
    orientation: "vertical",
    image: "",
    descriptionOfImage: "Нет описания картинки"};
}

export default function StyleDescription({description}) {
    description = description.split("\\n"); 

    return (<section>
                <h2>Описание стиля</h2>
                <div id={styles["description"]}>
                        {description.map((paragraph, index) => {
                            let initialParagraphParts = paragraph.split("!mark");

                            return(
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
    description: string
};

function ParagraphPart({initialText, index, paragraphIndex}) {
    const {refs, floatingStyles} = useFloating({
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
        descriptionOfImage: ""
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
    } else if (!requested)  {
        let regexp  =/^\d+/;
        let match = initialText.match(regexp);
        let remainingText = initialText.substring(match.length + 1);

        let attributes = getAttributes(match);

        attributes.then((result) => {
            setMarkParams(result);   
            setRequested(true);     
        });

        if (window.matchMedia("(min-width: 500px)").matches) {
            return (
            <>
                <mark ref={refs.setReference} 
                key={`mark-${index + 1}`}
                onPointerOver={() => document.getElementById(`describing-block-${index + 1}-${paragraphIndex + 1}`).classList.remove(styles["hidden"])}
                onFocus = {() => document.getElementById(`describing-block-${index + 1}-${paragraphIndex + 1}`).classList.remove(styles["hidden"])}
                onPointerOut={() => document.getElementById(`describing-block-${index + 1}-${paragraphIndex + 1}`).classList.add(styles["hidden"])}
                onBlur={() => document.getElementById(`describing-block-${index + 1}-${paragraphIndex + 1}`).classList.add(styles["hidden"])} tabIndex={0}>{markParams.text}</mark>
                <figure className={`${styles["describing-block"]} ${styles["hidden"]}`} id={`describing-block-${index + 1}-${paragraphIndex + 1}`} 
                key={`describing-block-${index + 1}-${paragraphIndex + 1}`} ref={refs.setFloating} style={floatingStyles}>
                    <img src={`/src/assets/styles_images/${title}/${markParams.image}`} 
                    className={styles['describing-image']}
                    id={`image-${index + 1}`}
                    key={`image-${index + 1}`}
                    alt={markParams.image.substring(0, markParams.image.indexOf("."))}
                    height={markParams.orientation.toLowerCase() === "vertical" ? "200" : "150"}
                    width = {markParams.orientation.toLowerCase() === "vertical" ? "125" : "300"}
                    />
                    <figcaption key={`caption-${index + 1}`}>{markParams.descriptionOfImage}</figcaption>
                </figure>
                {remainingText}
            </>); 
        } else {
            return (
                <>
                    <mark 
                    key={`mark-${index + 1}`}
                    onPointerDown={() => {
                    document.getElementById(`describing-block-mobile-${index + 1}-${paragraphIndex + 1}`).showModal();
                    }}
                    >{markParams.text}</mark>
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
}

ParagraphPart.propTypes = {
    initialText: string,
    index: number,
    paragraphIndex: number
};

function DescribingMobileDialog({index = 0, paragraphIndex = 0, image="", orientation="vertical", descriptionOfImage="Нет описания картинки"}) {
    let title;
    let indexOfStyleWord = document.title.indexOf(" стиль");
    if (indexOfStyleWord > -1) {
        title = document.title.slice(0, indexOfStyleWord);
    } else {
        title = document.title;
    }

    return (
            <dialog className={styles['describing-block-mobile']} key={`describing-block-mobile-${index + 1}-${paragraphIndex + 1}`} id={`describing-block-mobile-${index + 1}-${paragraphIndex + 1}`}>
                <img src={`/src/assets${image ? "/styles_images/" + title : ""}/${image ? image : "placeholder.png"}`} 
                className={styles['describing-image']}
                id={`image-${index + 1}`}
                key={`image-${index + 1}`}
                alt={image.substring(0, image.indexOf("."))}
                height={orientation.toLowerCase() === "vertical" ? "200" : "150"}
                width = {orientation.toLowerCase() === "vertical" ? "125" : "300"}>
                </img>
                <span key={`description-${index + 1}`}>{descriptionOfImage}</span>
                <button className={styles["close-mobile-dialog"]}
                onClick={() => document.getElementById(`describing-block-mobile-${index + 1}-${paragraphIndex + 1}`).close()}></button>
            </dialog>);
}

DescribingMobileDialog.propTypes = {
    index: number,
    paragraphIndex: number,
    image: string,
    orientation: string,
    descriptionOfImage: string
};