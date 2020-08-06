export class Session{
    constructor( public session:{
        sessionName:string;
        sessionDescription:string;
        sessionDate: string;
        file?: File;
        fileUrl?: string;
        filename?: string;
    }){}

}