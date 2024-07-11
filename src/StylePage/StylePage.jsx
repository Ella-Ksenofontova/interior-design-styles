import {string} from "prop-types";

import Header from "../Header/Header";
import HomePageLink from "./HomePageLink/HomePageLink";
import StyleCard from "./StyleCard/StyleCard";
import StyleDescription from "./StyleDescription/StyleDescription";
import RelatedStylesList from "./RelatedStylesList/RelatedStylesList";
import SourcesList from "./SourcesList/SourcesList";
import Gallery from "./Gallery/Gallery";
import Footer from "../Footer/Footer";

import styles from "./StylePage.module.css";
import STYLES_DATA from "../styles_data";
import STYLES_DESCRIPTIONS from "../styles_descriptions";
import MARKS from "../marks";

/**
 * The component of style page.
 * @param {Object} props - This component accepts _styleName_ and _styleOrder_ as props.
 * @param {string} props.styleName - name of the style.
 * @param {"before" | "after"} props.styleOrder - indicates whether word "Стиль" (means "style" in Russian) should be written before or after style's name.
 * @returns {React.JSX.Element} The rendered StylePage component.
 */

export default function StylePage({styleName, styleOrder,}) {
  document.title = styleOrder == "before" ? `${styleName} стиль` : styleName;
  window.scrollTo(0, 0);
  let sources = [];
  const styleData = STYLES_DATA.find(item => item.name === styleName);
  const description = STYLES_DESCRIPTIONS.find(item => item.name === styleName).description;

  const regexp = /!mark\d+/g;
  const matches = description.match(regexp);
  if (matches) {
    const numbersOfMarks = matches.map(item => item.substring(5));
    for (let number of numbersOfMarks) {
      let markObj = MARKS.find(item => item.name === `Mark${number}`);
      sources.push({
        url: markObj?.source,
        description: markObj?.image.substring(0, markObj.image.indexOf("."))
      });
    }
  }

  const imagesData = styleData.imagesSources.map((item, index) => {
    return {
      extension: styleData.imagesExtensions[index] || "jpg",
      description: styleData.galleryDescriptions[index] || "Нет описания картинки",
      source: styleData.imagesSources[index] || "",
    }
  })

  return (
      <>
        <Header searchAvailableMessage=""/>
        <main className={styles["style-page-main"]} id="main">
          <HomePageLink />
          <StyleCard styleName={styleName}
            styleOrder={styleOrder}
            source={styleData.cardSource}/>
          <StyleDescription description={description.split("\\n")} />

          {imagesData.length > 0 ?
            <Gallery imagesData={imagesData} /> : ""
          }

          {styleData.relatedStyles.length > 0 ? <RelatedStylesList relatedStyles={styleData.relatedStyles} /> : ""}

          {styleData.infoSources?.length > 0 ?
            <SourcesList title="Источники информации" sources={styleData.infoSources}/> : ""}

          {sources.length ?
            <SourcesList title="Источники изображений"
              explanation="Здесь перечислены источники картинок, которые использовались во всплывающих подсказках к следующим словам: "
              sources={sources}/> : ""}
        </main>
        <Footer/>
      </>
    );
}

StylePage.propTypes = {
  styleName: string,
  styleOrder: string,
};