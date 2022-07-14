import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import App from './App';
import Residentinfo from './Residentinfo';
const Page = ({characterInfo}) => {
    const Max = 3;
    const [items, setItems] = useState([characterInfo].splice(0, Max))
    const [currentPage, setCurrentpage] = useState(1)


    const next = () => {
      const total = characterInfo.length;
      const nextPage = currentPage + 1;
      const firstIndex = nextPage * Max
      cha

      if (firstIndex >= total) return
      setItems([characterInfo].splice(firstIndex, Max))
      setCurrentpage(nextPage)
    }
  


    return (
        <div>
        <div className='Buttons'>
            <button><i class="fa-solid fa-circle-chevron-right"></i></button>
            <button><i class="fa-solid fa-circle-chevron-left"></i></button>
        </div>
        </div>
    );
};

export default Page;