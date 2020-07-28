export class ActivityDetails {
    constructor(private activityDetails: {
        activityTitle: string;
        activityDescription: string;
        date: string;
        file?: File;
        fileUrl?: string;
    }) {}
}
