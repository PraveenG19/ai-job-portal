import { Link } from "react-router-dom";

function HrDashboard() {

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-5">
                HR Dashboard
            </h2>

            <div className="row">

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h4>Total Jobs</h4>

                            <h1>0</h1>

                            <Link
                                to="/manage-jobs"
                                className="btn btn-primary"
                            >
                                Manage Jobs
                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h4>Applicants</h4>

                            <h1>0</h1>

                            <Link
                                to="/applicants"
                                className="btn btn-success"
                            >
                                View Applicants
                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h4>Create Job</h4>

                            <Link
                                to="/create-job"
                                className="btn btn-warning"
                            >
                                Post Job
                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h4>Company</h4>

                            <Link
                                to="/companies"
                                className="btn btn-info"
                            >
                                Company Profile
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default HrDashboard;