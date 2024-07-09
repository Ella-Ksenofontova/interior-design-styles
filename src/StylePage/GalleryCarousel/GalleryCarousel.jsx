import styles from "./GalleryCarousel.module.css";
import {useState, useEffect} from "react";

/**
 * Changes the dimensions of images. It's a callback in _resize_ event listener.
 * @param {HTMLImageElement[]} imagesList - list of IMG tags which sizes should be changed.
 */

function resizeImages(imagesList) {
  for (const image of imagesList) {
    const ratio = image.naturalWidth / image.naturalHeight;
    const maxHeight = innerHeight * 0.8 - 45;
    const maxWidth = innerWidth * 0.7;
    let width = 100;
    let height = (1 / ratio) * width;

    while(true) {
      const newWidth = width + 100;
      const newHeight = (1 / ratio) * newWidth;

      console.log(newHeight, maxHeight)

      if (newWidth > maxWidth || newHeight > maxHeight) {
        break
      }

      width = newWidth;
      height = newHeight;
    }

    image.width = width;
    image.height = height;
  
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

export default function GalleryCarousel({imagesData, clickedImage, scrollCallback,}) {
  const [activeIndex, setActiveIndex,] = useState(null);

  window.onresize =  () => {
    const images = document.querySelectorAll(`.${styles["image-wrapper"]} img`);
    resizeImages(images);

    const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);
    if (imagesSequence) {
      imagesSequence.classList.add(styles.resizing);
      imagesSequence.scrollTo(findScrollWidth(activeIndex), 0);
    }
  };

  
  useEffect(() => {
    const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);
    const currentActiveIndex = imagesData.findIndex(item => item.name === clickedImage);
    if (imagesSequence?.parentElement.open && activeIndex === null && currentActiveIndex > -1) {
      imagesSequence.classList.add(styles["just-opened"]);
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
    let i = 0;
    let foundScrollWidth = 0;

    while (i < currentIndex) {
      foundScrollWidth += innerWidth * 0.7 + 5;
      i ++;
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

    imagesSequence.classList.remove(styles["just-opened"]);
    imagesSequence.classList.remove(styles.resizing);

      
    imagesSequence.scrollTo(findScrollWidth(newIndex), 0);
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

    imagesSequence.classList.remove(styles["just-opened"]);
    imagesSequence.classList.remove(styles.resizing);

    imagesSequence.scrollTo(findScrollWidth(newIndex), 0);
  }

  if (clickedImage) {
    return (
      <dialog className={styles["gallery-carousel"]} aria-label={"Карусель с изображениями."} aria-live="assertive">
        <button id={styles.close}
          title="Закрыть карусель"
          onClick={() => {
            document.querySelector(`.${styles["gallery-carousel"]}`).close();
            setActiveIndex(null);
            window.removeEventListener("mousewheel", scrollCallback);
            window.removeEventListener("touchmove", scrollCallback);
          }}
        ></button>
        <button
          aria-hidden
          title="Предыдущее изображение"
          id={styles.previous}
          onClick={goToPreviousImage}
        ></button>
        <div className={styles["images-sequence"]}
          onTouchStart={() => {
            const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);
            imagesSequence.classList.add(styles["just-opened"]);
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
              imagesSequence.classList.remove(styles["just-opened"]);
              imagesSequence.scrollTo(findScrollWidth(activeIndex), 0);
            }
          }>
          {imagesData.map((item, index) => <div className={styles["image-wrapper"]}
            key={`image-wrapper-${index + 1}`}
          >
            <img src={item.name}
              alt={imagesData[index].description}
              onLoad={event => {
                const imagesSequence = document.querySelector(`.${styles["images-sequence"]}`);
                if (index === imagesData.length - 1) {
                  imagesSequence.classList.add(styles["just-opened"]);
                  imagesSequence.scrollTo(findScrollWidth(activeIndex), 0);
                }

                const image = event.target;

                const ratio = image.naturalWidth / image.naturalHeight;
                const maxHeight = innerHeight * 0.8 - 45;
                const maxWidth = innerWidth * 0.7;
                let width = 100;
                let height = (1 / ratio) * width;
            
                while(true) {
                  const newWidth = width + 100;
                  const newHeight = (1 / ratio) * newWidth;
            
                  if (newWidth > maxWidth || newHeight > maxHeight) {
                    break
                  }
            
                  width = newWidth;
                  height = newHeight;
                }

                image.width = width;
                image.height = height;
              
                image.parentElement.style.height = `${image.height}px`;
              }}/>
          </div>
          )}
        </div>
        <button
          aria-hidden
          title="Следующее изображение"
          id={styles.next}
          onClick={goToNextImage}
        ></button>
        <div className={styles.description} aria-hidden>
          {imagesData[activeIndex]?.description || ""}
        </div>
      </dialog>
    );
  }
  return (
    <dialog className={styles["gallery-carousel"]}>
      <div className="images-sequence">Тут пока ничего нет...</div>
    </dialog>
  );
}