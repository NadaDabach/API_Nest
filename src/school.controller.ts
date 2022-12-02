import { Body, Controller, Delete, Get, Param, Post, Put, Query, HttpCode } from '@nestjs/common';
import { SchoolService } from './school.service';
import { School } from './School';
import { PaginatedType, PaginationService } from './pagination.service';

@Controller('/schools') //faut qu'il ecoute sur /schools p25 du power point n°4
export class SchoolController {
  constructor(private readonly schoolService: SchoolService,
              private readonly paginationService: PaginationService,) {
    

  }
  @Post()
  create(@Body() school: School): School {
    this.schoolService.addSchool(school);
    return school;
  }
  
  @Get()
  methodeGetSchool(@Query("departement") departement : string | undefined,
             @Query("page") page : string,
             @Query("size") size : string
             ): School[] | PaginatedType<School> {
    if (departement === undefined){
      return this.paginationService.paginatedData(
        this.schoolService.getAllSchools(),
        page,
        size,
      );
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
  methodeInverseFavoriteLogic(@Param('nameOfSchool') name: string){
    this.schoolService.inverseFavoriteLogic(name);
    let school = this.schoolService.getSchool(name)
    return school;
  }

  @Post('search')
  @HttpCode(200)
  public methodeSearchByLibelleOrDepartement(
    @Body() query: { recolteTerm: string },
    @Query('page') page: string,
    @Query('size') size: string,
  ): PaginatedType<School> {
    return this.paginationService.paginatedData(
      this.schoolService.searchByLibelleOrDepartement(query.recolteTerm),
      page,
      size,
    );
  }

}