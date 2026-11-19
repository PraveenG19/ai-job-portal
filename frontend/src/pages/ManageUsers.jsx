import { useEffect, useState } from "react";
import api from "../services/api";

function ManageUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        const loadUsers = async () => {

            try {

                const response = await api.get("/users");

                setUsers(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        loadUsers();

    }, []);

    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                Manage Users
            </h2>

            <table className="table table-bordered">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Role</th>

                    </tr>

                </thead>

                <tbody>

                    {users.map(user => (

                        <tr key={user.id}>

                            <td>{user.id}</td>

                            <td>{user.fullName}</td>

                            <td>{user.email}</td>

                            <td>{user.role}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default ManageUsers;