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
    title: 'Cursos',
    type: 'group',
    icon: 'book',
    label: 'Pesquisar por Cursos',
    children: [
      {
        title: 'Administração',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 1,
          curso: 'Administração'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Administração',
      },
      {
        title: 'Analise e desenvolvimento de Sistemas',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 2,
          curso: 'Analise e desenvolvimento de Sistemas'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Analise e desenvolvimento de Sistemas',
      },
      {
        title: 'Arquitetura e Urbanismo',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 3,
          curso: 'Arquitetura e Urbanismo'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Arquitetura e Urbanismo',
      },
      {
        title: 'Ciências Contábeis',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 4,
          curso: 'Ciências Contábeis'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Ciências Contábeis',
      },
      {
        title: 'Ciência da Computação',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 5,
          curso: 'Ciência da Computação'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Ciência da Computação',
      },
      {
        title: 'Direito',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 6,
          curso: 'Direito'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Direito',
      },
      {
        title: 'Educação Física',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 7,
          curso: 'Educação Física'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Educação Física',
      },
      {
        title: 'Enfermagem',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 8,
          curso: 'Enfermagem'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Enfermagem',
      },
      {
        title: 'Engenharia Civil',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 9,
          curso: 'Engenharia Civil'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Engenharia Civil',
      },
      {
        title: 'Engenharia da Computação',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 10,
          curso: 'Engenharia da Computação'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Engenharia da Computação',
      },
      {
        title: 'Engenharia de Produção',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 11,
          curso: 'Engenharia de Produção'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Engenharia de Produção',
      }
      ,
      {
        title: 'Engenharia de Software',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 12,
          curso: 'Engenharia de Software'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Engenharia de Software',
      },
      {
        title: 'Gastronomia',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 13,
          curso: 'Gastronomia'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Gastronomia',
      },
      {
        title: 'Medicina',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 14,
          curso: 'Medicina'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Medicina',
      },
      {
        title: 'Medicina veterinária',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 15,
          curso: 'Medicina veterinária'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Medicina veterinária',
      },
      {
        title: 'Pedagogia',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 16,
          curso: 'Pedagogia'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Pedagogia',
      },
      {
        title: 'Psicologia',
        route: 'publicacao/busca/curso',
        queryParams:{
          cursoId: 17,
          curso: 'Psicologia'
        },
        type: 'item',
        icon: 'none',
        label: 'Buscar por Psicologia',
      }
    ]
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