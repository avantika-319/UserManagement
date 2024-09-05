import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; //hook to extract route parameters
import axios from "axios"; // for making api requests

/*Read component is used to fetch user data and display them
 the user id is passed via the URL, and the data is fetched using that id*/
function Read(){
    const {id} = useParams(); //extracting 'id' from the URL
    const [user, setUser] = useState(
        {
            name: '',
            email: '',
            phone:''
        }
    );

    //get request is made to fetch user details by id
    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response =>
                setUser(response.data)) //update 'user' state with fetched data
            .catch(err => console.log(err))
    },[id]) //dependency array with 'id', ensures the effect when 'id' changes

    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
        <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
            <h3>Details of the User</h3>
            <div className="mb-2">
                <strong>Name: {user.name}</strong>
            </div>
            <div className="mb-2">
                <strong>Email: {user.email}</strong>
            </div>
            <div className="mb-2">
                <strong>Phone: {user.phone}</strong>
            </div>
        </div>
        </div>
    )
}

export default Read;