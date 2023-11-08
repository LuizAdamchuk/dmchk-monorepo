import { z } from 'zod';

const nodeEnv = z.enum(['development', 'production', 'test']);

// --> If some varialble is necessary only in one enviroment
// --> ex.: DATABASE_URL: z.string().refine(requiredOn('production'))

// function requiredOn(env: z.infer<typeof nodeEnv>) {
//   return (value: any) => {
//     if (env === process.env.NODE_ENV && !value) {
//       return false;
//     }
//     return true;
//   };
// }

const envSchema = z.object({
  NODE_ENV: nodeEnv.default('development'),
  PORT: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
