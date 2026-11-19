import { useState } from "react";
import api from "../services/api";

function Resume() {

    const [file, setFile] = useState(null);

    const uploadResume = async (e) => {

        e.preventDefault();

        if (!file) {
            alert("Please select a resume.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {

            await api.post("/files/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Resume uploaded successfully.");

        } catch (error) {

            console.log(error);

            alert("Resume upload failed.");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-success text-white">

                    <h3>Upload Resume</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={uploadResume}>

                        <div className="mb-3">

                            <label className="form-label">
                                Select Resume (PDF/DOC)
                            </label>

                            <input
                                type="file"
                                className="form-control"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => setFile(e.target.files[0])}
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Upload Resume
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default Resume;