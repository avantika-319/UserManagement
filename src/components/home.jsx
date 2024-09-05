import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

/*
Home Component: Displays a list of users fetched from the API.
Provides options to Add, Update, Read, and Delete users.
 */


const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // useEffect: Fetches the users list from the API when the component mounts

    useEffect(() => {
        //Fetching users
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                //console.log(response.data)
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to fetch users");
                setLoading(false);
            });
    }, []);

    // Display loading message while data is being fetched
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleDelete = (id) => {
        //stimulating delete request on the local state
        if (id > 0) {
            if (window.confirm("are you sure you want to delete")) {
                const dt = users.filter(user => user.id !== id)
                setUsers(dt);
            }
        }
        // Make DELETE request to API to simulate the server-side deletion
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(() => console.log("User Deleted" + " " + `${id}`))
            .catch(error => console.error("Error Deleting user:", error));
    };

    return (
        <div>
            <div className="text-end"><Link to="/create" className="btn btn-primary">ADD</Link></div>
            <table className="table table hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <Link to={`/read/${user.id}`} className="btn btn-success">Read</Link>
                                <button className="btn btn-primary" onClick={() => navigate(`/update/${user.id}`)}>Update</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
