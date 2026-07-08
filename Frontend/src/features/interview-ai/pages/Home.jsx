import { useState, useRef } from 'react'
import {useNavigate} from 'react-router'
import '../style/home.scss'
import {useInterview} from "../hooks/useInterview"
import { useEffect } from 'react'
import logo from "../../../assets/images/logos/logo-light-removebg-preview.png"

function scoreTone(score) {
    if (score >= 70) return 'high'
    if (score >= 50) return 'mid'
    return 'low'
}

const Home = () => {

    const {loading,generateInterviewReport , report, allreports, getAllReports} = useInterview();
    const [jobDescription, setJobDescription] = useState('')
    const [selfDescription, setSelfDescription] = useState('')
    const [resumeName, setResumeName] = useState('')
    const resumeInputRef = useRef()

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        setResumeName(file ? file.name : '')
    }

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        try {
            const resumeFile = resumeInputRef.current.files[0]

            const report =  await generateInterviewReport({jobDescription, selfDescription, resumeFile})

            if (!report?._id) {
            console.log("No report id returned — request likely failed")
            return
        }

            navigate(`/interview/${report._id}`)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
         getAllReports()
        }, [])
   

        if(loading){
        return (<main><span>Loading</span><span className='spinner'></span></main>)
    }

    return (
        <div className="home-page">
            <aside className="home-sidebar">
                <div className="home-sidebar__brand">
                    <span ><img  className="home-sidebar-brand-mark" src={logo} alt="" srcSet="" /></span>

                    <span 
                    className="home-sidebar__name">Career<span>Pilot</span></span>
                </div>

                <span className="home-sidebar__eyebrow">My Reports</span>

                <div className="home-sidebar__list">
                    {report?.map((r) => (
                        <button
                            key={r._id}
                            type="button"
                            className="report-item"
                            onClick={() => navigate(`/interview/${r._id}`)}
                        >
                            <span className="report-item__info">
                                <span className="report-item__title">{r.title}</span>
                                <span className="report-item__date">Generated on {new Date(r.createdAt).toLocaleDateString()}</span>
                            </span>
                            <span className={`report-item__score report-item__score--${scoreTone(r.matchScore)}`}>
                                {r.matchScore}%
                            </span>
                        </button>
                    ))}
                </div>
            </aside>

            <main className="home">
                <div className="page-header">
                    <h1>
                        Create Your Custom <span className="accent">Interview Plan</span>
                    </h1>
                    <p>
                        Personalize your preparation by aligning your professional  <br />history
                        with the specific nuances of your next target role.
                    </p>
                </div>

                <div className="container">
                    <div className="left">
                        <div className="section-header">

                            <h2> Target Job Description</h2>
                            <span className="badge badge--required">Required</span>
                        </div>

                        <textarea
                            name="jobDescription"
                            id="jobDescription"
                            placeholder="Paste the job requirements, responsibilities, and company values here..."
                            maxLength={5000}
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                        <div className="char-count">{jobDescription.length}/5000</div>

                        <div className="tip-banner">
                            <span className="tip-icon">💡</span>
                            <p>
                                Pro tip: Including "Soft Skills" and "Company Culture" sections
                                yields better behavioral questions.
                            </p>
                        </div>
                    </div>

                    <div className="right">
                        <div className="section-header">
                            <h2> Your Profile</h2>
                            <span className="badge badge--best">Best Results</span>
                        </div>

                        <div className="input-group">
                            <label htmlFor="resume" className="upload-btn">
                                <span className="upload-icon">📂</span>
                                <span className="upload-text">
                                    {resumeName || 'Upload Resume'}
                                </span>
                                <span className="upload-sub">PDF only (Max 3MB)</span>
                            </label>
                            <input
                                type="file"
                                name="resume"
                                id="resume"
                                accept=".pdf"
                                ref={resumeInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>

                        <div className="divider">
                            <span>OR</span>
                        </div>

                        <div className="input-group">
                            <label htmlFor="selfDescription">Quick Self-Description</label>
                            <textarea
                                name="selfDescription"
                                id="selfDescription"
                                placeholder="Briefly describe your background, key achievements, and current goals if you don't have a resume handy..."
                                value={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                            />
                        </div>

                        <div className="info-banner">
                            <span className="info-icon">ℹ️</span>
                            <p>
                                Either a <strong>Resume</strong> or a{' '}
                                <strong>Self-Description</strong> is required to tailor the
                                interview strategy to your unique background.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footer-bar">
                    {/* <span className='footer-meta'>hellod sksks</span> */}
                    <button
                    onClick={handleGenerateReport}
                    className="generate-btn">
                        Generate My Interview Strategy
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Home