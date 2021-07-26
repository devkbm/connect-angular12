import { MenuGroup } from './menu-group';
import { Authority } from './authority';

export class UserToken {
  constructor(
    public token: string,
    public imageUrl: string,
    public authorities: Authority[],
    public menuGroupList: MenuGroup[]) {}
}
