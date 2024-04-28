import {arrayOf, bool, func} from "prop-types"
import styles from "./StylesDisplayController.module.css"

StylesDisplayController.propTypes = {
    statesOfCheckboxes: arrayOf(bool),
    onChangeCallbacks: arrayOf(func)
};

export default function StylesDisplayController({statesOfCheckboxes, onChangeCallbacks}) {
    let [classicStylesAreShown, modernStylesAreShown, ethnicStylesAreShown] = statesOfCheckboxes;
    let [setClassicStylesAreShown, setModernStylesAreShown, setEthnicStylesAreShown] = onChangeCallbacks;

    return(
        <form>
            <input type="checkbox" id="classic-styles" checked={classicStylesAreShown} onChange={event => setClassicStylesAreShown(event.target.checked)}></input>
            <span className={styles.checkbox} 
            tabIndex="0"
            onClick={event => {
                let realCheckbox = event.target.previousElementSibling
                realCheckbox.checked = !realCheckbox.checked;
                setClassicStylesAreShown(realCheckbox.checked)
                }}></span>
            <label htmlFor="classic-styles">Показать классические стили</label><br/>
            <input type="checkbox" id="modern-styles" checked={modernStylesAreShown} onChange={event => setModernStylesAreShown(event.target.checked)}></input>
            <span className={styles.checkbox} 
            tabIndex="0" 
            onClick={event => {
                let realCheckbox = event.target.previousElementSibling
                realCheckbox.checked = !realCheckbox.checked;
                setModernStylesAreShown(realCheckbox.checked)
                }}></span>
            <label htmlFor="modern-styles">Показать современные стили</label><br/>
            <input type="checkbox" id="ethnic-styles" checked={ethnicStylesAreShown} onChange={event => setEthnicStylesAreShown(event.target.checked)}></input>
            <span className={styles.checkbox} 
            tabIndex="0"
            onClick={event => {
                let realCheckbox = event.target.previousElementSibling
                realCheckbox.checked = !realCheckbox.checked;
                setEthnicStylesAreShown(realCheckbox.checked)
                }}></span>
            <label htmlFor="ethnic-styles">Показать этнические стили</label>
        </form>
    );
}