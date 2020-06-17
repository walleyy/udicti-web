export class IncubateeDetails{
   
    constructor ( 
        private personalDetails:{firstname:string; lastname:string, degreeProgram:string, email, phone:number},
        private businessIdea:{business:string; shortDescription:string, group:boolean},
        private project:{projectStage:boolean},
        public userId?:string,

   ){}


}