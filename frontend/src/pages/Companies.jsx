import { useEffect, useState } from "react";
import api from "../services/api";
import CompanyCard from "../components/CompanyCard";

function Companies() {

    const [companies, setCompanies] = useState([]);

    useEffect(() => {

        const loadCompanies = async () => {

            try {

                const response = await api.get("/company");

                setCompanies(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        loadCompanies();

    }, []);

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">
                Top Companies
            </h2>

            <div className="row">

                {companies.length > 0 ? (

                    companies.map((company) => (

                        <div
                            className="col-md-4 mb-4"
                            key={company.id}
                        >
                            <CompanyCard company={company} />
                        </div>

                    ))

                ) : (

                    <h4 className="text-center">
                        No Companies Available
                    </h4>

                )}

            </div>

        </div>

    );
}

export default Companies;