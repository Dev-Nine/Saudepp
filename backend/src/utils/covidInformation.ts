import { Request, Response } from 'express';
import axios from 'axios';

export default async function convidInformation (req: Request, res: Response) {
    const response = await axios.get('https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalGeral', {
        headers: {
            'x-parse-application-id':'unAFkcaNDeXajurGB7LChj8SgQYS2ptm'
        }
    });
    
    console.log(response.data);

    const { total_confirmado, total_obitos, createdAt } = response.data.results[0];

    res.send({
        total_confirmado,
        total_obitos,
        createdAt,
    });
}
