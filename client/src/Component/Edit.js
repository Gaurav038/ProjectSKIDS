import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useNavigate, useParams} from 'react-router-dom';
import { addUser, editUser, getUsers } from '../Service/api';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

function Edit() {

  const {id} = useParams()
  const classes = useStyles()
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [inputFields, setInputFields] = useState(
    { user_name: '', user_email: '',user_phone: '' },
  );

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Name validation
    if (inputFields.user_name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(inputFields.user_email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    // Phone validation
    if (!/^\d{10}$/.test(inputFields.user_phone)) {
      newErrors.phone = '10 Digit valid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };



  const handleSubmit = async(e) => {
    e.preventDefault();

    if(validateForm()){
      await editUser(id, inputFields);  
      
      window.alert("User Updated Succesfully")
      navigate('/');
    }
    
  };

  const handleChangeInput = (id, event) => {
    setInputFields({...inputFields, [event.target.name] : event.target.value})
  }

const getData = async() => {
    const data = await getUsers(id)
    const rslt = data?.data
    console.log(rslt);
    setInputFields({ user_name: rslt.user_name, user_email: rslt.user_email ,user_phone: rslt.user_phone })
}

  useEffect(() => {
    getData()
  },[id])

  return (
    <Container>
      <h1>Edit Member</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
          <div className='form-Box'>
            <TextField
              name="user_name"
              label="Name"
              variant="filled"
              value={inputFields.user_name}
              onChange={event => handleChangeInput(inputFields.id, event)}
            />

            <TextField
              name="user_email"
              label="email"
              variant="filled"
              value={inputFields.user_email}
              onChange={event => handleChangeInput(inputFields.id, event)}
            />

            <TextField
              name="user_phone"
              label="Phone"
              variant="filled"
              value={inputFields.user_phone}
              onChange={event => handleChangeInput(inputFields.id, event)}
            />

          </div>
          {errors.name?
              <div className="error">{errors.name}</div>
              : errors.email ?
                <div className="error">{errors.email}</div>
                : errors.phone ?
                <div className="error">{errors.phone}</div>
                : <div className="error"></div>
          }
        <Button
          className={classes.button}
          variant="contained" 
          color="primary" 
          type="submit" 
          onClick={handleSubmit}
        >Submit</Button>
      </form>
    </Container>
  );
}

export default Edit;