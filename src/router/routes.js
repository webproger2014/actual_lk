
const routes = [
  {
    path: '/',
    component: () => import('layouts/index.vue'),
    children: [
      { path: '', component: () => import('pages/home/index.vue'), name: 'Главная' },
      { path: '/contract', component: () => import('pages/contract/index.vue'), name: 'Договор' },
      { path: '/garanty', component: () => import('pages/garanty/index.vue'), name: 'Гарантийное обслуживание' },
      { path: '/project', component: () => import('pages/project/index.vue'), name: 'Проект' },
      { path: '/collection',
        component: () => import('pages/collection/index.vue'),
        children: [
          { path: '', component: () => import('pages/collection/default/index.vue'), name: 'Коллекция проектов' },
          { path: ':id', component: () => import('pages/collection/item/index.vue'), name: 'Проект из коллекции' },
          { path: 'list', component: () => import('pages/collection/list/index.vue'), name: 'Тикет' }
        ]
      },
      { path: '/stages', component: () => import('pages/stages/index.vue'), name: 'Этапы строительства' },
      { path: '/graphpayment', component: () => import('pages/graphpayment/index.vue'), name: 'График платежей' },
      { path: '/services', component: () => import('pages/services/index.vue'), name: 'Услуги' },
      { path: '/offers', component: () => import('pages/offers/index.vue'), name: 'Мои предложения' },
      { path: '/video', component: () => import('pages/cctv/index.vue'), name: 'Видеонаблюдение' },
      { path: '/task',
        component: () => import('pages/tasks/index.vue'),
        children: [
          { path: '', component: () => import('pages/tasks/default/index.vue'), name: 'Задачи по объекту' },
          { path: ':id', component: () => import('pages/tasks/item/index.vue'), name: 'Задачи по объекту2' },
          { path: 'list', component: () => import('pages/tasks/list/index.vue'), name: 'Тикет' }
        ]
      },
      { path: '/calculate',
        component: () => import('pages/calculate/index.vue'),
        children: [
          { path: '', component: () => import('pages/calculate/quiz/index.vue'), name: 'Расчёт стоимости дома' }
        ] },
      { path: '/team', component: () => import('pages/team/index.vue'), name: 'Команда' },
      { path: '/settings', component: () => import('pages/settings/index.vue'), name: 'Настройки аккаунта' },
      { path: '/profile', component: () => import('pages/profile/index.vue'), name: 'Профиль' },
      { path: '/slider', component: () => import('pages/slider/index.vue'), name: 'Слайдер' },
      { path: '/projects',
        component: () => import('pages/calculate/index.vue'),
        children: [
          { path: '', component: () => import('pages/projects/list.vue'), name: 'Проекты домов' }
        ] }
    ]
  },

  // {
  //   path: '/chat',
  //   name: '',
  //   component: () => import('layouts/chat/index.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/chat/index.vue'), name: 'Чат с командой' }
  //   ]
  // },

  {
    path: '/auth',
    name: '',
    component: () => import('layouts/auth/index.vue'),
    children: [
      { path: '', component: () => import('pages/auth/index.vue'), name: 'Авторизация' }
    ]
  },

  {
    path: '/register',
    name: '',
    component: () => import('layouts/auth/index.vue'),
    children: [
      { path: '', component: () => import('pages/register/index.vue'), name: 'Регистрация' }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
