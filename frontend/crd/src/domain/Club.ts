export interface ClubJSON{
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    studentDetailsID: string;
}

export class Club{
    constructor(json: ClubJSON){
        this.id = json.id;
        this.name = json.name;
        this.startDate = json.startDate;
        this.endDate = json.endDate;
        this.studentDetailsID = json.studentDetailsID;
    }

    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    studentDetailsID: string;
}