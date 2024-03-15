import Header from "../Header"
import HomePageLink from "./HomePageLink"
import StyleCard from "./StyleCard"
import StyleDescription from "./StyleDescription"
import RelatedStylesList from "./RelatedStylesList"

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