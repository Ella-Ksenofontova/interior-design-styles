import React, {useState} from "react";

import StylesDisplayController from "../StylesDisplayController/StylesDisplayController";
import StylesList from "../StylesList/StylesList";

/**
 * Component that is a union StylesDisplayController and StylesList components. It is rendered on home page.
 * @component
 * @returns {React.JSX.Element} The rendered ControlledStylesList component.
 */

export default function ControlledStylesList() {
  const [classicStylesAreShown, setClassicStylesAreShown,] = useState(true);
  const [modernStylesAreShown, setModernStylesAreShown,] = useState(true);
  const [ethnicStylesAreShown, setEthnicStylesAreShown,] = useState(true);

  return (
    <>
      <StylesDisplayController
        statesOfCheckboxes={[classicStylesAreShown, modernStylesAreShown, ethnicStylesAreShown,]}
        onChangeCallbacks={[setClassicStylesAreShown, setModernStylesAreShown, setEthnicStylesAreShown,]}
      >
      </StylesDisplayController>
      <StylesList
        statesOfCheckboxes={[classicStylesAreShown, modernStylesAreShown, ethnicStylesAreShown,]}
      >
      </StylesList>
    </>
  );
}