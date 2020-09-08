import React, { useState } from "react";
import { Table, CardColumns} from "reactstrap";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import APIURL from '../helpers/enviornments'

const AllPosts = (props) => {
  const URL = `${APIURL}/beer/`;
  const [beer, setBeer] = useState([]);
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      setBeer(data);
      //console.log(data);
    });

  const beerMapper = () => {
    
    return props.beer.map((beer, index) => {
      return (
        
          <Card style={{backgroundColor: '#DBD053' }}>
            <CardImg top width="100%" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/low-calorie-beers-1579818049.jpg?crop=0.668xw:1.00xh;0,0&resize=640:*" alt="Card image cap" />
            <CardBody>
              <CardTitle>Name: {beer.name}</CardTitle>
              <CardSubtitle>Brewery: {beer.brewery}</CardSubtitle>
              <CardSubtitle>ABV/IBU: {beer.abvibu}</CardSubtitle>
              <CardSubtitle>Location: {beer.location}</CardSubtitle>
              <CardText>Additional Comments: 
                {beer.comments}
              </CardText>
            </CardBody>
          </Card>
          
       
      );
    });
  };
  return (
    <>
    <CardColumns>
      {beerMapper()}
      </CardColumns>
    </>
  );
};

export default AllPosts;
