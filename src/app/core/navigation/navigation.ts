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
    title: 'Sua conta',
    type: 'section',
  },
  {
    title: 'Criar Anúncio',
    route: 'publicacao/nova',
    type: 'item',
    icon: 'post_add',
    label: 'Ir para criação de anúncio',
  },
  {
    title: 'Perfil',
    type: 'group',
    icon: 'person',
    children: [
      {
        title: 'Meus Dados',
        route: 'perfil/account',
        type: 'item',
        icon: 'account_circle',
        label: 'Ir para o perfil',
      },
      {
        title: 'Minhas Publicações',
        route: 'perfil/posts',
        type: 'item',
        icon: 'dashboard',
        label: 'Ir para minhas publicações',
      },
      {
        title: 'Favoritas',
        route: 'perfil/favoritas',
        type: 'item',
        icon: 'favorite',
        label: 'Ir para minhas publicações favoritas',
      }
    ]
  },
  {
    title: 'Publicações recomendadas',
    type: 'section',
    disabled: true
  },
  {
    title: 'Publicações',
    route: 'publicacao/lista',
    type: 'item',
    icon: 'dashboard',
    label: 'Publicações em alta',
    disabled: true
  },
  {
    title: 'Pesquisar',
    route: 'pesquisa',
    type: 'item',
    icon: 'search',
    label: 'Pesquisar no aplicativo',
    disabled: true
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