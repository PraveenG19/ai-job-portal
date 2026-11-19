import { Link } from "react-router-dom";

function CompanyCard({ company }) {
    return (
        <div className="card shadow h-100">
            <div className="card-body">

                <h4>{company.companyName}</h4>

                <p>
                    <strong>Location:</strong> {company.location}
                </p>

                <p>{company.description}</p>

                <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-primary me-2"
                >
                    Website
                </a>

                <Link
                    to={`/companies/${company.id}`}
                    className="btn btn-primary"
                >
                    View Details
                </Link>

            </div>
        </div>
    );
}

export default CompanyCard;