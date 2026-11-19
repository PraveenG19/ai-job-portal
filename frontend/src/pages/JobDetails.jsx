import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function JobDetails() {

    const { id } = useParams();

    const [job, setJob] = useState({});

    
    useEffect(() => {

        const fetchJob = async () => {
        try {
            const response = await api.get(`/jobs/${id}`);
            setJob(response.data);
        } catch (error) {            
            console.log(error);
        }
    };
        fetchJob();
    }, []);

    return (
        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2>{job.title}</h2>

                    <h5 className="text-primary">
                        {job.company?.companyName}
                    </h5>

                    <hr />

                    <p><strong>Location:</strong> {job.location}</p>

                    <p><strong>Salary:</strong> ₹{job.salary}</p>

                    <p><strong>Description:</strong></p>

                    <p>{job.description}</p>

                    <Link to={`/apply/${job.id}`} className="btn btn-success">
                        Apply Now
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default JobDetails;