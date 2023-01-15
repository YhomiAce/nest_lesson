import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.enableCors();
  app.use(
    session({
      name: 'NESTJS_SESSION_ID',
      secret: 'AAEEWRFEJDFKJKJDFUY783784398304SDKJSJF,KFJJF',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 600000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5000);
}
bootstrap();
