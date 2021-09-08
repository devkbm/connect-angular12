import { WebResource } from '../program/web-resource';

export class Menu {
  constructor(
    public createdDt: Date,
    public createdBy: string,
    public modifiedDt: Date,
    public modifiedBy: string,
    public menuGroupCode: string,
    public menuCode: string,
    public menuName: string,
    public menuType: string,
    public parentMenuCode: string,
    public sequence: number,
    public level: number,
    public resource: WebResource) { }
}
