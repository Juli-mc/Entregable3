import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import Residentinfo from './Residentinfo'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState({})
  const [searchValue, setSearchvalue] = useState("")

  useEffect(() => {
    const random = Math.floor(Math.random() * 20) + 1;
    axios.get(`https://rickandmortyapi.com/api/location/${random}/`)
      .then(res => setData(res.data))
  }, [])

  const searchType = () => {
    axios.get(`https://rickandmortyapi.com/api/location/${searchValue}/`)
      .then(res => setData(res.data))
  }

  const [page, setPage] = useState(1)
  const lastIndex = page * 6
  const firstIndex = lastIndex - 6
  const paginated = data.residents?.slice(firstIndex, lastIndex)
  const lastPage = Math.ceil(data.residents?.length / 6)

  const numbers = [];
  for (let i = 1; i <= lastPage; i++) {
    numbers.push(i)
  }
  let residental = data.residents

  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    // alert("cambió search")
    if(searchValue){
      axios.get(`https://rickandmortyapi.com/api/location/?name=${searchValue}`)
        .then(res => setSuggestions(res.data.results))
    }
    else{
      setSuggestions([])
    }
  }, [searchValue])
  console.log(suggestions)

  const selectLocation = (suggestion) => {
    setData(suggestion)
  }

  return (
    <div className="App">
      <div className='Header'>
        {/* <img src="./title.gif" alt="" srcset="" /> */}
      </div>
      <div className='wrap'>
        <div className='search'>
          <input type="text" className='searcher' value={searchValue} onChange={e => setSearchvalue(e.target.value)} placeholder="Get by id or name..." />
          <button onClick={searchType} className='searchButton'><i class="fa fa-search"></i></button>
        </div>
        <ul>
          {
            suggestions.map(suggestion => (
              <li onClick={() => selectLocation(suggestion)}>{suggestion.name}</li>
            ))
          }
        </ul>
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
        paginated?.map(characterUrl => (
          <Residentinfo key={characterUrl} characterUrl={characterUrl} />)))}

      {/* <Residentinfo data={data}/> */}
      <br />
      <div className='buttons'>
        <button className='prev' onClick={() => setPage(page - 1)} disabled={page === 1}><i class="fa-solid fa-angle-left"></i></button>
        {numbers.map(number => (<button className='numbers' onClick={() => setPage(number)}>{number}</button>))}
        <button className='next' onClick={() => setPage(page + 1)} disabled={page === lastPage}><i class="fa-solid fa-angle-right"></i></button>
      </div>


    </div>
  )
}

export default App
