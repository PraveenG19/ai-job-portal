import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ApplyJob() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [coverLetter, setCoverLetter] = useState("");

    const applyJob = async (e) => {

        e.preventDefault();

        const application = {
            coverLetter: coverLetter,
            job: {
                id: id
            }
        };

        try {

            await api.post("/applications", application);

            alert("Application Submitted Successfully");

            navigate("/applications");

        } catch (error) {

            console.log(error);

            alert("Application Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">
                        Apply for Job
                    </h2>

                    <form onSubmit={applyJob}>

                        <div className="mb-3">

                            <label className="form-label">
                                Cover Letter
                            </label>

                            <textarea
                                className="form-control"
                                rows="6"
                                value={coverLetter}
                                onChange={(e) =>
                                    setCoverLetter(e.target.value)
                                }
                            />

                        </div>

                        <button
                            className="btn btn-success"
                            type="submit"
                        >
                            Submit Application
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default ApplyJob;