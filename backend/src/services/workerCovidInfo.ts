import { getRepository, getConnection } from 'typeorm';
import { Request, Response } from 'express';

import api from '../utils/api';
import { CovidInfo } from '../model/CovidInfo';
import { validate } from 'class-validator';

export default async function workerCovidInfo () {
    const response = await api.get('PortalGeral');
    
    console.log(response.data);

    const { total_confirmado, total_obitos, total_letalidade, updatedAt } = response.data.results[0];

    const covid = new CovidInfo();
    covid.contagion = parseInt(total_confirmado.replace('.',''));
    covid.deaths = parseInt(total_obitos.replace('.',''));
    covid.letality = total_letalidade;
    covid.date = new Date(updatedAt);

    console.log('Worker working lol');

    const errors = await validate(covid);
    if (errors.length > 0) {
        console.error(errors);
    }  else {
        await getConnection().getRepository(CovidInfo).save(covid);
    }
}
