import { getRepository, getConnection } from 'typeorm';
import { Request, Response } from 'express';

import api from '../utils/api';
import { CovidInfo } from '../model/CovidInfo';
import { validate } from 'class-validator';

export default async function workerCovidInfo () {
    const response = await api.get('PortalGeralApi');
    
    console.log(response.data);

    const { confirmados, obitos, dt_updated } = response.data;

    const covid = new CovidInfo();
    covid.contagion = parseInt(confirmados.total);
    covid.contagion_news = parseInt(confirmados.novos)
    covid.recupered = parseInt(confirmados.recuperados)
    covid.deaths = parseInt(obitos.total);
    covid.deaths_news = parseInt(obitos.novos)
    covid.letality = obitos.letalidade;
    covid.date = new Date(dt_updated);

    console.log('Worker working lol');

    const errors = await validate(covid);
    if (errors.length > 0) {
        console.error(errors);
    }  else {
        await getConnection().getRepository(CovidInfo).save(covid);
    }
}
