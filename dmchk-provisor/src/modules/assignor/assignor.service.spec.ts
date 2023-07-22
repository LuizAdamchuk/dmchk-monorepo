import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../../databases/PrismaService';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { BadRequestException } from '@nestjs/common';

describe('AssignorService', () => {
  let assignorService: AssignorService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignorService, PrismaService],
    }).compile();

    assignorService = module.get<AssignorService>(AssignorService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(assignorService).toBeDefined();
  });

  describe('create', () => {
    it('should create an assignor', async () => {
      const createAssignorDto: CreateAssignorDto = {
        document: '3b98aa9c-47ca-43c7-aa6d-7b1c03793984',
        email: 'Loma5_Hudson@hotmail.com',
        phone: '446-647-4922',
        name: 'Brett Walsh',
      };
      const expectedAssignorResponse = {
        id: 'c1084700-beb1-4455-9646-4cff1048b4c6',
        document: '3b98aa9c-47ca-43c7-aa6d-7b1c03793980',
        email: 'Loma_Hudson@hotmail.com',
        phone: '446-647-4922',
        name: 'Brett Walsh',
        createdAt: new Date('2023-07-05T21:56:17.663Z'),
        updatedAt: new Date('2023-07-05T21:56:17.663Z'),
      };

      jest
        .spyOn(prismaService.assignor, 'create')
        .mockResolvedValue(expectedAssignorResponse);

      const assignorResponse = await assignorService.create(createAssignorDto);

      expect(assignorResponse).toBeDefined();
      expect(assignorResponse).toMatchObject(expectedAssignorResponse);
    });

    it('should throw a BadRequestException if assignor creation fails', async () => {
      const createAssignorDto: CreateAssignorDto = {
        document: '3b98aa9c-47ca-43c7-aa6d-7b1c03793984',
        email: 'Loma5_Hudson@hotmail.com',
        phone: '446-647-4922',
        name: 'Brett Walsh',
      };

      const expectedError = new BadRequestException(
        'Assignor creation failed.'
      );

      jest
        .spyOn(prismaService.assignor, 'create')
        .mockRejectedValue(expectedError);

      await expect(
        assignorService.create(createAssignorDto)
      ).rejects.toThrowError(expectedError);
    });
  });
});
