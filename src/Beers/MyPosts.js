import React, { useState, useEffect, useCallback } from "react";
import { Table, CardColumns } from "reactstrap";
import APIURL from "../helpers/enviornments";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import BeerEdit from "./BeerEdit";


const MyPosts = (props) => {
  const id = localStorage.getItem("id");

  const [beer, setBeer] = useState([]);
  const getMyBeer = useCallback(() => {
    if (props.token != "") {
      fetch(`${APIURL}/beer/mine/${id}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: props.token,
        }),
      })
        .then((res) => res.json())
        .then((logData) => {
          setBeer(logData);
          console.log(logData);
        });
    }
  }, []);

  useEffect(() => {
    getMyBeer();
  }, []);
  console.log(props);

  const [updateActive, setUpdateActive] = useState(false);
  const [beerToUpdate, setBeerToUpdate] = useState({});

  const editUpdateBeer = (beer) => {
    setBeerToUpdate(beer);
    console.log(beer);
  };
  const updateOn = () => {
    setUpdateActive(true);
  };

  const updateOff = () => {
    setUpdateActive(false);
  };

  const deleteBeer = (beer) => {
    fetch(`http://localhost:3001/beer/${beer.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => getMyBeer());
  };

  const myMapper = () => {
    if (beer) {
      return beer.map((beer, index) => {
        console.log(beer);
        return (
          
            <Card style={{backgroundColor: '#DBD053' }}>
              <CardImg
                top
                width="100%"
                src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/low-calorie-beers-1579818049.jpg?crop=0.668xw:1.00xh;0,0&resize=640:*"
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Name: {beer.name}</CardTitle>
                <CardSubtitle>Brewery: {beer.brewery}</CardSubtitle>
                <CardSubtitle>ABV/IBU: {beer.abvibu}</CardSubtitle>
                <CardSubtitle>Location: {beer.location}</CardSubtitle>
                <CardText>Additional Comments{beer.comments}</CardText>
                <BeerEdit
                  getMyBeer={getMyBeer}
                  beerToUpdate={beerToUpdate}
                  updateOff={updateOff}
                  token={props.token}
                  id={beer.id}
                  fetchBeer={props.fetchBeer}
                />
                <Button
                  color="danger"
                  onClick={() => {
                    deleteBeer(beer);
                  }}
                >
                  Delete
                </Button>
              </CardBody>
            </Card>
          
        );
      });
    }
  };

  return <>
  <CardColumns>
  {myMapper()}
  </CardColumns>
  </>;
};

export default MyPosts;
