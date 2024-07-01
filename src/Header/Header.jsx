import {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {bool} from "prop-types";

import styles from "./Header.module.css";
import {StylesDataContext} from "../StylesDataContext";

/**
 * The component of website's header.
 * @component
 * @returns {React.JSX.Element} The rendered Header component.
 * @listens click
 */

export default function Header() {
  const stylesData = useContext(StylesDataContext);

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

      <header aria-live="assertive">
        <span className="visually-hidden" aria-live="assertive">{stylesData.length ? "Поиск по сайту доступен" : "Поиск по сайту пока недоступен"}</span>
        <div id={styles.logo}></div>
        <InputWithTooltip mobile={false}/>
        <button id={styles["search-mobile"]}
          onClick={() => document.getElementById(
            styles["search-mobile-dialog"]).showModal()}>
        </button>
        <Link to="/interior-design-styles/copyright"><div id={styles.copyright} title="Ссылки на авторов стороннего контента"></div></Link>
      </header>

      <MobileInputWithTooltip/>
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

function InputWithTooltip({mobile}) {
  const stylesData = useContext(StylesDataContext);
  const [appropriateLinks, setAppropriateLinks,] = useState([]);
  const [listenerAdded, setListenerAdded] = useState(false);

  const handleInput = function(event) {
    const tooltip = mobile ?
      document.querySelector(`.${styles["tooltip-mobile"]}`) :
      document.querySelector(`.${styles.tooltip}`);
    const linkInfos = [];

    for (const style of stylesData) {
      if (style.name.toLowerCase().startsWith(
        event.target.value.toLowerCase())
        && event.target.value.length > 0) {
        const linkInfo = {name: style.name,
          path: style.path,};
        linkInfos.push(linkInfo);
      }
    }

    if (linkInfos.length > 0) {
      if (!mobile) {
        tooltip.style.top = `${event.target.getBoundingClientRect().bottom + 10}px`;
        tooltip.style.left = `${event.target.getBoundingClientRect().left}px`;
      }

      const links = linkInfos.map(item => <li
        key={item.name}
        onClick={mobile ? () => {
          setAppropriateLinks([]);
          const inputAndTooltipMobile =
          document.querySelector(`.${styles["input-and-tooltip-mobile"]}`);
          inputAndTooltipMobile.firstElementChild.value = "";
          document.getElementById(styles["search-mobile-dialog"]).close();
        } : () => {}}><Link to={`/interior-design-styles/${item.path}`}>{item.name}</Link></li>);
      setAppropriateLinks(links);
    } else {
      tooltip.hidden = true;
      setAppropriateLinks([]);
    }
  };

  const handleFocus = function(event) {
    const tooltip = mobile ?
      document.querySelector(`.${styles["tooltip-mobile"]}`) :
      document.querySelector(`.${styles.tooltip}`);

    for (const style of stylesData) {
      if (style.name.toLowerCase().startsWith(event.target.value.toLowerCase())
        && event.target.value.length > 0 && !mobile) {
        tooltip.hidden = false;

        if (!mobile) {
          tooltip.style.top =
          `${event.target.getBoundingClientRect().bottom + 10}px`;
          tooltip.style.left = `${event.target.getBoundingClientRect().left}px`;
        }
        break;
      }
    }

    if(!listenerAdded) {
      window.addEventListener("resize", () => {
        if(!mobile) {
          let tooltipSelector = `.${styles.tooltip}`;
          let tooltip = document.querySelector(tooltipSelector);
          let input = document.querySelector("input[type='text']");
          
          tooltip.style.top = `${input.getBoundingClientRect().bottom + 10}px`;
          tooltip.style.left = `${input.getBoundingClientRect().left}px`;
        }
      })
      setListenerAdded(true);
    }
  };


  return (
    <div className={mobile ?
      styles["input-and-tooltip-mobile"] : styles["input-and-tooltip"]}
    onMouseLeave={() => document.querySelector(`.${styles.tooltip}`).hidden =
      true}>
      <input type="text" placeholder="Поиск по сайту"
        onInput={handleInput}
        onFocus={handleFocus}
        onMouseEnter={handleFocus}
        disabled={!(stylesData && stylesData.length !== 0)}
        title={stylesData && stylesData.length !== 0 ?
          "" : "Информация о стилях загружается"}/>
      <div className={!(stylesData &&
        stylesData.length !== 0) ?
        styles["magnifier-decorative-disabled"]
        : styles["magnifier-decorative"]}
      id={mobile ?
        styles["search-icon-mobile-dialog"]
        : styles["search-icon"]}>
      </div>
      <div className={mobile ?
        styles["tooltip-mobile"]
        : styles.tooltip} hidden={!appropriateLinks.length}
      onMouseLeave={mobile ? event => {
        if (!event.target.className === styles["input-and-tooltip"]) {
          document.querySelector(`.${styles.tooltip}`).hidden = true;
        }
      } : null}>
        <ul>
          {appropriateLinks}
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

const MobileInputWithTooltip = function() {
  return (
    <dialog id={styles["search-mobile-dialog"]}>
      <div className={styles["dialog-items-container"]}>
        <h2>Найти стиль</h2>
        <button className={styles["close-mobile-dialog"]} onClick={() => {
          document.getElementById(styles["search-mobile-dialog"]).close();
          const mobileInputWithTooltip = document.querySelector(
            `.${styles["input-and-tooltip-mobile"]}`
          );
          mobileInputWithTooltip.firstElementChild.value = "";
          document.querySelector(
            `.${styles["input-and-tooltip-mobile"]} ul`
          ).innerHTML = "";
        }}>
        </button>
        <InputWithTooltip mobile={true}/>
      </div>
    </dialog>
  );
};