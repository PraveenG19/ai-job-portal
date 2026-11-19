import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        phone: "",
        role: ""
    });

    const [editing, setEditing] = useState(false);

    useEffect(() => {


        const loadProfile = async () => {

        try {

            const response = await api.get("/users/1");

            setUser(response.data);

        } catch (error) {

            console.log(error);

        }

    };

        loadProfile();

    }, []);

    

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    const updateProfile = async () => {

        try {

            await api.put("/users/1", user);

            alert("Profile Updated Successfully");

            setEditing(false);

        } catch (error) {

            console.log(error);

            alert("Update Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3>My Profile</h3>

                </div>

                <div className="card-body">

                    <div className="mb-3">

                        <label>Full Name</label>

                        <input
                            className="form-control"
                            name="fullName"
                            value={user.fullName}
                            onChange={handleChange}
                            readOnly={!editing}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Email</label>

                        <input
                            className="form-control"
                            value={user.email}
                            readOnly
                        />

                    </div>

                    <div className="mb-3">

                        <label>Phone</label>

                        <input
                            className="form-control"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            readOnly={!editing}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Role</label>

                        <input
                            className="form-control"
                            value={user.role}
                            readOnly
                        />

                    </div>

                    {
                        editing ?

                            <button
                                className="btn btn-success"
                                onClick={updateProfile}
                            >
                                Save Changes
                            </button>

                            :

                            <button
                                className="btn btn-warning"
                                onClick={() => setEditing(true)}
                            >
                                Edit Profile
                            </button>

                    }

                </div>

            </div>

        </div>

    );

}

export default Profile;