import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HomePageLink from "../StylePage/HomePageLink/HomePageLink";

/**
 * The component of copyright page.
 * @component
 * @returns {React.JSX.Element} The rendered CopyrightPage component.
 */

export default function CopyrightPage() {
  document.title = "Сссылки на авторов стороннего контента";

  return (
    <>
      <Header />
      <main className="copyright-main" id="main">
        <HomePageLink />
        <h2>Ссылки на авторов стороннего контента</h2>
        <ul>
          <li><a href="https://www.freepik.com/author/rawpixel-com">Автор фона</a></li>
          <li><a href="https://www.freepik.com/author/sketchepedia">Автор фото интерьера в стиле ампир</a></li>
          <li><a href="https://www.freepik.com/author/freepik">Автор фото интерьера в стиле ар-деко</a></li>
          <li><a href="https://www.freepik.com/author/freepik">Автор фото интерьера в этническом стиле</a></li>
          <li><a href="https://www.freepik.com/author/freepik">Автор фото интерьера в японском стиле</a></li>
          <li><a href="https://www.freepik.com/author/wirestock">Автор фото интерьера в стиле хай-тек</a></li>
          <li><a href="https://www.flaticon.com/ru/authors/creative-stall-premium ">Автор иконки лупы</a></li>
          <li><a href="https://www.flaticon.com/authors/ultimatearm">Автор иконки люстры</a></li>
          <li><a href="https://www.flaticon.com/authors/iconixar">Автор иконки лампочки</a></li>
          <li><a href="https://www.flaticon.com/authors/freepik">Автор иконки африканской маски и веера</a></li>
          <li><a href="https://www.flaticon.com/authors/vectaicon">Автор иконки &quot;На главную&quot;</a></li>
          <li><a href="https://www.flaticon.com/authors/freepik">Автор иконки в виде знака авторского права</a></li>
          <li><a href="https://www.flaticon.com/authors/muhammad-usman">Автор иконки галочки</a></li>
          <li><a href="https://www.flaticon.com/authors/inkubators">Автор иконки крестика</a></li>
          <li><a href="https://storyset.com">Источник картинки, использованной на странице 404</a></li>
        </ul>
      </main>
      <Footer/>
    </>
  );
}