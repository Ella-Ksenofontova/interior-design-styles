export default function StyleCard({styleName, styleOrder}) {
    const styleTitle = styleOrder == "before" ? `${styleName} стиль` : "Стиль " + `${styleName.toLowerCase()}`

    return (
        <div className="style-image" style={{background: `url("https://ella-ksenofontova.github.io/interior-design-styles/Materials/Images/${styleName}.jpg") center / cover, url("Materials/Images/${styleName}.svg") center / cover, #F3DAB3 center / cover`}}>
            <div className="style-name"><h2>{styleTitle}</h2></div>
        </div>
    );
}