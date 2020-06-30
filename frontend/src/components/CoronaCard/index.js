import React, { useEffect, useState } from 'react'

import api from '../../services/api'
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
            <div className="corona-text">
                <h1>CORONA VIRUS</h1>
                <p>
                    Fique em <strong>CASA</strong>
                    <br/>
                    Se <strong>PREVINA</strong>
                </p>
            </div>
            <div className="corona-data">
                <p><strong>{covid.confirmed}</strong></p>
                <p>Casos confirmados</p>
                <p><strong style={{color: 'red'}}>{covid.deaths} </strong></p>
                <p>Óbitos confirmados</p>
            </div>
        </ Container>
    )
}