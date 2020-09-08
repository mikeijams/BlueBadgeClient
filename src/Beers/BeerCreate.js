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

const BeerCreate = (props) => {
  const [name, setName] = useState("");
  const [brewery, setBrewery] = useState("");
  const [abvibu, setAbvibu] = useState("");
  const [location, setLocation] = useState("");
  const [comments, setComments] = useState("");

 

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${APIURL}/beer/create`, {
      method: "POST",
      body: JSON.stringify({
        beer: {
          name: name,
          brewery: brewery,
          abvibu: abvibu,
          location: location,
          comments: comments,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        setName("");
        setBrewery("");
        setAbvibu("");
        setLocation("");
        setComments("");
        props.fetchBeer();
      });
  };
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>New Post</Button>
      <Modal isOpen={isOpen}>
        <ModalHeader>Post A Beer</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="brewery">Brewery</Label>
              <Input
                name="description"
                value={brewery}
                onChange={(e) => setBrewery(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="abvibu">ABV/IBU</Label>
              <Input
                name="abvibu"
                value={abvibu}
                onChange={(e) => setAbvibu(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="location">Location</Label>
              <Input
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="comments">Additional Comments</Label>
              <Input
                name="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" onClick={handleSubmit} onClick={hideModal}>
              Post!
            </Button>
            <button onClick={hideModal}>Cancel</button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default BeerCreate;
