import React, { useState, useEffect } from "react";
import BeerCard from "./BeerCard";
import { CardColumns } from "reactstrap";
import APIURL from '../helpers/enviornments';

const BeerParent = () => {

  const fetchURL = `${APIURL}/beer/`
  const [results, setResults] = useState([]);

  useEffect(() => {
      handleClick();
  },[]);

  function handleClick(){
      fetch(fetchURL)
      .then((res) => res.json())
      .then((jsonData)=>{
          console.log(jsonData.results)
          setResults(jsonData.results);
      })
      
  }

  function displayCards(){
      return(
          results.map((result, index) => <BeerCard key={index} 
          character = {result}/>)
      )
  }
  return ( 
      <div>
      {/* <button onClick={handleClick}> Click Here</button> */}
      <CardColumns>
      {displayCards()}
      </CardColumns>
      </div>
   );

};

export default BeerParent;
