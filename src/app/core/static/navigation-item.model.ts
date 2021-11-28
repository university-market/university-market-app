export interface NavigationItemModel {
  title: string;
  type: 'item'|'group'|'section';
  label?: string;
  icon?: string;
  route?: string;
  disabled?: boolean;
  isActive?: boolean;
  children?: NavigationItemModel[];
  expanded?: boolean;
  queryParams?:{
    cursoId,
    curso
  }
}