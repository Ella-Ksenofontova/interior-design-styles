import styles from "./GalleryCarousel.module.css"
import { useState, useEffect } from "react";

/**
 * Changes the dimensions of images. It's a callback in _resize_ event listener.
 * @param {HTMLImageElement[]} imagesList - list of IMG tags which sizes should be changed.
 */

function resizeImages(imagesList) {
  for (let image of imagesList) {
    const ratio = image.naturalWidth / image.naturalHeight;
    if (ratio >= 1) {
      image.width = innerWidth * 0.7;
      const height = Math.min(innerHeight * 0.8 - 45, (1 / ratio) * innerWidth * 0.7);
      image.height = height;
    } else {
      image.height = innerHeight * 0.8 - 45;
      image.width = ratio * (innerHeight * 0.8 - 45);
    }
  
    image.parentElement.style.height = `${image.height}px`;
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

export default function GalleryCarousel({imagesData, clickedImage, scrollCallback}) {
    const [activeIndex, setActiveIndex] = useState(null);
    let currentActiveIndex = activeIndex ?? imagesData.findIndex(item => item.name === clickedImage);

    window.onresize =  () => {
        const images = document.querySelectorAll(`.${styles["image-wrapper"]} img`);
        resizeImages(images);

        const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);
        if (imagesSequence) {
          imagesSequence.classList.add(styles["resizing"]);
          imagesSequence.scrollTo(findScrollWidth(), 0);
        }
    };

    useEffect(() => {
      const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);
      if (imagesSequence && activeIndex === null) {
        imagesSequence.classList.add(styles["just-opened"]);
        imagesSequence.scrollTo(findScrollWidth(), 0);
      }
    })

    function findScrollWidth() {
      let i = 0;
      let foundScrollWidth= 0;

      while (i < currentActiveIndex) {
        foundScrollWidth += innerWidth * 0.7 + 5;
        i ++;
      }

      return foundScrollWidth;
    }

    function goToNextImage() {
      const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);

      if (currentActiveIndex === imagesData.length - 1) {
        currentActiveIndex = 0;
        setActiveIndex(0);
      } else {
        ++currentActiveIndex;
        setActiveIndex(currentActiveIndex);
      }

      imagesSequence.classList.remove(styles["just-opened"]);
      imagesSequence.classList.remove(styles["resizing"]);
      
      imagesSequence.scrollTo(findScrollWidth(), 0);
    }

    function goToPreviousImage() {
      const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);

      if (currentActiveIndex === 0) {
        currentActiveIndex = imagesData.length - 1;
        setActiveIndex(currentActiveIndex);
      } else {
        --currentActiveIndex;
        setActiveIndex(currentActiveIndex);
      }

      imagesSequence.classList.remove(styles["just-opened"]);
      imagesSequence.classList.remove(styles["resizing"]);

      imagesSequence.scrollTo(findScrollWidth(), 0);
    }

    if (clickedImage) {
      return (
        <dialog className={styles["gallery-carousel"]}>
          <button id={styles["close"]}
          onClick={() => {
            document.querySelector(`.${styles["gallery-carousel"]}`).close();
            setActiveIndex(null);
            window.removeEventListener("mousewheel", scrollCallback);
            window.removeEventListener('touchmove', scrollCallback);
          }}
          ></button>
          <button
            id={styles["previous"]}
            onClick={goToPreviousImage}
          ></button>
          <div className={styles["images-sequence"]}
          onTouchStart={() => {
              const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);
              imagesSequence.classList.add(styles["just-opened"]);
              imagesSequence.onpointermove = event => {
                imagesSequence.scrollTo(imagesSequence.scrollLeft - event.movementX, 0);

                if (imagesSequence.scrollLeft - findScrollWidth() > innerWidth * 0.35) {
                  if (currentActiveIndex !== imagesData.length - 1) {
                    ++currentActiveIndex;
                    setActiveIndex(currentActiveIndex);
                  }
                } else if (imagesSequence.scrollLeft - findScrollWidth() < -innerWidth * 0.35) {
                  if (currentActiveIndex > 0) {
                    --currentActiveIndex;
                    setActiveIndex(currentActiveIndex);
                  }
                }
              }
            }
          }
          onTouchEnd={
            () => {
              document.querySelector(`.${styles["images-sequence"]}`).onpointermove = "";
              const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);
              imagesSequence.classList.remove(styles["just-opened"]);
              imagesSequence.scrollTo(findScrollWidth(), 0);
            }
          }>
            {imagesData.map((item, index) => 
              <div className={styles["image-wrapper"]}
              key={`image-wrapper-${index + 1}`}
              >
                <img src={item.name}
                onLoad={(event) => {
                  const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);
                  if (index === imagesData.length - 1) {
                    imagesSequence.classList.add(styles["just-opened"]);
                    imagesSequence.scrollTo(findScrollWidth(), 0);
                  }

                  const ratio = event.target.naturalWidth / event.target.naturalHeight;
                  if (ratio >= 1) {
                    const height = Math.min(innerHeight * 0.8 - 45, (1 / ratio) * innerWidth * 0.7);
                    event.target.height = height;
                    event.target.width = innerWidth * 0.7;
                  } else {
                    event.target.height = innerHeight * 0.8 - 45;
                    event.target.width = ratio * (innerHeight * 0.8 - 45);
                  }

                  event.target.parentElement.style.height = `${event.target.height}px`;
                }}/>
              </div>
            )}
          </div>
          <button
            id={styles["next"]}
            onClick={goToNextImage}
          ></button>
          <div className={styles["description"]}>
            {imagesData[currentActiveIndex].description}
          </div>
        </dialog>
      );
    } else {
      return (
        <dialog className={styles["gallery-carousel"]}>
          <div className="images-sequence">Тут пока ничего нет...</div>
        </dialog>
      );
    }
}