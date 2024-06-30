import Header from "../Header/Header";
import HomePageLink from "../StylePage/HomePageLink/HomePageLink";

/**
 * The component of copyright page.
 * @component
 * @returns {React.JSX.Element} The rendered CopyrightPage component.
 */

export default function CopyrightPage() {
    document.title = "Сссылки на авторов стороннего контента";

    return(
        <>
            <Header />
            <main className="copyright-main">
                <HomePageLink />
                <h2>Ссылки на авторов стороннего контента</h2>
                <ul>
                    <li><a href="https://www.freepik.com/author/rawpixel-com">Ссылка на автора фона</a></li>
                    <li><a href="https://www.freepik.com/author/sketchepedia">Ссылка на автора фото интерьера в стиле ампир</a></li>
                    <li><a href="https://www.freepik.com/author/freepik">Ссылка на автора фото интерьера в стиле ар-деко</a></li>
                    <li><a href="https://www.freepik.com/author/freepik">Ссылка на автора фото интерьера в этническом стиле</a></li>
                    <li><a href="https://www.freepik.com/author/freepik">Ссылка на автора фото интерьера в японском стиле</a></li>
                    <li><a href="https://www.freepik.com/author/wirestock">Ссылка на автора фото интерьера в стиле хай-тек</a></li>
                    <li><a href="https://www.flaticon.com/ru/authors/creative-stall-premium ">Ссылка на автора иконки лупы</a></li>
                    <li><a href="https://www.flaticon.com/authors/ultimatearm">Ссылка на автора иконки люстры</a></li>
                    <li><a href="https://www.flaticon.com/authors/iconixar">Ссылка на автора иконки лампочки</a></li>
                    <li><a href="https://www.flaticon.com/authors/freepik">Ссылка на автора иконки африканской маски и веера</a></li>
                    <li><a href="https://www.flaticon.com/authors/vectaicon">Ссылка на автора иконки &quot;На главную&quot;</a></li>
                    <li><a href="https://www.flaticon.com/authors/cap-cool">Ссылка на автора иконки в виде знака авторского права</a></li>
                    <li><a href="https://www.flaticon.com/authors/muhammad-usman">Ссылка на автора иконки галочки</a></li>
                    <li><a href="https://storyset.com">Ссылка на источник картинки, использованной на странице 404</a></li>
                </ul>
            </main>
        </>
    )
}