import { applicationName } from "../static/application-name";
import { NavigationItemModel } from "../static/navigation-item.model";

export const navigation: NavigationItemModel[] = [
  {
    title: 'Autenticação',
    route: 'auth',
    icon: 'lock',
    label: 'Ir para tela de login',
  },
  {
    title: 'Homepage',
    route: 'home',
    icon: 'home',
    label: 'Ir para homepage',
  },
  {
    title: 'Perfil',
    route: 'perfil',
    icon: 'person',
    label: 'Ir para o perfil',
  },
  {
    title: 'Pesquisar',
    route: 'pesquisa',
    icon: 'search',
    label: 'Pesquisar no aplicativo',
  },
  {
    title: 'Publicações',
    route: 'publicacao',
    icon: 'dashboard',
    label: 'Publicações em alta',
  },
  {
    title: 'Galeria',
    route: 'galeria',
    icon: 'collections',
    label: 'Galeria - ' + applicationName,
    disabled: true
  },
  {
    title: 'Base de conhecimento',
    route: 'knowledge-base',
    icon: 'feed',
    label: 'Base de conhecimento - U.M.',
    disabled: true
  },
  {
    title: 'Contato',
    route: 'contato',
    icon: 'perm_phone_msg',
    label: 'Entre em contato conosco',
    disabled: true
  }
];