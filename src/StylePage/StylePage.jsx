import {string} from "prop-types"

import Header from "../Header/Header"
import HomePageLink from "./HomePageLink/HomePageLink"
import StyleCard from "./StyleCard/StyleCard"
import StyleDescription from "./StyleDescription/StyleDescription"
import RelatedStylesList from "./RelatedStylesList/RelatedStylesList"

import DATA from "../styles_data";
import STYLES_DESCRIPTIONS from "../styles_descriptions";

export default function StylePage({styleName, styleOrder}) {
    document.title = styleOrder == "before" ? `${styleName} стиль` : styleName;
    window.scrollTo(0, 0);

    const styleInfo = DATA.find(item => styleName.toLowerCase().includes(item.name.toLowerCase()));
    const relatedStyles = styleInfo?.relatedStyles;

    return (
        <>
            <Header />
            <main>
                <HomePageLink />
                <StyleCard styleName={styleName} styleOrder={styleOrder}/>
                <StyleDescription description={STYLES_DESCRIPTIONS.find(item => item.name == styleName).description}/>
                {relatedStyles ? <RelatedStylesList relatedStyles={relatedStyles}/> : ""}
            </main>
        </>
    );
}

StylePage.propTypes = {
    styleName: string,
    styleOrder: string
};