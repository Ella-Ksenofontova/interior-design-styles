import { useState } from "react";
import DATA from "./styles_data";
import { Link } from "react-router-dom";

export default function Header() {
    return(
        <>
        <header>
            <div id="logo"></div>
            <InputWithTooltip />
            <button id="search-mobile"
            onClick={() => document.getElementById("search-mobile-dialog").showModal()}>
            </button>
            <Link to="/copyright"><div id="copyright"></div></Link>
        </header>

        <MobileInputWithTooltip />
        </>
    );
}

function InputWithTooltip({mobile=false}) {
    const [appropriateLinks, setAppropriateLinks] = useState([]);

    function handleInput(event) {
        let tooltip = document.querySelector(".tooltip");
        let linkInfos = [];

        for (let style of DATA) {
            if (style.name.toLowerCase().startsWith(event.target.value.toLowerCase()) && event.target.value.length > 0) {
                let linkInfo = {name: style.name, path: style.path};
                linkInfos.push(linkInfo);
            }
        }

        if(linkInfos.length > 0) {
            tooltip.hidden = false;
            tooltip.style.top = event.target.getBoundingClientRect().bottom + 10 + "px";
            tooltip.style.left = event.target.getBoundingClientRect().left + "px";

            let links = linkInfos.map(item => 
                <li key={item.name}><Link to={`/${item.path}`}>{item.name}</Link></li>);
            setAppropriateLinks(links);
        } else {
            tooltip.hidden = true;
            setAppropriateLinks([]);
        }
    }

    function handleFocus(event) {
        let tooltip = document.querySelector(".tooltip");

        for (let style of DATA) {
            if (style.name.toLowerCase().startsWith(event.target.value.toLowerCase()) && event.target.value.length > 0) {
                tooltip.hidden = false;
                tooltip.style.top = event.target.getBoundingClientRect().bottom + 10 + "px";
                tooltip.style.left = event.target.getBoundingClientRect().left + "px";
                break;
            }
        }
    }


    return (
        <div className={mobile ? "input-and-tooltip-mobile" : "input-and-tooltip"} 
            onMouseLeave={() => document.querySelector(".tooltip").hidden = true}>
                <input type="text" placeholder="Поиск по сайту"
                onInput={handleInput}
                onFocus={handleFocus}
                onMouseEnter={handleFocus}/>
                <img src="https://ella-ksenofontova.github.io/interior-design-styles/Materials/magnifier.png" height="20" width="20" id={mobile ? "search-icon-mobile-dialog" : "search-icon"} aria-hidden alt=""/>
                <div className={mobile ? "tooltip-mobile" : "tooltip"} hidden={!mobile || !appropriateLinks.length}
                onMouseLeave={mobile ? event => {
                    if (!event.target.className == "input-and-tooltip") {
                        document.querySelector(".tooltip").hidden = true;
                    }
                } : null}>
                    <ul>
                        {appropriateLinks}
                    </ul>
                </div>
            </div>
    );
}

function MobileInputWithTooltip() {
    return(
        <dialog id="search-mobile-dialog">
            <div className="dialog-items-container">
                <h2>Найти стиль</h2>
                <button id="close-mobile-dialog" onClick={() => document.getElementById("search-mobile-dialog").close()}>
                </button>
                <InputWithTooltip mobile={true}/>
            </div>
        </dialog>
    )
}