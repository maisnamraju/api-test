import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  BadRequestException,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UsersPermissionsService } from './service/userspermissions.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { User } from './entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersPermissionsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: User,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return user;
    } catch (error) {
      new BadRequestException(error);
    }
  }

  @Get()
  @ApiOperation({ description: 'List users' })
  @ApiResponse({
    type: User,
    isArray: true,
    description: 'list of all users',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: User,
    isArray: false,
    description: 'user with or without permissions',
  })
  @ApiQuery({ name: 'include', type: String, isArray: true, required: false })
  async findOne(@Param('id') id: string, @Query() include?: string[]) {
    try {
      const user = await this.usersService.findOne(+id, include);
      return user;
    } catch (error) {
      //TODO - move this to a custom error handler
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
