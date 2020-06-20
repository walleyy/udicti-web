export class ActivityDetails{
    constructor(private activityDetails:{
        activityTitle:string;
        activityDescription:string;
        file?:File;
        fileUrl?:string;
    }){}
}