import React ,{useState ,useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Update(){
    const {id} = useParams();
    const [user, setUser] = useState(
        {
            name: '',
            email: '',
            phone:''
        }
    );
    const navigate= useNavigate();

    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => setUser(response.data))
            .catch(error => console.error('Error fetching user data:', error));
    },[id]);
    

    const handleSubmit = (e)=>
    {
        e.preventDefault();
        axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user)
            .then(response => {
                console.log('USER UPDATED :', response.data)
                navigate('/')
            })
            .catch(error => console.error('Error Updating:',error));
    }

    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
        <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
            <form onSubmit={handleSubmit} className="create-form">
                <div className="mb-3">
                <label>Name:
                <input type="text" value={user.name} onChange={e =>setUser({...user, name: e.target.value})}></input>
                </label>
                </div>
                <div className="mb-3">
                <label>Email:
                <input type="email" value={user.email} onChange={e =>setUser({...user, email: e.target.value})}></input>
                </label>
                </div>
                <div className="mb-3">
                <label>Phone:
                <input type="text" value={user.phone} onChange={e =>setUser({...user, phone: e.target.value})}></input>
                </label>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
            </div>
        </div>
    )
}

export default Update;