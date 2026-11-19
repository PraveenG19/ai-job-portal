import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateJob() {

    const navigate = useNavigate();

    const [job, setJob] = useState({
        title: "",
        description: "",
        location: "",
        salary: ""
    });

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

    const createJob = async (e) => {

        e.preventDefault();

        try {

            await api.post("/jobs", job);

            alert("Job Created Successfully");

            navigate("/manage-jobs");

        } catch (error) {

            console.log(error);

            alert("Failed to create job");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3>Create Job</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={createJob}>

                        <input
                            className="form-control mb-3"
                            placeholder="Job Title"
                            name="title"
                            value={job.title}
                            onChange={handleChange}
                        />

                        <textarea
                            className="form-control mb-3"
                            rows="5"
                            placeholder="Description"
                            name="description"
                            value={job.description}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Location"
                            name="location"
                            value={job.location}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Salary"
                            name="salary"
                            value={job.salary}
                            onChange={handleChange}
                        />

                        <button
                            className="btn btn-success"
                            type="submit"
                        >
                            Post Job
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default CreateJob;