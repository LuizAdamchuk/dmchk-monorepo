Criar 3 roles

- User, Assignor, Admin
  Criar as permissions
  Setar a role default de quando é criado um assignor/user.

Requerer um token no keycloak para esse usuario, setar o token no header para as proximas req

Commands:

TESTS:
\*\*Ja sobe um mysql 3307
npm run test:e2e
npx dotenv -e .env.test -- prisma studio

DEV:
\*\*Necessario subir um mysql 3306
npm run start:dev
npx prisma studio

O11y
https://github.com/willsoto/nestjs-prometheus

TRAVADO NA HORA DO BUILD
Foi adicionando o mysql persisente
porem na hora de fazer o deploy do servico esta com erro no prisma/client

docker build --no-cache -t dmchk/dmchk_microsservices .
