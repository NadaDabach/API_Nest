import { IsArray, IsNumber, IsString } from "class-validator";

export class APISchools{
   @IsString()
   datasetid : string;
   @IsString()
   recordid : string;
   fields;
   geometry;
   @IsString()
   record_timestamp : string;
}