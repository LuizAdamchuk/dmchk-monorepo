import { Injectable } from '@nestjs/common';

@Injectable()
export class AssignorMapper {
  mapperToCreateAssignorAuthDto(assignor, createAssignorDto) {
    return {
      externalId: assignor.id,
      password: createAssignorDto.password,
      email: assignor.email,
      document: assignor.document,
    };
  }
}
