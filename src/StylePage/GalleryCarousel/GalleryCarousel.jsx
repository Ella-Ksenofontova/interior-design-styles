import styles from "./GalleryCarousel.module.css";
import { useState, useEffect } from "react";

const GAP = 5;

function resizeImage(image, activeIndex = null) {
  const MAX_WIDTH = image.parentElement.parentElement.clientWidth;
  const MAX_HEIGHT = image.parentElement.parentElement.clientHeight;

  let width = 100;
  let height = width * (image.naturalHeight / image.naturalWidth);

  while (true) {
    const newWidth = width + 10;
    const newHeight = newWidth * (image.naturalHeight / image.naturalWidth);

    if (newWidth > MAX_WIDTH || newHeight > MAX_HEIGHT) break;

    width = newWidth;
    height = newHeight;

  }

  if (activeIndex !== null) {
    image.width = width;
    image.height = height;
  }
}

/**
 * The gallery carousel component.
 * @component
 * @param {Object} props - this component accepts _imagesData_, _clickedImage_ and _scrollCallback_ as props.
 * @param {Array.<Object>} props.imagesData - Data about displayed images.
 * @param {string} props.clickedImage - The path to clicked image.
 * @param {Function} props.scrollCallback - Callback which is called when _touchmove_ and _mousewheel_ events occur. This param is needed to enable scrolling when the carousel is closed.
 * @returns {React.JSX.Element} The rendered GalleryCarousel component.
 * @listens touchstart, touchend, pointermove (when user is touching the image), load, click
 */

export default function GalleryCarousel({ imagesData, clickedImage, scrollCallback }) {
  const [activeIndex, setActiveIndex] = useState(null);

  window.onresize = () => {
    const images = document.querySelectorAll(`.${styles["image-wrapper"]} img`);
    images.forEach(image => {
      resizeImage(image, activeIndex);
    });

    const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);
    if (imagesSequence) {
      imagesSequence.classList.add(styles["no-smooth-scroll"]);
      imagesSequence.scrollTo(findScrollWidth(activeIndex), 0);
    }
  };


  useEffect(() => {
    const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);
    const currentActiveIndex = imagesData.findIndex(item => item.name === clickedImage);
    if (imagesSequence?.parentElement.open && activeIndex === null && currentActiveIndex > -1) {
      imagesSequence.classList.add(styles["no-smooth-scroll"]);
      imagesSequence.scrollTo(findScrollWidth(currentActiveIndex), 0);
      setActiveIndex(currentActiveIndex);
    }
  });

  /**
     * Finds width that sequence of images should be scrolled to.
     * @param {number} currentIndex - index of image that should be shown after scrolling.
     * @returns {number} - Found scroll width in pixels.
     */

  function findScrollWidth(currentIndex) {
    const images = document.querySelectorAll(`.${styles["image-wrapper"]} img`);
    let i = 0;
    let foundScrollWidth = 0;

    while (i < currentIndex) {
      foundScrollWidth += images[i].parentElement.clientWidth + GAP;
      i++;
    }

    return foundScrollWidth;
  }

  function goToNextImage() {
    const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);
    let newIndex;

    if (activeIndex === imagesData.length - 1) {
      newIndex = 0;
      setActiveIndex(0);
    } else {
      newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
    }
    imagesSequence.classList.remove(styles["no-smooth-scroll"]);

    const description = document.querySelector(`.${styles.description}`);
    description.hidden = true;

    imagesSequence.scrollTo(findScrollWidth(newIndex), 0);

    description.hidden = false;
  }

  function goToPreviousImage() {
    const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);

    let newIndex;

    if (activeIndex === 0) {
      newIndex = imagesData.length - 1;
      setActiveIndex(newIndex);
    } else {
      newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
    }

    imagesSequence.classList.remove(styles["no-smooth-scroll"]);

    const description = document.querySelector(`.${styles.description}`);
    description.hidden = true;

    imagesSequence.scrollTo(findScrollWidth(newIndex), 0);

    setTimeout(() => description.hidden = false, 0);
  }

  if (clickedImage) {
    return (
      <dialog className={styles["gallery-carousel"]} aria-label={"Карусель с изображениями."} aria-live="assertive" id="gallery-carousel" onClose={() => {
        document.querySelector(`.${styles["gallery-carousel"]}`).close();
        setActiveIndex(null);
        window.removeEventListener("mousewheel", scrollCallback);
        window.removeEventListener("touchmove", scrollCallback);
      }}>
        <button id={styles.close}
          title="Закрыть карусель"
          onClick={() => {
            document.getElementById("gallery-carousel").close();
            setActiveIndex(null);
            window.removeEventListener("mousewheel", scrollCallback);
            window.removeEventListener("touchmove", scrollCallback);
          }}
        ></button>
        <button
          title="Предыдущее изображение"
          id={styles.previous}
          onClick={goToPreviousImage}
        ></button>
        <div className={styles["images-sequence"]}
          onTouchStart={() => {
            const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);
            imagesSequence.classList.add(styles["no-smooth-scroll"]);
            imagesSequence.onpointermove = event => {
              imagesSequence.scrollTo(imagesSequence.scrollLeft - event.movementX, 0);

              if (imagesSequence.scrollLeft - findScrollWidth(activeIndex) > innerWidth * 0.35) {
                if (activeIndex !== imagesData.length - 1) {
                  setActiveIndex(activeIndex + 1);
                }
              } else if (imagesSequence.scrollLeft - findScrollWidth(activeIndex) < -innerWidth * 0.35) {
                if (activeIndex > 0) {
                  setActiveIndex(activeIndex - 1);
                }
              }
            };
          }
          }
          onTouchEnd={
            () => {
              document.querySelector(`.${styles["images-sequence"]}`).onpointermove = "";
              const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);
              imagesSequence.classList.remove(styles["no-smooth-scroll"]);
              imagesSequence.scrollTo(findScrollWidth(activeIndex), 0);
            }
          }>
          {imagesData.map((item, index) =>
            <div className={styles["image-wrapper"]}
              key={`image-wrapper-${index + 1}`}>
              <img src={item.name}
                alt={imagesData[index].description}
                onLoad={(event) => {
                  resizeImage(event.target, activeIndex);
                }}
              />
            </div>
          )}
        </div>
        <button
          title="Следующее изображение"
          id={styles.next}
          onClick={goToNextImage}
        ></button>
        <div className={styles.description}>{activeIndex === null ? "" : imagesData[activeIndex].description}</div>
      </dialog>
    );
  }
  return (
    <dialog className={styles["gallery-carousel"]}>
      <div className="images-sequence">Тут пока ничего нет...</div>
    </dialog>
  );
}