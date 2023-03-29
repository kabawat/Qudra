import React from 'react'
import profGuideVid from '../../assets/vid/profGuidelineVid.mp4'
import profGuidelineImg9 from '../../assets/img/profGuideImg1.jpg'
import profGuidelineImg6 from '../../assets/img/profGuideImg2.jpg'
import profGuidelineImg7 from '../../assets/img/profGuideImg3.jpg'
import profGuidelineImg8 from '../../assets/img/profGuideImg4.jpg'
import profGuidelineImg3 from '../../assets/img/profGuideImg5.jpg'
import profGuidelineImg4 from '../../assets/img/profGuideImg6.jpg'
import profGuidelineImg5 from '../../assets/img/profGuideImg7.jpg'
import profGuidelineImg1 from '../../assets/img/profGuideImg8.jpg'
import profGuidelineImg2 from '../../assets/img/profGuideImg9.jpg'
import Dashboardside from '../ProfessionalDashboardside'
import { HeaderDashboard } from '../Header'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import Loader from '../Loader'
import { useEffect } from 'react'

const ProfessionalGuidelines = () => {
    const navigate = useNavigate()
    const [isRender, setIsRender] = useState(false)
    const [cookies] = useCookies()
    useEffect(() => {
        if (cookies?.user_data) {
            if (cookies?.user_data?.category_selected) {
                if (cookies?.user_data.role === "professional") {
                    setIsRender(true)
                } else {
                    navigate('/clientdashboard')
                }
            } else {
                if (cookies?.user_data.role === "professional") {
                    navigate('/categoryArchitecture')
                } else {
                    navigate('/client-architechture')
                }
            }
        } else {
            navigate('/select-sign-in')
        }
    }, [])
    return (
        isRender ? <>
            <div className="dashboard">
                <div className="container-fluid h-100">
                    <div className="row h-100 dashboard-theme-color">
                        <div className="col-xxl-2 col-md-3 px-0 dashboard-theme-color">
                            <Dashboardside />
                        </div>
                        <div className="col-xxl-10 col-md-9 custom-border-radius-one  dashboard-theme-skyblue px-0 dashboard-right-section">
                            <HeaderDashboard />
                            <main className="dashboard-main">
                                <div className='professional-guidelines-wrapper' >
                                    <div>
                                        <div className='video-container'>
                                            <video src={profGuideVid} poster={profGuidelineImg1} controls preload="auto">
                                                This video is not supported by your browser
                                            </video>
                                        </div>
                                        <div className="images-container">
                                            <ul className='image-list' >
                                                <li><img src={profGuidelineImg1} alt="guideline-image1" /></li>
                                                <li><img src={profGuidelineImg2} alt="guideline-image2" /></li>
                                                <li><img src={profGuidelineImg3} alt="guideline-image2" /></li>
                                                <li><img src={profGuidelineImg4} alt="guideline-image4" /></li>
                                                <li><img src={profGuidelineImg5} alt="guideline-image5" /></li>
                                                <li><img src={profGuidelineImg6} alt="guideline-image6" /></li>
                                                <li><img src={profGuidelineImg7} alt="guideline-image7" /></li>
                                                <li><img src={profGuidelineImg8} alt="guideline-image8" /></li>
                                                <li><img src={profGuidelineImg9} alt="guideline-image9" /></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </> : <Loader />

    )
}

export default ProfessionalGuidelines