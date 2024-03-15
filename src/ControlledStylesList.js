import {useState} from "react";

import StylesDisplayController from "./StylesDisplayController";
import StylesList from "./StylesList";

export default function ControlledStylesList() {
    const [classicStylesAreShown, setClassicStylesAreShown] = useState(true);
    const [modernStylesAreShown, setModernStylesAreShown] = useState(true);
    const [ethnicStylesAreShown, setEthnicStylesAreShown] = useState(true);

    return(
        <>
            <StylesDisplayController 
                statesOfCheckboxes={[classicStylesAreShown, modernStylesAreShown, ethnicStylesAreShown]}
                onChangeCallbacks={[setClassicStylesAreShown, setModernStylesAreShown, setEthnicStylesAreShown]}
            >
            </StylesDisplayController>
            <StylesList
                statesOfCheckboxes={[classicStylesAreShown, modernStylesAreShown, ethnicStylesAreShown]}
            >
            </StylesList>
        </>
    );
}