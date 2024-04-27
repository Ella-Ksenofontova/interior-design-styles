import Header from "../Header/Header";
import HomePageLink from "../StylePage/HomePageLink/HomePageLink";
import LINKS from "./links";

export default function CopyrightPage() {
    return(
        <>
            <Header />
            <main>
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
                </ul>
                <h2>Ссылки на авторов картинок стилей</h2>
                <ul>
                    {LINKS.map(item => <li key={item.name}><a href={item.link}>{item.name}</a></li>)}
                </ul>
            </main>
        </>
    )
}