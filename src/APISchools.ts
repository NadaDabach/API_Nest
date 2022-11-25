import { IsNumber } from "class-validator";

export class APISchools{
   @IsNumber()
   nhits: number;
   paremeters;
   records;
   facet_groups;
}