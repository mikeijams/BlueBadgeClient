import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import APIURL from "../helpers/enviornments";

const BeerEdit = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const beerUpdate = (event, beer) => {
    console.log("hey");
    event.preventDefault();
    fetch(`${APIURL}/beer/update/${props.id}`, {
      method: "PUT",
      body: JSON.stringify({
        beer: {
          name: editName,
          brewery: editBrewery,
          abvibu: editAbvibu,
          location: editLocation,
          comments: editComments,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then((res) => {
      setIsOpen(false);
      props.getMyBeer()
    });
  };



  const updatingBeer = () => {
    fetch(`${APIURL}/beer/:id`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        setEditName(logData.name);
        setEditBrewery(logData.brewery);
        setEditAbvibu(logData.abvibu);
        setEditLocation(logData.location);
        setEditComments(logData.comments);
        console.log(logData);
      });
  };

  // useEffect(() => {
  //   updatingBeer();
  // }, []);

  const [editName, setEditName] = useState("");
  const [editBrewery, setEditBrewery] = useState("");
  const [editAbvibu, setEditAbvibu] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editComments, setEditComments] = useState("");

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Edit</Button>
      <Modal isOpen={isOpen}>
        <ModalHeader>Edit Post</ModalHeader>
        <ModalBody>
          <Form onSubmit={beerUpdate}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                value={editName}
                id="editName"
                onChange={(e) => setEditName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="brewery">Brewery</Label>
              <Input
                name="description"
                value={editBrewery}
                id="editBrewery"
                onChange={(e) => setEditBrewery(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="abvibu">ABV/IBU</Label>
              <Input
                name="abvibu"
                value={editAbvibu}
                id="editAbvibu"
                onChange={(e) => setEditAbvibu(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="location">Location</Label>
              <Input
                name="location"
                value={editLocation}
                id="editLocation"
                onChange={(e) => setEditLocation(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="comments">Additional Comments</Label>
              <Input
                name="comments"
                value={editComments}
                id="editComments"
                onChange={(e) => setEditComments(e.target.value)}
              />
            </FormGroup>
            <Button type="submit">Post!</Button>
            <button onClick={hideModal}>Cancel</button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default BeerEdit;
