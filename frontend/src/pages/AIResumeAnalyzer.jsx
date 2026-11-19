import { useState } from "react";
import api from "../services/api";

function AIResumeAnalyzer() {

    const [resume, setResume] = useState("");
    const [result, setResult] = useState("");

    const analyzeResume = async () => {

        try {

            const response = await api.post(
                "/gemini/analyze",
                resume,
                {
                    headers: {
                        "Content-Type": "text/plain"
                    }
                }
            );

            setResult(response.data);

        } catch (error) {

            console.log(error);
            alert("Analysis Failed");

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                AI Resume Analyzer
            </h2>

            <textarea
                className="form-control"
                rows="10"
                placeholder="Paste your resume here..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
            />

            <button
                className="btn btn-success mt-3"
                onClick={analyzeResume}
            >
                Analyze Resume
            </button>

            {result && (

                <div className="alert alert-info mt-4">

                    <h4>AI Feedback</h4>

                    <p>{result}</p>

                </div>

            )}

        </div>

    );

}

export default AIResumeAnalyzer;