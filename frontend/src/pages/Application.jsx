import { useEffect, useState } from "react";
import api from "../services/api";

function Applications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        const loadApplications = async () => {

            try {

                const response = await api.get("/applications");

                setApplications(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        loadApplications();

    }, []);

    const deleteApplication = async (id) => {

        try {

            await api.delete(`/applications/${id}`);

            setApplications(
                applications.filter(application => application.id !== id)
            );

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">
                My Applications
            </h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>
                        <th>ID</th>
                        <th>Job</th>
                        <th>Applicant</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {applications.length > 0 ? (

                        applications.map((application) => (

                            <tr key={application.id}>

                                <td>{application.id}</td>

                                <td>{application.job?.title}</td>

                                <td>{application.user?.fullName}</td>

                                <td>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteApplication(application.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="4" className="text-center">
                                No Applications
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default Applications;