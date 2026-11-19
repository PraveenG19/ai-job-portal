import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ManageJobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        const loadJobs = async () => {

            try {

                const response = await api.get("/jobs");

                setJobs(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        loadJobs();

    }, []);

    const deleteJob = async (id) => {

        try {

            await api.delete(`/jobs/${id}`);

            setJobs(jobs.filter(job => job.id !== id));

            alert("Job Deleted Successfully");

        } catch (error) {

            console.log(error);

            alert("Failed to Delete Job");

        }

    };

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between mb-4">

                <h2>Manage Jobs</h2>

                <Link
                    to="/create-job"
                    className="btn btn-success"
                >
                    Add Job
                </Link>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Title</th>

                        <th>Location</th>

                        <th>Salary</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {jobs.length > 0 ? (

                        jobs.map((job) => (

                            <tr key={job.id}>

                                <td>{job.id}</td>

                                <td>{job.title}</td>

                                <td>{job.location}</td>

                                <td>{job.salary}</td>

                                <td>

                                    <Link
                                        to={`/edit-job/${job.id}`}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteJob(job.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center"
                            >
                                No Jobs Available
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default ManageJobs;