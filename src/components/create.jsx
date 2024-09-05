import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Create(){

    const [userName, setUserName] = useState('');  // Renamed 'name' to 'userName' to avoid conflict
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        const newUser ={ name :userName , email, phone};
        
        axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(response => {
        console.log('User created:', response.data);
        navigate('/');
      })
      .catch(error => console.error('Error creating user:', error));
    };

    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'> 
        <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
           <form onSubmit={handleSubmit} className="create-form">
            <div className="mb-3">
            <label>
                Name:
                <input type="text" value={userName} onChange={e=>setUserName(e.target.value)}></input>
            </label>
            </div>
            <div className="mb-3">
            <label> 
                Email:
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)}></input>
            </label>
            </div>
            <div className="mb-4">
            <label>
                Phone:
                <input type="text"  value={phone} onChange={e=>setPhone(e.target.value)}></input>
            </label>
            </div>
            <button type="submit" className="btn btn-primary">Create User</button>
           
           </form>
           </div>
           </div>
    );
}

export default Create;