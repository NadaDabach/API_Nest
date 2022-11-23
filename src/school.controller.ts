import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { SchoolService } from './school.service';
import { School } from './School';

@Controller('/schools') //faut qu'il ecoute sur /schools p25 du power point n°4
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {
    

  }
  @Post()
  create(@Body() school: School): School {
    this.schoolService.addSchool(school);
    return school;
  }

  @Get()
  methodeGet(@Query("departement") departement : string | undefined): School[] {
    if (departement === undefined){
      return this.schoolService.getAllSchools();
    }
    return this.schoolService.getSchoolsOfDepartement(departement);
  }

  @Get('/:nameOfSchool')
  methodeGetName(@Param('nameOfSchool') name : string): School | undefined {
    return this.schoolService.getSchool(name);
  }

  @Delete('/:nameOfSchool')
  methodeDeleteName(@Param('nameOfSchool') name : string){
    let schoolToDelete = this.schoolService.getSchool(name);
    this.schoolService.deleteSchoolByName(name);
    return schoolToDelete;
  }

  @Post('/:nameOfSchool')
  methodeInverseFavoriteLogic(@Param('nameOfSchool') name: string): School | undefined{
    this.schoolService.inverseFavoriteLogic(name);
    let school = this.schoolService.getSchool(name)
    return school;
  }

}