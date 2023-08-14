import logo from './logo.svg';
import './App.css';
import Form from './Components/Form';
import React, {useState} from 'react';
import formSchema from './Validation/FormSchema';
import * as yup from 'yup';
import axios from 'axios';

const initialFormValues = {
  username: '',
  email: '',
  password: '',
  tos: false
}

const initialFormErrors = {
  username: '',
  email: '',
  password: '',
  tos: ''
}

function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [users, setUsers] = useState([]);

  const submit = () => {
    axios.post('https://reqres.in/api/users', formValues)
      .then(res => {
        setUsers([res.data, ...users]);
      })
      .catch(err => console.log(err))
  }

  const validate = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  }


  const change = (name, value) => {
    validate(name, value);
    setFormValues({...formValues, [name]: value});
  }

  return (
    <div className="App">
      <Form values={formValues} change={change} errors={formErrors} submit={submit}/>
      
        {
        users.map(user => (
          <div key={user.id}>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <p>{user.createdAt}</p>
          
          </div>
        ))}

    </div>
  );
}

export default App;
