> O11y

https://github.com/willsoto/nestjs-prometheus

> TESTS:

Ja sobe um mysql 3307
npm run test:e2e
npx dotenv -e .env.test -- prisma studio

DEV:
Necessario subir um mysql 3306
npm run start:dev
npx prisma studio

> Commands:
> kubectl get secret dmchk-governance-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
