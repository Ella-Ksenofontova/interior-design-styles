import styles from "./Gallery.module.css";
import GalleryCarousel from "../GalleryCarousel/GalleryCarousel";
import galleryStyles from "../GalleryCarousel/GalleryCarousel.module.css";
import { useState } from "react";

/**
 * Prevents default behaviour of specified event.
 * @param {Event} event - Event object.
 */

function preventDefault(event) {
  event.preventDefault();
}

/**
 * The component of gallery. It's used in style page.
 * @component
 * @param {Object} props - This component accepts _imagesData_ as prop.
 * @param {Array.<Object>} props.imagesData - Array of objects that contain information about images.
 * @returns {React.JSX.Element} The rendered Gallery component.
 * @listens load, click, mousewheel, touchmove (the last two since image is clicked and until the carousel is closed)
 */

export default function Gallery({ imagesData, }) {
  const indexOfWord = document.title.indexOf(" стиль");
  let styleName;
  if (indexOfWord > -1) {
    styleName = document.title.substring(0, indexOfWord);
  } else {
    styleName = document.title;
  }

  function handleClick(event) {
    const activeImage = event.target.src;
    setActiveImage(activeImage);
    setNumberOfOpens(numberOfOpens + 1);
  }

  const [activeImage, setActiveImage,] = useState("");
  const [dataForCarousel, setDataForCarousel,] = useState([]);
  const [IMGTagsAreLoaded, setIMGTagsAreLoaded,] = useState(false);
  const [numberOfOpens, setNumberOfOpens,] = useState(0);

  if (IMGTagsAreLoaded) {
    let currentCarouselData = imagesData.map((item, index) => ({
      description: item.description,
      name: document.getElementById(`gallery-image-${index + 1}`)?.src,
      width: Math.min(document.getElementById(`gallery-image-${index + 1}`)?.naturalWidth, innerWidth * 0.75)
    }));

    const equality_condition = JSON.stringify(currentCarouselData) === JSON.stringify(dataForCarousel);

    if (!equality_condition) setIMGTagsAreLoaded(false);

    if (dataForCarousel.length === 0 || !equality_condition) {
      setDataForCarousel(currentCarouselData);
    }
    window.addEventListener("resize", resizeImages);
  }

  function resizeImages() {
    const images = document.querySelectorAll("img[id^=gallery-image]");
    for (const image of images) {
      const ratio = image.naturalWidth / image.naturalHeight;
      image.width = Math.min(ratio * 150, document.body.offsetWidth - 50);
      image.height = image.width / ratio;
      image.parentElement.style.width = `${image.width}px`;
    }
  }

  return (
    <>
      <h2 className={styles["gallery-header"]}>Галерея</h2>
      <div className={styles["gallery-explanation"]}>Кликните на какое-либо изображение, чтобы просмотреть карусель.</div>
      <div className={styles.gallery}>
        {imagesData.map((item, index) => <figure key={`gallery-figure-${index + 1}`}>
          <img
            width={IMGTagsAreLoaded ? "" : 0}
            height={IMGTagsAreLoaded ? "" : 0}
            id={`gallery-image-${index + 1}`}
            key={`gallery-image-${index + 1}`}
            src={`/interior-design-styles/assets/styles_images/${styleName}/additional-${index + 1}.${item.extension}`}
            onLoad={e => {
              const ratio = e.target.naturalWidth / e.target.naturalHeight;
              const width = Math.min(ratio * 150, document.body.offsetWidth - 50);

              e.target.width = width;
              e.target.height = width / ratio;
              e.target.parentElement.style.width = `${e.target.width}px`;

              if (!IMGTagsAreLoaded && index === imagesData.length - 1) {
                setIMGTagsAreLoaded(true);
              }
            }}
            onClick={event => {
              handleClick(event);
              document.querySelector(`.${galleryStyles["gallery-carousel"]}`).showModal();

              let supportsPassive = false;
              try {
                const opts = Object.defineProperty({}, "passive", {
                  get: function () {
                    supportsPassive = true;
                  },
                });
                window.addEventListener("test", null, opts);
              } catch (e) {

              }

              const options = supportsPassive ? { passive: false, } : false;

              window.addEventListener("mousewheel", preventDefault, options);
              window.addEventListener("touchmove", preventDefault, options);
            }}
            alt={item.description}
          />
          <figcaption><span aria-hidden>{item.description}</span> <br />
            <a className={styles["source-of-image"]} href={item.source}><i>Источник или автор изображения</i></a>
          </figcaption>
        </figure>
        )}
      </div>

      {dataForCarousel.length > 0 ?
        <GalleryCarousel
          clickedImage={activeImage}
          imagesData={dataForCarousel}
          scrollCallback={preventDefault}
        ></GalleryCarousel> : ""
      }
    </>
  );
}