
export class MasterTypeList{

    id:string;
    name:string;
    description:string;


}

export interface MasterList{
    id:string;
    idTypeList:string;
    parent:MasterList;
    nameApplication:string;
    code:string;
    name:string;
    isActive:boolean;
    description:string;
}