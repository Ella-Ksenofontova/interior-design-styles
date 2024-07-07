const MARKS = [
  {
      "text": "пилястры",
      "image": "Пилястра.jpg",
      "orientation": "vertical",
      "description": "Пилястра похожа на колонну, но в отличие от неё имеет вертикальное строение.",
      "source": "https://www.freepik.com/author/wirestock",
      "name": "Mark1"
  },
  {
      "image": "Волюта.jpg",
      "description": "Волюта - это архитектурный мотив в виде спирали с кружком в центре.",
      "source": "https://old.bigenc.ru/fine_art/text/1928385",
      "orientation": "vertical",
      "text": "волютами",
      "name": "Mark10"
  },
  {
      "image": "Наличник.jpg",
      "source": "https://temple_architecture.academic.ru/231/%D0%BD%D0%B0%D0%BB%D0%B8%D1%87%D0%BD%D0%B8%D0%BA",
      "description": "Наличником называют обрамление окна или двери. На фото - наличник Строгановской церкви в Нижнем Новгороде.",
      "text": "наличниками",
      "orientation": "vertical",
      "name": "Mark11"
  },
  {
      "description": "Картуш - архитектурный мотив в виде обрамлённого завитками щита или свитка, внутри которого может располагаться герб, эмблема или какая-либо надпись.",
      "image": "Картуш.jpg",
      "source": "https://commons.wikimedia.org/wiki/User:Atamari",
      "text": "картушами",
      "orientation": "horizontal",
      "name": "Mark12"
  },
  {
      "description": "Так выглядит арабеска.",
      "text": "арабеской",
      "orientation": "horizontal",
      "source": "https://www.freepik.com/author/ededchechine",
      "image": "Арабеска.jpg",
      "name": "Mark13"
  },
  {
      "description": "Алебастр - материал, получаемый при обжиге гипса. На фото - светильник, изготовленный из этого минерала.",
      "orientation": "vertical",
      "text": "алебастр",
      "source": "https://en.wikipedia.org/wiki/User:Arpingstone",
      "image": "Алебастр.jpg",
      "name": "Mark14"
  },
  {
      "image": "Гурт.jpg",
      "source": "https://vlando.ru/articles/gurt/",
      "description": "Гурт - арка из тесаных клинчатых камней, укрепляющая ребра крестового свода, который выполнен из мелких камней. ",
      "orientation": "horizontal",
      "text": "Гуртовые своды",
      "name": "Mark15"
  },
  {
      "description": "Нервюра - выступающее относительно стены ребро готического крестового свода.",
      "source": "https://commons.wikimedia.org/wiki/User:Dark_Avenger~commonswiki",
      "text": "нервюра",
      "image": "Нервюра.jpg",
      "orientation": "vertical",
      "name": "Mark16"
  },
  {
      "text": "пилястрами",
      "image": "Пилястра.jpg",
      "description": "Пилястра похожа на колонну, но в отличие от неё имеет вертикальное строение.",
      "orientation": "vertical",
      "source": "https://www.freepik.com/author/wirestock",
      "name": "Mark17"
  },
  {
      "description": "Меандр - это геометрический орнамент, представляющий собой ломаную, звенья которой скручиваются в спираль под прямым углом друг к другу.",
      "orientation": "horizontal",
      "source": "https://www.freepik.com/author/freepik",
      "text": "меандра",
      "image": "Меандр.jpg",
      "name": "Mark18"
  },
  {
      "text": "аканта",
      "source": "https://commons.wikimedia.org/wiki/File:Morris_Acanthus_Wallpaper_1875.jpg",
      "description": "Акант - это распространённый орнамент в виде одноимённого растения.",
      "orientation": "vertical",
      "image": "Акант.jpg",
      "name": "Mark19"
  },
  {
      "text": "капителями",
      "source": "https://www.freepik.com/author/wirestock",
      "description": "Капитель - это верхняя часть колонны или пилястры.",
      "image": "Капитель.jpg",
      "orientation": "horizontal",
      "name": "Mark2"
  },
  {
      "description": "Архитрав - это горизонтальная перемычка, перекрывающая расстояние между вертикальными опорами или проёмы в стене.",
      "image": "Архитрав.png",
      "text": "архитравы",
      "orientation": "vertical",
      "source": "https://commons.wikimedia.org/wiki/User:V%C3%A4sk",
      "name": "Mark20"
  },
  {
      "description": "Аркада - это ряд одинаковых по форме и размеру арок, опирающихся на колонны или квадратные или прямоугольные столбы.",
      "text": "аркады",
      "orientation": "horizontal",
      "source": "https://commons.wikimedia.org/wiki/User:Gryffindor",
      "image": "Аркады.jpg",
      "name": "Mark21"
  },
  {
      "text": "фронтонами",
      "source": "https://commons.wikimedia.org/wiki/File:Frontons.png",
      "orientation": "vertical",
      "description": "Фронтон в общем случае - завершение фасада здания, ограниченное скатами крыши по бокам и карнизом у основания. На картинке вы можете видеть различные виды фронтонов.",
      "image": "Фронтоны.png",
      "name": "Mark22"
  },
  {
      "source": "http://mebel-make.ru/47.html",
      "text": "филёнка",
      "image": "Филёнка.jpg",
      "description": "Филёнка - часть стены, двери, пилястра, заглублённая или имеющая обрамление, по форме близкая к прямоугольнику.",
      "orientation": "horizontal",
      "name": "Mark23"
  },
  {
      "source": "https://profmetal-market.ru/magazin-profilnogo-metalla-onlajn__trashed/alyuminievyj-profil/shveller-p-profil/shveller-alyuminievyj-10x10x10x1-5/",
      "image": "Швеллер.jpg",
      "text": "швеллеры",
      "orientation": "horizontal",
      "description": "Швеллер - это металлическая опорная конструкция, имеющая П-образное сечение.",
      "name": "Mark24"
  },
  {
      "orientation": "horizontal",
      "image": "Сёдзи.jpg",
      "source": "https://commons.wikimedia.org/wiki/User:Fg2",
      "description": "Так выглядит сёдзи.",
      "text": "«сёдзи»",
      "name": "Mark25"
  },
  {
      "source": "https://commons.wikimedia.org/wiki/User:663highland",
      "image": "Фусума.jpg",
      "orientation": "vertical",
      "text": "фусума",
      "description": "Так выглядит фусума.",
      "name": "Mark26"
  },
  {
      "description": "Так выглядят тансу.",
      "text": "тансу",
      "orientation": "vertical",
      "image": "Тансу.jpg",
      "source": "https://vostok-art.ru/katalog/item/jv45.html",
      "name": "Mark27"
  },
  {
      "text": "токонома",
      "source": " https://ja.wikipedia.org/wiki/%E5%88%A9%E7%94%A8%E8%80%85:663highland",
      "image": "Токонома.jpg",
      "orientation": "horizontal",
      "description": "Так выглядит токонома.",
      "name": "Mark28"
  },
  {
      "source": "https://commons.wikimedia.org/wiki/User:Micha_L._Rieser",
      "orientation": "horizontal",
      "description": "Так выглядит футон.",
      "image": "Футон.jpg",
      "text": "футон",
      "name": "Mark29"
  },
  {
      "orientation": "horizontal",
      "source": "https://www.freepik.com/author/ededchechine",
      "text": "барельефом",
      "image": "Барельеф.jpg",
      "description": "Барельеф - выпуклое скульптурное изображение, в котором выступающая часть не превышает половины объёма всего произведения.",
      "name": "Mark3"
  },
  {
      "description": "Так выглядят татами.",
      "image": "Татами.jpg",
      "text": "татами",
      "source": " https://www.burkovfa.ru/stat/tatami.html",
      "orientation": "horizontal",
      "name": "Mark30"
  },
  {
      "description": "Так выглядят акари.",
      "text": "акари",
      "image": "Акари.jpg",
      "orientation": "vertical",
      "source": "https://basicdecor.ru/blog/post/id-myagkiy-svet-fonarya-akari/",
      "name": "Mark31"
  },
  {
      "orientation": "horizontal",
      "text": "энгавы",
      "image": "Энгава.png",
      "description": "Так выглядит энгава.",
      "source": "https://machiyado.com/",
      "name": "Mark32"
  },
  {
      "source": "https://commons.wikimedia.org/wiki/User:Jmabel",
      "text": "Икебана",
      "description": "Икебана - традиционное японское искусство компоновки срезанных цветов и побегов в специальных сосудах, а также правильного размещения таких композиций в интерьере.",
      "orientation": "vertical",
      "image": "Икебана.jpg",
      "name": "Mark33"
  },
  {
      "image": "Кратер.jpg",
      "text": "кратерами",
      "orientation": "horizontal",
      "description": "В Древней Греции кратером называли сосуд из металла и керамики для смешивания вина с водой.",
      "source": "https://commons.wikimedia.org/wiki/File:Greec_ancient_vase.jpg",
      "name": "Mark4"
  },
  {
      "text": "меандр",
      "orientation": "horizontal",
      "source": "https://www.freepik.com/author/freepik",
      "description": "Меандр - это геометрический орнамент, который представляет собой ломаную, звенья которой скручиваются в спираль под прямым углом друг к другу.",
      "image": "Меандр.jpg",
      "name": "Mark5"
  },
  {
      "description": "Плетёный орнамент, как понятно из его названия, воспроизводит переплетение стеблей, волокон, нитей ткани и т.д.",
      "orientation": "horizontal",
      "source": "https://www.freepik.com/author/freepik",
      "image": "Плетёнка.jpg",
      "text": "плетёнка",
      "name": "Mark6"
  },
  {
      "text": "пальметта",
      "source": "https://www.flickr.com/people/126377022@N07",
      "orientation": "vertical",
      "image": "Пальметта.jpg",
      "description": "Пальметтой называется орнамент в виде листа пальмового дерева.",
      "name": "Mark7"
  },
  {
      "source": "https://commons.wikimedia.org/wiki/User:BurgererSF",
      "description": "Эти керамические изделия отличаются чёрным цветом.",
      "orientation": "vertical",
      "text": "этрусская керамика «буккеро»",
      "image": "Буккеро.jpg",
      "name": "Mark8"
  },
  {
      "orientation": "vertical",
      "image": "Пилястра.jpg",
      "text": "пилястрами",
      "description": "Пилястра похожа на колонну, но в отличие от неё имеет вертикальное строение.",
      "source": "https://www.freepik.com/author/wirestock",
      "name": "Mark9"
  }
];

export default MARKS;