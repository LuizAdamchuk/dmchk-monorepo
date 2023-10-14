import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { CreateAuthDto, UpdateAuthDto } from '../src/modules/auth/dto';
import { PrismaService } from '../src/databases/prisma/prisma.service';
import { GlobalExceptionFilter } from '../src/global-exception.filter';
import {
  CreateAssignorDto,
  UpdateAssignorDto,
} from '../src/modules/assignor/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      })
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: CreateAuthDto = {
      email: 'test@gmail.com',
      password: '123',
      document: '12345',
    };
    describe('Create', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/create')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
          .inspect();
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/create')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/create').expectStatus(400);
      });
      it('should create', () => {
        return pactum
          .spec()
          .post('/auth/create')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email, password: dto.password })
          .expectStatus(200)
          .stores('userAt', 'access_token');
        // .inspect(); // save access_token of the response to userAt variable
      });
    });

    describe('Get user info', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/auth/userinfo')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .stores('userId', 'sub');
        // .inspect(); // for see all the infos in request
      });
    });

    describe('Update User', () => {
      const dto: UpdateAuthDto = { email: 'updated@gmail.com' };

      it('should update current user', () => {
        return pactum
          .spec()
          .patch('/auth/$S{userId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.email);
        // .inspect(); // for see all the infos in request
      });
    });

    describe('Remove User', () => {
      it('should update current user', () => {
        return pactum
          .spec()
          .delete('/auth/$S{userId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
        // .inspect(); // for see all the infos in request
      });
    });
  });

  describe('Assignor', () => {
    const dto: CreateAssignorDto = {
      email: 'test_assignor@gmail.com',
      password: '12345678',
      document: '1234567890',
      externalId: '123412341234',
    };

    describe('Create', () => {
      const baseUrlToCreate = '/assignor/create';

      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post(baseUrlToCreate)
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post(baseUrlToCreate)
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post(baseUrlToCreate).expectStatus(400);
      });

      it('should create', () => {
        return pactum
          .spec()
          .post(baseUrlToCreate)
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      const baseUrlToSignIn = '/assignor/signin';

      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post(baseUrlToSignIn)
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post(baseUrlToSignIn)
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post(baseUrlToSignIn).expectStatus(400);
      });
      // TODO: Change to argon, change to receive a token, change to auth validate.
      it('should signin', () => {
        return pactum
          .spec()
          .post(baseUrlToSignIn)
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token')
          .inspect();
      });
    });

    describe('Get assignor info', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/auth/userinfo')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .stores('userId', 'sub')
          .inspect(); // for see all the infos in request
      });
    });

    describe('Update User', () => {
      const dto: UpdateAssignorDto = { email: 'updated@gmail.com' };

      it('should update current user', () => {
        return pactum
          .spec()
          .patch('/assignor/$S{userId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.email);
        // .inspect(); // for see all the infos in request
      });
    });

    describe('Remove User', () => {
      it('should update current user', () => {
        return pactum
          .spec()
          .delete('/assignor/$S{userId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
        // .inspect(); // for see all the infos in request
      });
    });
  });
});
