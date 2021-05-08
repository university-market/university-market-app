# :computer: university-market-app
Projeto front-end da aplicação University Market.

## Conteúdo

* [Sobre](#about)
* [Requisitos](#requirements)
* [Instalação](#installation)
* [Tecnologias](#technologies)

<div id='about'/> &nbsp;

## :pushpin: Sobre

Este projeto é a camada de front-end de uma aplicação desenvolvida por um grupo de estudantes universitários :books:.

A proposta deste projeto é disponibilizar uma plataforma destinada a estudantes dos mais diversos níveis de ensino, onde seja possível realizar a compra e venda de materias que são utilizados durante o processo de aprendizado de determinadas disciplinas.

Um livro que não será utilizado mais, um computador antigo, alguma ferramenta utilizada apenas no primeiro semestre do curso. Todos estes materiais podem ser reutilizados por outros estudantes que, muitas vezes, não têm condições de adquirir materiais novos, pelo seu alto valor.

<div id='requirements'/> &nbsp;

## :pushpin: Requisitos

>*Estes requisitos são direcionados ao desenvolvedores do projeto*

- [x] [NodeJs](https://nodejs.org/en/) instalado (LTS version) - necessário para o gerenciamento de pacotes da aplicação, com `npm` (*Node Package Manager*)
- [x] Angular CLI - [como instalar?](#installation) - necessário para utilização do Angular e execução do projeto via terminal
- [x] Navegador com suporte às versões recentes do JavaScript - recomenda-se o [Google Chrome](https://www.google.com/intl/pt-BR/chrome/)
- [x] IDE / Editor de texto - recomenda-se o [Visual Studio Code](https://code.visualstudio.com/)
  
> No caso da utilização do VSCode, recomenda-se a utilização das seguintes extensões:
> * Angular Language Service
> * Angular Snippets
> * GitLens

### Requisitos específicos para Windows

Caso seu sistema operacional seja Windows, talvez alguns recursos adicionais sejam necessários:

- [x] [Git for Windows](https://git-scm.com/) - recomenda-se, para a execução de comandos referentes ao Angular, utilizar o `git bash`

> Chocolatey ou qualquer outro gerenciador de pacotes para Windows - **não é necessário**, utilize apenas o `npm`

<div id='installation'/> &nbsp;

## :pushpin: Instalação

>*Observe atentamente os [requisitos](#requirements) necessários para poder executar, em modo de desenvolvedor, a aplicação no seu computador*

* Clone este projeto
  ```bash
  git clone https://github.com/university-market/university-market-app.git
  ```
* Defina as variáveis de ambiente do projeto de acordo com o exemplo
  - Exemplo em `src/environments/environment.example.ts`
* Dentro do repositório clonado do projeto, abra um terminal/cmd e siga as seguintes instruções:

:one: Entre na raíz da aplicação
```bash
cd application
```
:two: Instale as dependências do projeto
```bash
npm install
```
:three: Instale o Angular para linha de comando (Angular CLI)
```bash
npm install -g @angular/cli
```
:four: Execute o projeto em uma porta disponível no seu computador (default: `4200`)
```bash
ng serve --port 4200
```
:asterisk: Se o ng serve não funcionar, veja [como configurar o Angular CLI em variáveis de ambiente](https://stackoverflow.com/questions/37991556/ng-is-not-recognized-as-an-internal-or-external-command) (Windows).

<div id='technologies'/> &nbsp;

## :pushpin: Tecnologias

Esta camada de front-end é desenvolvida sobre as seguintes tecnologias:

![Angular](https://angular.io/assets/images/logos/angular/logo-nav@2x.png)

- [x] Framework Angular 
- [x] TypeScript - linguagem utilizada pelo framework
- [x] HTML5 - linguagem de marcação utilizada nos templates
- [x] SCSS - Estilos aplicados ao template
- [x] Material Design para Angular - biblioteca de componentes estilizados
