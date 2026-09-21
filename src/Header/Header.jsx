import { useState } from "react";
import { Link } from "react-router-dom";
import { bool } from "prop-types";

import styles from "./Header.module.css";
import STYLES_DATA from "../styles_data";

/**
 * The component of website's header.
 * @component
 * @param {object} props - This function accepts searchAvailableMessage as prop
 * @returns {React.JSX.Element} The rendered Header component.
 * @listens click
 */

export default function Header() {
  return (
    <>
      <span className={`visually-hidden ${styles["skip-link"]}`}>
        <a
          href="#main"
          onFocus={e => e.target.parentElement.classList.remove("visually-hidden")}
          onBlur={e => e.target.parentElement.classList.add("visually-hidden")}
        >
          Перейти к основному контенту
        </a>
      </span>

      <header>
        <InputWithTooltip mobile={false} />
        <button id={styles["search-mobile"]}
          onClick={() => document.getElementById(
            styles["search-mobile-dialog"]).showModal()}>
        </button>
        <Link to="/interior-design-styles/copyright" id={styles.copyright}><div className="visually-hidden">Ссылки на авторов стороннего контента</div></Link>
      </header>

      <MobileInputWithTooltip />
    </>
  );
}

InputWithTooltip.propTypes = {
  mobile: bool,
};

/**
 * The component that consists of input and tooltip. It's used to search styles.
 * @component
 * @param {Object} props - This component accepts _mobile_ as prop.
 * @param {boolean} props.mobile -  Indicates should we render mobile or desktop element.
 * @returns {React.JSX.Element} The rendered InputWithTooltip component.
 * @listens click, input, focus, mouseenter, mouseleave
 */

function InputWithTooltip({ mobile, }) {
  const [appropriateLinks, setAppropriateLinks,] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = function (event) {
    const linkInfos = [];

    for (const style of STYLES_DATA) {
      setSearchValue(event.target.value);
      if (style.name.toLowerCase().startsWith(
        event.target.value.toLowerCase())
        && event.target.value.length > 0) {
        const linkInfo = {
          name: style.name,
          path: style.path,
        };
        linkInfos.push(linkInfo);
      }
    }

    if (linkInfos.length > 0) {
      const links = linkInfos.map(item => <li
        key={item.name}
        onClick={mobile ? () => {
          setAppropriateLinks([]);
          const inputAndTooltipMobile =
            document.querySelector(`.${styles["input-and-tooltip-mobile"]}`);
          inputAndTooltipMobile.firstElementChild.value = "";
          document.getElementById(styles["search-mobile-dialog"]).close();
        } : () => { }}><Link to={`/interior-design-styles/${item.path}`}>{item.name}</Link></li>);
      setAppropriateLinks(links);
    } else {
      setAppropriateLinks([]);
    }
  };

  const handleFocus = function (event) {
    const tooltip = mobile ?
      document.querySelector(`.${styles["tooltip-mobile"]}`) :
      document.querySelector(`.${styles.tooltip}`);

    for (const style of STYLES_DATA) {
      if (style.name.toLowerCase().startsWith(event.target.value.toLowerCase())
        && event.target.value.length > 0 && !mobile) {
        tooltip.hidden = false;
        break;
      }
    }
  };


  return (
    <div className={mobile ?
      styles["input-and-tooltip-mobile"] : styles["input-and-tooltip"]}
      onMouseLeave={(event) => {
        console.log(event.relatedTarget);
        document.querySelector(`.${styles.tooltip}`).hidden =
        true
      }}>
      <div className={styles["search-field"]}>
        <input type="text" placeholder="Поиск по сайту"
          onInput={handleChange}
          onFocus={handleFocus}
          onMouseEnter={handleFocus} value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
          name={mobile ? "mobileSearchField" : "searchField"} />
        <div className={styles["magnifier-decorative"]}
          id={mobile ?
            styles["search-icon-mobile-dialog"]
            : styles["search-icon"]}>
        </div>
      </div>
      <div className={mobile ?
        styles["tooltip-mobile"]
        : styles.tooltip} hidden={!appropriateLinks.length && !searchValue}
        onMouseLeave={mobile ? event => {
          if (!event.relatedTarget.className === styles["input-and-tooltip"]) {
            document.querySelector(`.${styles.tooltip}`).hidden = true;
          }
        } : null}>
        <ul>
          {appropriateLinks.length && searchValue ? appropriateLinks : "Ничего не найдено"}
        </ul>
      </div>
    </div>
  );
};

/**
 * Mobile version for InputWithTooltip component. The feature of it is that everything in it is wrapped in _dialog_ tag.
 * @component
 * @returns {React.JSX.Element} The rendered MobileInputWithTooltip component.
 * @see {@link InputWithTooltip}
 */

const MobileInputWithTooltip = function () {
  return (
    <dialog id={styles["search-mobile-dialog"]}>
      <div className={styles["dialog-items-container"]}>
        <h2>Найти стиль</h2>
        <button className={styles["close-mobile-dialog"]} onClick={() => {
          document.getElementById(styles["search-mobile-dialog"]).close();
          setSearchValue("");
          document.querySelector(
            `.${styles["input-and-tooltip-mobile"]} ul`
          ).innerHTML = "";
        }}>
        </button>
        <InputWithTooltip mobile={true} />
      </div>
    </dialog>
  );
};