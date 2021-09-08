export class MenuHierarchy {
  constructor(
    public createdDt: Date,
    public createdBy: string,
    public modifiedDt: Date,
    public modifiedBy: string,
    public key: string,
    public title: string,
    public menuGroupCode: string,
    public menuCode: string,
    public menuName: string,
    public parentMenuCode: string,
    public menuType: string,
    public sequence: number,
    public level: number,
    public url: string,
    public selected: boolean,
    public expanded: boolean,
    public children: MenuHierarchy[]) {}
}
