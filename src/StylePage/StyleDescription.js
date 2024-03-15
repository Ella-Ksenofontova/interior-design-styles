// TODO: Добавить получение описаний, когда они появятся.
export default function StyleDescription({description}) {
    description = description.split("\n");

    return (
        <>
            <h2>Описание стиля</h2>
            <div id="description">
                {description.map((paragraph, index) => <p className="style-description" key={index + 1}>{paragraph}</p>)}
            </div>
        </>
    );
}