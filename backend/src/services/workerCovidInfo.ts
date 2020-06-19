import { getRepository, getConnection } from 'typeorm';
import { Request, Response } from 'express';

import api from '../utils/api';
import { CovidInfo } from '../model/CovidInfo';
import { validate } from 'class-validator';

interface covidApiData {
    data : {
        confirmed : number,
        deaths : number,
        recovered : number,
        updated_at : string
    }
}

export default async function workerCovidInfo () {
    try {
	const response = await api.get('api/report/v1/brazil');
	const data : covidApiData = response.data;

	const { confirmed, deaths, recovered, updated_at } = data.data; // why

	const covid = new CovidInfo();
	covid.confirmed = confirmed;
	covid.recovered = recovered;
	covid.deaths = deaths;
	covid.lethality = String(100 * (deaths / confirmed));
	covid.date = new Date(updated_at);

	// console.log(covid);

	const errors = await validate(covid);

	if (errors.length > 0) {
	    console.error(errors);
	} else {
	    await getConnection().transaction(async manager => {
		const datas = await manager.getRepository(CovidInfo).find({
		    order:{
			id : "DESC"
		    }
		});
		if (datas.length == 0 || datas[0].date.getTime() !== covid.date.getTime()){
		    await manager.getRepository(CovidInfo).save(covid);
		}
	    });
	}
    } catch (err) {
	console.error('Error in request to Covid Api');
	if (process.env.DEV) {
	    console.error(err);
	}
    }
}
