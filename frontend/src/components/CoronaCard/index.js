import React, { useEffect, useState } from 'react'

import api from '../../utils/api'
import { Container } from './styles'

export default function CoronaCard() {

    const [covid, setCovid] = useState({})

    useEffect( () => {
        async function loadCovidData() {
            const { data } = await api.get('/covid')
            setCovid({
                confirmed: data.confirmed.toLocaleString('pt'),
                deaths: data.deaths.toLocaleString('pt')
            }); 
        }

        loadCovidData()
    }, [])

    return (
        <Container>                  
            <div className='corona_info'>
                <div style={{marginLeft: 41, marginTop: 57}}>
                    <p style={{fontSize: 55, marginBottom: 10}}>
                    CORONA VIRUS
                    </p>
                    <p>
                    Fique em <strong>CASA</strong>
                    <br/>
                    Se <strong>PREVINA</strong>
                    </p>
                </div>
                <div style={{marginTop: 85, marginLeft: '30%',display: 'grid', height: 66,gridTemplateRows: '50% 50%'}}>
                    <p style={{display: 'grid', gridTemplateColumns: '30% 70%'}}>
                    <strong>
                        {covid.confirmed}
                    </strong> 
                    Casos confirmados
                    </p>
                    <p style={{display: 'grid', gridTemplateColumns: '30% 70%'}}>
                    <strong style={{color: 'red'}}>
                    {covid.deaths} 
                    </strong>
                    
                    Óbitos confirmados
                    </p>
                </div>

            </div>
        </ Container>
    )
}