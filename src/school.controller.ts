import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SchoolService } from './school.service';
import { School } from './School';

@Controller('/schools')
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

  @Put('/:nameOfSchool')
  methodeInverseFavoriteLogic(@Param('nameOfSchool') name: string, @Body() schoolUpdated : School){
    this.schoolService.inverseFavoriteLogic(name);
  }

  @Post('search')
  public methodeSearchByLibelleOrDepartement(
    @Body() query: { recolteTerm: string }
  ) {
    return this.schoolService.searchByLibelleOrDepartement(query.recolteTerm)
  }

}