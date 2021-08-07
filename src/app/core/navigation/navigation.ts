import { applicationName } from "../static/application-name";
import { NavigationItemModel } from "../static/navigation-item.model";

export const navigation: NavigationItemModel[] = [
  {
    title: 'University Market',
    type: 'section',
  },
  {
    title: 'Autenticação',
    type: 'item',
    route: 'auth',
    icon: 'lock',
    label: 'Ir para tela de login',
  },
  {
    title: 'Homepage',
    type: 'item',
    route: 'home',
    icon: 'home',
    label: 'Ir para homepage',
  },
  {
    title: 'Sobre você',
    type: 'section',
  },
  {
    title: 'Minha conta',
    type: 'group',
    icon: 'account_circle',
    children: [
      {
        title: 'Perfil',
        route: 'perfil',
        type: 'item',
        icon: 'person',
        label: 'Ir para o perfil',
      },
    ]
  },
  {
    title: 'Publicações recomendadas',
    type: 'section',
  },
  {
    title: 'Publicações',
    route: 'publicacao',
    type: 'item',
    icon: 'dashboard',
    label: 'Publicações em alta',
  },
  {
    title: 'Pesquisar',
    route: 'pesquisa',
    type: 'item',
    icon: 'search',
    label: 'Pesquisar no aplicativo',
  },
  {
    title: 'Galeria',
    route: 'galeria',
    type: 'item',
    icon: 'collections',
    label: 'Galeria - ' + applicationName,
    disabled: true
  },
  {
    title: 'Base de conhecimento',
    route: 'knowledge-base',
    type: 'item',
    icon: 'feed',
    label: 'Base de conhecimento - U.M.',
    disabled: true
  },
  {
    title: 'Contato',
    route: 'contato',
    type: 'item',
    icon: 'perm_phone_msg',
    label: 'Entre em contato conosco',
    disabled: true
  }
];