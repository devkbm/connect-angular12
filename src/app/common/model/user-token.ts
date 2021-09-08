import { MenuGroup } from '../component/menu/menu-group.model';
import { Authority } from '../component/authority/authority.model';

export class UserToken {
  constructor(
    public token: string,
    public imageUrl: string,
    public authorities: Authority[],
    public menuGroupList: MenuGroup[]) {}
}
