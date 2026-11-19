import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditJob() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState({
        title: "",
        description: "",
        location: "",
        salary: ""
    });

    useEffect(() => {

        const loadJob = async () => {

            try {

                const response = await api.get(`/jobs/${id}`);

                setJob(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        loadJob();

    }, [id]);

    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });

    };

    const updateJob = async (e) => {

        e.preventDefault();

        try {

            await api.put(`/jobs/${id}`, job);

            alert("Job Updated Successfully");

            navigate("/manage-jobs");

        } catch (error) {

            console.log(error);

            alert("Update Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-warning">
                    <h3>Edit Job</h3>
                </div>

                <div className="card-body">

                    <form onSubmit={updateJob}>

                        <input
                            className="form-control mb-3"
                            name="title"
                            value={job.title}
                            onChange={handleChange}
                        />

                        <textarea
                            className="form-control mb-3"
                            rows="5"
                            name="description"
                            value={job.description}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            name="location"
                            value={job.location}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            name="salary"
                            value={job.salary}
                            onChange={handleChange}
                        />

                        <button
                            className="btn btn-success"
                            type="submit"
                        >
                            Update Job
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditJob;