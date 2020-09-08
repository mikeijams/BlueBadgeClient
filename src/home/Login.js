import React, {useState, useEffect, useCallback} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'
import APIURL from '../helpers/enviornments';

const Login = (props) => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   const handleSubmit= (event) => {
    event.preventDefault();
    fetch(`${APIURL}/login`, {
        method: 'POST',
        body: JSON.stringify({user: {username: username, password: password}}),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(
        (response) => response.json()
    ).then((data) => {
        props.updateToken(data.sessionToken);
        console.log(data)
        localStorage.setItem('id', data.user.id)
    })
    
}



    return ( <div>

        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="email" onChange={(e) => setUsername(e.target.value)} name="username" value={username}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input  onChange={(e) => setPassword(e.target.value)} name="password" value={password}/>
            </FormGroup>
            <Button type="submit">Login</Button>
        </Form>
    </div>

     );
}
 
export default Login;