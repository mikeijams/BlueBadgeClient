import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import APIURL from "../helpers/enviornments";

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length <= 5) {
      fetch(`${APIURL}/signup`, {
        method: "POST",
        body: JSON.stringify({
          user: { username: username, password: password },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          props.updateToken(data.sessionToken);
        });
    } else {
      setShow(true);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            type="email"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            value={username}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
          />
        </FormGroup>
        <Button type="submit">SignUp</Button>
      </Form>

      {show ? (
        <Alert variant="danger" dismissible onClose={() => setShow(false)}>
          <p>Your Password Must Be More Than 5 Characters</p>
        </Alert>
      ) : null}
    </div>
  );
};

export default Signup;
