import React, {useState, useEffect} from 'react'; 
import BeerCreate from './BeerCreate'   
import { Container, Row, Col } from 'reactstrap';
import APIURL from '../helpers/enviornments';
import AllPosts from './AllPosts'
import MyPosts from './MyPosts'
import { Route, Link, Switch } from 'react-router-dom'

const BeerIndex = (props) => {

    // const [beer, setBeer] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [beerUpdate, setBeerUpdate] = useState({});

    const editUpdateBeer = (beer) => {
        setBeerUpdate(beer);
        console.log(beer)
    }
    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false)
    }

    // const fetchBeer = () => {
        
    //     fetch(`${APIURL}/beer/`, {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': props.token
    //         })
    //     }).then(
    //         (res) => res.json()
    //     ).then((logData) => {
    //         setBeer(logData);
    //         console.log(logData)
    //     })

    // }

    useEffect(() => {
        props.fetchBeer();
    }, [])

    return ( 
        <>
        <Container>
        <Row>
            <Col md="3">
            <BeerCreate fetchBeer={props.fetchBeer} token={props.token}/>
            </Col>
            <Col md="12">
            <AllPosts beer={props.beer}  fetchBeer={props.fetchBeer} token={props.token}/>
            </Col>
            {/* <MyPosts fetchBeer={fetchBeer} beer={beer} editUpdateBeer={editUpdateBeer}></MyPosts> */}
        </Row>

    </Container>


</>
     );
}
 
export default BeerIndex;