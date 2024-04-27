import {useState} from "react";

import StylesDisplayController from "../StylesDisplayController/StylesDisplayController";
import StylesList from "../StylesList/StylesList";

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