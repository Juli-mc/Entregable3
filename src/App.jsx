import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import Residentinfo from './Residentinfo'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState({})
  const [searchValue, setSearchvalue] = useState("")
  
  useEffect(() =>{
    const random = Math.floor(Math.random() * 20) +1;
    axios.get(`https://rickandmortyapi.com/api/location/${random}/`)
      .then(res => setData(res.data))
  }, [])

  const searchType = () => {
    axios.get(`https://rickandmortyapi.com/api/location/${searchValue}/`)
    .then(res =>setData(res.data))
  }
  console.log(data)
  let residental = data.residents

  return (
    <div className="App">
      <div className='Header'>
        <img src="./title.gif" alt="" srcset="" />
      </div>
        <div className='wrap'>
          <div className='search'>
          <input type="text" className='searcher' value={searchValue} onChange={e => setSearchvalue(e.target.value)} placeholder="Get by id..."/>
          <button onClick={searchType} className='searchButton'><i class="fa fa-search"></i></button>
        </div>
        </div>
      <div className='Info'>
      <div className='Name'>
      <h2>Name:</h2> <p>{data.name}</p>
      </div>
      <div className='Type'>
      <h2>Type:</h2> <p>{data.type}</p>
      </div>
      <div className='Dimension'>
      <h2>Dimension:</h2> <p>{data.dimension}</p>
      </div>
      <div className='Residents'>
      <h2>Residents:</h2> <p>{data.residents?.length}</p>
      </div>
      <br />
      </div>
      {data.residents?.length === 0 ? ( 
      <div className='None'>
            <img src='./Rickwithout.PNG' alt="" srcset="" />
            <h1>Sorry, this planet hasn't habitants...</h1>
        </div>) : (
        data.residents?.map(characterUrl =>(
        <li>{characterUrl}</li>, 
        <Residentinfo characterUrl={characterUrl}/>)))}
      
      
      {/* <Residentinfo data={data}/> */}
      

     
    </div>
  )
}

export default App
