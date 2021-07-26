export class HrmTypeDetailCode {
  constructor(
    public id: string,
    public typeId: string,
    public code: string,
    public codeName: string,
    public useYn: boolean,
    public sequence: number,
    public comment: string) {}
}
