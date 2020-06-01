import React, { useEffect, useState } from 'react'

import image from '../../image/coronavirus-4833754_1920-1230x450.jpg'
import api from '../../utils/api'
import './styles.css'

export default function CoronaCard() {

    const [covid, setCovid] = useState({})

    useEffect( () => {
        async function loadCovidData() {
            const { data } = await api.get('/covid')
            setCovid({
                contagion: data.contagion.toLocaleString('pt'),
                deaths: data.deaths.toLocaleString('pt')
            }); 
        }

        loadCovidData()
    }, [])

    return (
        <div id='corona_container' style={{borderRadius: 8, backgroundImage: `url(${image})`, width: '100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>                  
            <div id='corona_info'>
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
                        {covid.contagion}
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
        </div>
    )
}