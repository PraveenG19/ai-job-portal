import { useEffect, useState } from "react";
import api from "../services/api";

function SavedJobs() {

    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {

        const loadSavedJobs = async () => {

            try {

                const response = await api.get("/saved-jobs");

                setSavedJobs(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        loadSavedJobs();

    }, []);

    const removeSavedJob = async (id) => {

        try {

            await api.delete(`/saved-jobs/${id}`);

            setSavedJobs(
                savedJobs.filter(job => job.id !== id)
            );

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">
                Saved Jobs
            </h2>

            <div className="row">

                {savedJobs.length > 0 ? (

                    savedJobs.map((saved) => (

                        <div
                            className="col-md-4 mb-4"
                            key={saved.id}
                        >

                            <div className="card shadow">

                                <div className="card-body">

                                    <h4>{saved.job?.title}</h4>

                                    <h6 className="text-primary">
                                        {saved.job?.company?.companyName}
                                    </h6>

                                    <p>
                                        {saved.job?.location}
                                    </p>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            removeSavedJob(saved.id)
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    <h4 className="text-center">
                        No Saved Jobs
                    </h4>

                )}

            </div>

        </div>

    );

}

export default SavedJobs;