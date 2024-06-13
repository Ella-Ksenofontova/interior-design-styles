import {arrayOf, bool, func} from "prop-types"
import styles from "./StylesDisplayController.module.css"

StylesDisplayController.propTypes = {
    statesOfCheckboxes: arrayOf(bool),
    onChangeCallbacks: arrayOf(func)
};

/**
 * The component that consists of three checkboxes and corresponding labels. It's used on homepage.
 * @component
 * @param {Object} props - This component accepts _statesOfCheckboxes_ and _onChangeCallbacks_ as props.
 * @param {boolean[]} props.statesOfCheckboxes - An array of three boolean values that indicate which types of styles should be shown.
 * @param {Function[]} props.onChangeCallbacks - An array of callbacks that are fired when corresponding checkboxes are clicked.
 * @returns {React.JSX.Element} The renderes StylesDisplayController component.
 * @listens click
 */

export default function StylesDisplayController({statesOfCheckboxes, onChangeCallbacks}) {
    let [classicStylesAreShown, modernStylesAreShown, ethnicStylesAreShown] = statesOfCheckboxes;
    let [setClassicStylesAreShown, setModernStylesAreShown, setEthnicStylesAreShown] = onChangeCallbacks;

    return(
        <form>
            <input type="checkbox" id="classic-styles" checked={classicStylesAreShown} onChange={event => setClassicStylesAreShown(event.target.checked)}></input>
            <span className={styles.checkbox} 
            tabIndex="0"
            onClick={event => {
                let realCheckbox = event.target.previousElementSibling;
                realCheckbox.checked = !realCheckbox.checked;
                setClassicStylesAreShown(realCheckbox.checked);
                }}></span>
            <label htmlFor="classic-styles">Показать классические стили</label><br/>
            <input type="checkbox" id="modern-styles" checked={modernStylesAreShown} onChange={event => setModernStylesAreShown(event.target.checked)}></input>
            <span className={styles.checkbox} 
            tabIndex="0" 
            onClick={event => {
                let realCheckbox = event.target.previousElementSibling;
                realCheckbox.checked = !realCheckbox.checked;
                setModernStylesAreShown(realCheckbox.checked);
                }}></span>
            <label htmlFor="modern-styles">Показать современные стили</label><br/>
            <input type="checkbox" id="ethnic-styles" checked={ethnicStylesAreShown} onChange={event => setEthnicStylesAreShown(event.target.checked)}></input>
            <span className={styles.checkbox} 
            tabIndex="0"
            onClick={event => {
                let realCheckbox = event.target.previousElementSibling;
                realCheckbox.checked = !realCheckbox.checked;
                setEthnicStylesAreShown(realCheckbox.checked);
                }}></span>
            <label htmlFor="ethnic-styles">Показать этнические стили</label>
        </form>
    );
}