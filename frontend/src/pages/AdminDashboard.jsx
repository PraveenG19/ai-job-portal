import { Link } from "react-router-dom";

function AdminDashboard() {

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-5">
                Admin Dashboard
            </h2>

            <div className="row">

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h4>Users</h4>

                            <Link
                                className="btn btn-primary"
                                to="/manage-users"
                            >
                                Manage Users
                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h4>Companies</h4>

                            <Link
                                className="btn btn-success"
                                to="/companies"
                            >
                                Companies
                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h4>Jobs</h4>

                            <Link
                                className="btn btn-warning"
                                to="/manage-jobs"
                            >
                                Jobs
                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h4>Analytics</h4>

                            <Link
                                className="btn btn-info"
                                to="/analytics"
                            >
                                View
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;