import { useEffect, useState } from 'react'
import axios from 'axios'
import App from './App';
import React from 'react';
import Page from './Page';

const Residentinfo = ({characterUrl}) => {
    const [characterInfo, setCharacterinfo] = useState([])
        useEffect(() =>{
            axios.get(characterUrl)
            .then(res => setCharacterinfo(res.data))
        }, [])

        return(
        <div className='Card'>
            <img src={characterInfo.image} alt="" srcset="" />
            
            <div className='Characterinfo'>
             <h1>{characterInfo.name}</h1>   
            <p>Status:</p> <h2>{characterInfo.status}</h2>
            <p>Origin:</p> <h2>{characterInfo.origin?.name}</h2>
            <p>Episodes:</p> <h2>{characterInfo.episode?.length}</h2>
            </div>
            {/* <Page characterInfo={characterInfo} /> */}
        </div>)
            
        }
    


export default Residentinfo;