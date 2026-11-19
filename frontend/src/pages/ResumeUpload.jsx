import { useState } from "react";
import api from "../services/api";

function ResumeUpload() {

    const [file, setFile] = useState(null);

    const uploadResume = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("file", file);

        try {

            await api.post("/resumes/upload", formData, {

                headers: {
                    "Content-Type": "multipart/form-data"
                }

            });

            alert("Resume Uploaded Successfully");

        } catch (error) {

            console.log(error);

            alert("Upload Failed");

        }

    };

    return (

        <div className="container mt-5">

            <h2>Upload Resume</h2>

            <form onSubmit={uploadResume}>

                <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <button className="btn btn-primary">
                    Upload Resume
                </button>

            </form>

        </div>

    );

}

export default ResumeUpload;