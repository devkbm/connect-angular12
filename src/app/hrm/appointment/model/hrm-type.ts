export class HrmType {
  constructor(
    public id: string,
    public hrmType: string,
    public code: string,
    public codeName: string,
    public useYn: boolean,
    public sequence: number,
    public comment: string) {}
}
