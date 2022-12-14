import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { SchoolModule } from '../src/school.module';

describe('Schools API', () => {
  let app: INestApplication;
  let httpRequester: supertest.SuperTest<supertest.Test>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SchoolModule],
    }).compile();


    app = moduleRef.createNestApplication();
    await app.init();

    httpRequester = request(app.getHttpServer());
  });

  it(`/GET schools`, async () => {
    const response = await httpRequester.get('/schools').expect(200);

    expect(response.body).toEqual(expect.any(Array));
    expect(response.body.length).toBeGreaterThan(10);
  });

  //Test for the adding of School
  it(`/POST schools`, async () => {
    const response = await httpRequester
      .post('/schools')
      .send({
        libelle : "Truc",
        sigle : "testDuTruc",
        type : "kjsbv",
        secteur : "sdgrs",
        vague : "sgrgrsg",
        geolocalisation : [2.32,4.6],
        date : "slvn",
        departement : "shtun",
        region : "dthbku",
        adresse : "vdkufqx",
        code_postal : "csyu",
        numero_telephone : "qvbtyh", 
        site_web : "vfjvjnv",
        compte_fb : "crbt",
        compte_twitter : "njksnv",
        compte_insta : "knsjkvn",
        favorite: false,
      })
      .expect(201);

    expect(response.body).toEqual({
      libelle : "Truc",
      sigle : "testDuTruc",
      type : "kjsbv",
      secteur : "sdgrs",
      vague : "sgrgrsg",
      geolocalisation : [2.32,4.6],
      date : "slvn",
      departement : "shtun",
      region : "dthbku",
      adresse : "vdkufqx",
      code_postal : "csyu",
      numero_telephone : "qvbtyh", 
      site_web : "vfjvjnv",
      compte_fb : "crbt",
      compte_twitter : "njksnv",
      compte_insta : "knsjkvn",
      favorite: false,
    });
  });

  //Test for the by libelle unique search
  it(`/GET schools/:libelle`, async () => { 
    // First prepare the data by adding a school
    await httpRequester.post('/schools').send({
      libelle : "Truc",
      sigle : "testDuTruc",
      type : "kjsbv",
      secteur : "sdgrs",
      vague : "sgrgrsg",
      geolocalisation : [2.32,4.6],
      date : "slvn",
      departement : "shtun",
      region : "dthbku",
      adresse : "vdkufqx",
      code_postal : "csyu",
      numero_telephone : "qvbtyh", 
      site_web : "vfjvjnv",
      compte_fb : "crbt",
      compte_twitter : "njksnv",
      compte_insta : "knsjkvn",
      favorite: false,
    });

    // Then get the previously stored school
    const response = await httpRequester.get('/schools/Truc').expect(200);

    expect(response.body).toEqual({
      libelle : "Truc",
      sigle : "testDuTruc",
      type : "kjsbv",
      secteur : "sdgrs",
      vague : "sgrgrsg",
      geolocalisation : [2.32,4.6],
      date : "slvn",
      departement : "shtun",
      region : "dthbku",
      adresse : "vdkufqx",
      code_postal : "csyu",
      numero_telephone : "qvbtyh", 
      site_web : "vfjvjnv",
      compte_fb : "crbt",
      compte_twitter : "njksnv",
      compte_insta : "knsjkvn",
      favorite: false,
    });
  });

  //Test for the by departement search
  it(`/GET schools by departement`, async () => {
    // First prepare the data by adding some schools
    await httpRequester.post('/schools').send({
      libelle : "Truc",
      sigle : "testDuTruc",
      type : "kjsbv",
      secteur : "sdgrs",
      vague : "sgrgrsg",
      geolocalisation : [2.32,4.6],
      date : "slvn",
      departement : "dnekjn",
      region : "dthbku",
      adresse : "vdkufqx",
      code_postal : "csyu",
      numero_telephone : "qvbtyh", 
      site_web : "vfjvjnv",
      compte_fb : "crbt",
      compte_twitter : "njksnv",
      compte_insta : "knsjkvn",
      favorite: false,
    });
    await httpRequester.post('/schools').send({
      libelle : "Truc1",
      sigle : "testDuTruc",
      type : "kjsbv",
      secteur : "sdgrs",
      vague : "sgrgrsg",
      geolocalisation : [2.32,4.6],
      date : "slvn",
      departement : "departement",
      region : "dthbku",
      adresse : "vdkufqx",
      code_postal : "csyu",
      numero_telephone : "qvbtyh", 
      site_web : "vfjvjnv",
      compte_fb : "crbt",
      compte_twitter : "njksnv",
      compte_insta : "knsjkvn",
      favorite: false,
    });
    await httpRequester.post('/schools').send({
      libelle : "Truc2",
      sigle : "testDuTruc",
      type : "kjsbv",
      secteur : "sdgrs",
      vague : "sgrgrsg",
      geolocalisation : [2.32,4.6],
      date : "slvn",
      departement : "departement",
      region : "dthbku",
      adresse : "vdkufqx",
      code_postal : "csyu",
      numero_telephone : "qvbtyh", 
      site_web : "vfjvjnv",
      compte_fb : "crbt",
      compte_twitter : "njksnv",
      compte_insta : "knsjkvn",
      favorite: false,
    });

    // Then get the previously stored school
    const response = await httpRequester
      .get('/schools')
      .query({ departement: 'departement' })
      .expect(200);

    expect(response.body).toEqual([
      {
        libelle : "Truc1",
        sigle : "testDuTruc",
        type : "kjsbv",
        secteur : "sdgrs",
        vague : "sgrgrsg",
        geolocalisation : [2.32,4.6],
        date : "slvn",
        departement : "departement",
        region : "dthbku",
        adresse : "vdkufqx",
        code_postal : "csyu",
        numero_telephone : "qvbtyh", 
        site_web : "vfjvjnv",
        compte_fb : "crbt",
        compte_twitter : "njksnv",
        compte_insta : "knsjkvn",
        favorite: false,
      },
      {
        libelle : "Truc2",
        sigle : "testDuTruc",
        type : "kjsbv",
        secteur : "sdgrs",
        vague : "sgrgrsg",
        geolocalisation : [2.32,4.6],
        date : "slvn",
        departement : "departement",
        region : "dthbku",
        adresse : "vdkufqx",
        code_postal : "csyu",
        numero_telephone : "qvbtyh", 
        site_web : "vfjvjnv",
        compte_fb : "crbt",
        compte_twitter : "njksnv",
        compte_insta : "knsjkvn",
        favorite: false,
      },
    ]);
  });

  //Test for the deletion of School
  it(`/DELETE schools/:libelle`, async () => {
    // First prepare the data by adding a school
    await httpRequester.post('/schools').send({
      libelle : "Truc",
      sigle : "testDuTruc",
      type : "kjsbv",
      secteur : "sdgrs",
      vague : "sgrgrsg",
      geolocalisation : [2.32,4.6],
      date : "slvn",
      departement : "shtun",
      region : "dthbku",
      adresse : "vdkufqx",
      code_postal : "csyu",
      numero_telephone : "qvbtyh", 
      site_web : "vfjvjnv",
      compte_fb : "crbt",
      compte_twitter : "njksnv",
      compte_insta : "knsjkvn",
      favorite: false,
    });

    // Delete the school
    await httpRequester.delete('/schools/Truc').expect(200);

    // Finally check the school was successfully deleted
    const response = await httpRequester.get('/schools');

    expect(response.body).not.toContainEqual({
      libelle : "Truc",
      sigle : "testDuTruc",
      type : "kjsbv",
      secteur : "sdgrs",
      vague : "sgrgrsg",
      geolocalisation : [2.32,4.6],
      date : "slvn",
      departement : "shtun",
      region : "dthbku",
      adresse : "vdkufqx",
      code_postal : "csyu",
      numero_telephone : "qvbtyh", 
      site_web : "vfjvjnv",
      compte_fb : "crbt",
      compte_twitter : "njksnv",
      compte_insta : "knsjkvn",
      favorite: false,
    });
  });

  //Test for the inverse favorite logic
  it(`/Post schools/:libelle`, async () => {
    // First prepare the data by adding a school
    await httpRequester.post('/schools').send({
      libelle : "Truc",
      sigle : "testDuTruc",
      type : "kjsbv",
      secteur : "sdgrs",
      vague : "sgrgrsg",
      geolocalisation : [2.32,4.6],
      date : "slvn",
      departement : "shtun",
      region : "dthbku",
      adresse : "vdkufqx",
      code_postal : "csyu",
      numero_telephone : "qvbtyh", 
      site_web : "vfjvjnv",
      compte_fb : "crbt",
      compte_twitter : "njksnv",
      compte_insta : "knsjkvn",
      favorite: true,
    });

    
    // inverse the school
    await httpRequester.post('/schools/Truc').expect(201);

    // Finally check the school was successfully deleted
    const response = await httpRequester.get('/schools');

    expect(response.body).toContainEqual({
      libelle : "Truc",
      sigle : "testDuTruc",
      type : "kjsbv",
      secteur : "sdgrs",
      vague : "sgrgrsg",
      geolocalisation : [2.32,4.6],
      date : "slvn",
      departement : "shtun",
      region : "dthbku",
      adresse : "vdkufqx",
      code_postal : "csyu",
      numero_telephone : "qvbtyh", 
      site_web : "vfjvjnv",
      compte_fb : "crbt",
      compte_twitter : "njksnv",
      compte_insta : "knsjkvn",
      favorite: false,
    });
  });


});