
// apiConfig.js
export const getBaseURL = () => {
    // Callers append "api/...", so the base must end with exactly one "/"
    const base = process.env.REACT_APP_API_URL || "http://localhost:3001/";
    return base.endsWith("/") ? base : `${base}/`;
};
