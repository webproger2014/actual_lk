export default {
  'slide-0': {
    title: 'Сколько будет этажей у Вашего дома?',
    checked: false,
    next: 'slide-1',
    questions: {
      type: 'radiogallery',
      items: [
        {
          img: 'https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_420,h_420,q_100,c_fill/y281vsnhxmxbkfpdkvay.jpg',
          title: 'Одноэтажный дом'
        },
        {
          img: 'https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_420,h_420,q_100,c_fill/oh6j2qi3i7odh8s4867o.jpg',
          title: 'Дом с мансардой'
        },
        {
          img: 'https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_420,h_420,q_100,c_fill/rq2aoe9x2eceiokzza78.jpg',
          title: 'Двухэтажный дом'
        }
      ]
    }
  },

  'slide-1': {
    title: 'Какая квадратура дома?',
    checked: false,
    next: 'slide-2',
    questions: {
      type: 'radioitems',
      items: [
        { title: 'До 100 кв.м' },
        { title: 'От 100 кв.м до 150 кв.м' },
        { title: 'От 150 кв.м до 250 кв.м' },
        { title: 'От 250 кв.м до 500 кв.м' },
        { title: 'От 500 кв.м' }
      ]
    }
  },

  'slide-2': {
    title: 'У Вас есть земельный участок?',
    checked: false,
    next: 'slide-3',
    questions: {
      type: 'radioitems',
      items: [
        { title: 'Да' },
        { title: 'На стадии оформления' },
        { title: 'Нет',
          next: 'slide-2-3'
        }
      ]
    }
  },

  'slide-2-3': {
    title: 'Нужна ли Вам помощь с подбором участка?',
    type: 'radioitems',
    next: 'slide-3',
    checked: false,
    questions: {
      type: 'radioitems',
      items: [
        { title: 'Да' },
        { title: 'Нет' }
      ]
    }
  },

  'slide-3': {
    title: 'Когда планируете строиться?',
    checked: false,
    next: 'slide-4',
    questions: {
      type: 'radioitems',
      items: [
        { title: 'В этом сезоне' },
        { title: 'В течение года' },
        { title: 'Через год и более' }
      ]
    }
  },

  'slide-4': {
    title: 'Какой материал несущих стен?',
    checked: false,
    next: 'slide-5',
    questions: {
      type: 'radiogallery',
      items: [
        {
          img: 'https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_180,h_240,q_100,c_fill/ekxlp2rqip8u8sjznvk9.jpg',
          title: 'Кирпич'
        },
        {
          img: 'https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_180,h_240,q_100,c_fill/n5caqgkcfrsigja8f5ci.jpg',
          title: 'Керамические блоки'
        },
        {
          img: 'https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_180,h_240,q_100,c_fill/lbwdtmc1mhlo01ahreqt.jpg',
          title: 'Керамзитоблок'
        },
        {
          img: 'https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_180,h_240,q_100,c_fill/u8n7nd5fm6ykhsyf2ng6.jpg',
          title: 'Газоблок'
        },
        {
          img: 'https://res.cloudinary.com/hgwipn3sa/image/upload/dpr_1.0,f_auto,w_180,h_240,q_100,c_fill/lat5i2mtahaa80nxdb0o.jpg',
          title: 'Не могу определиться с выбором'
        }
      ]
    }
  },

  'slide-5': {
    title: 'Какие виды строительных работ включить в смету?',
    checked: [],
    next: 'end',
    questions: {
      type: 'checkboxitems',
      items: [
        { title: 'Установка окон и дверей' },
        { title: 'Инженерные сети' },
        { title: 'Облицовка фасада кирпичом' },
        { title: 'Облицовка "Мокрый Фасад"' },
        { title: 'Внутренняя отделка' }
      ]
    }
  }

}
