import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { HttpModule } from '@nestjs/axios'; //npm i --save @nestjs/axios
import { PaginationService } from './pagination.service';

@Module({
  imports: [HttpModule],
  controllers: [SchoolController],
  providers: [SchoolService, PaginationService],
})
export class SchoolModule {}
