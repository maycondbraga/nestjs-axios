import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/price/bitcoin (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/price/bitcoin')
      .expect(200)
      .expect((res) => {
        const regex = /^\d{1,3}(,\d{3})*(\.\d+)?$/;
        expect(res.text).toMatch(regex);
      });
  });
});
