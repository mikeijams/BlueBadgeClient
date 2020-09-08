import React, { useCallback, useEffect, useState, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sitebar from "./home/Navbar";
import Auth from "./Auth/Auth";
import BeerIndex from "./Beers/BeerIndex";
import Navbar from "./home/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import AllPosts from "./Beers/AllPosts";
import { Route, Link, Switch } from "react-router-dom";
import MyPosts from "./Beers/MyPosts";
import APIURL from "./helpers/enviornments";

function App() {
  const [sessionToken, setSessionToken] = useState("");
  const [beer, setBeer] = useState([]);

  // const fetchBeer = () => {
  //   fetch(`${APIURL}/beer/`, {
  //     method: "GET",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: sessionToken,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((logData) => {
  //       setBeer(logData);
  //       console.log(logData);
  //     });
  // };

  const fetchBeer = useCallback(() => {
    fetch(`${APIURL}/beer/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        setBeer(logData);
        console.log(logData);
      });
  }, [sessionToken]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <Switch>
        <Route path="/allposts">
          <BeerIndex fetchBeer={fetchBeer} beer={beer} token={sessionToken}/>
        </Route>
        <Route exact path="/myposts">
          <MyPosts fetchBeer={fetchBeer} beer={beer} token={sessionToken} />
        </Route>
      </Switch>
    ) : (
      <Auth updateToken={updateToken} />
    );
  };

  return (
    <>
      <Router>
        <div className="App" style={{ backgroundColor: "#3D7068" }}>
          <Sitebar clickLogout={clearToken} />
          {protectedViews()}
        </div>
      </Router>
    </>
  );
}

export default App;
