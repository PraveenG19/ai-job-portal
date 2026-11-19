import { useEffect, useState } from "react";
import api from "../services/api";

function Applicants() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        const loadApplicants = async () => {

            try {

                const response = await api.get("/applications");

                setApplications(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        loadApplicants();

    }, []);

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">
                Job Applicants
            </h2>

            <table className="table table-bordered">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Job</th>

                        <th>Cover Letter</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        applications.length > 0 ?

                            applications.map(application => (

                                <tr key={application.id}>

                                    <td>{application.id}</td>

                                    <td>{application.user?.fullName}</td>

                                    <td>{application.user?.email}</td>

                                    <td>{application.job?.title}</td>

                                    <td>{application.coverLetter}</td>

                                </tr>

                            ))

                            :

                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center"
                                >
                                    No Applicants
                                </td>

                            </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Applicants;