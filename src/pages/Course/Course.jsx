/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Quiz from '../../components/Quiz/Quiz';
import CollapsedContent from '../../components/CollapsedContent/CollapsedContent';
import YoutubeIframe from '../../components/YoutubeIframe/YoutubeIframe';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Course = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const token = useSelector(state => state.userData.user?.data.token);
    const [isQuizTime, setIsQuizTime] = useState(false);
    const navigate = useNavigate();
    const linkVideo = useSelector(state => state.courseData.linkVideo);
    const [userCourses, setuserCourses] = useState([]);//this will be used to store, which courses user have
    const pivotApi = `http://localhost:3030/mycourses`;
    const courseApi = `http://localhost:3030/courses/`;
    const [detailCourse, setDetailCourse] = useState({});

    function getVideoId(url) {
        url = url ? url : "https://www.youtube.com/embed/4YKpBYo61Cs"

        let result = "";
        for (let i = url.length - 1; i >= 1; i--) {
            if (url[i] === "/") {
                return result
            } else {
                result = url[i] + result;
            }
        }
    }
    //Alamat
    // <Route path="/mycourses/:my_course_id" element={<PermanentDrawer />} />

    useEffect(() => {
        const haveTemp = []
        axios.get(pivotApi, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                response?.data.data.forEach(dataCourses => {
                    haveTemp.push(dataCourses.course_id)
                })
                setuserCourses(haveTemp)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    useEffect(() => {
        const have = userCourses?.includes(parseInt(params.my_course_id))
        if (userCourses?.length > 0) {
            if (!have) {
                navigate(`/courses/${params.my_course_id}`)
            }
        }
    }, [userCourses]);

    useEffect(() => {
        axios.get(courseApi + params.my_course_id)
            .then(response => {
                setDetailCourse(response.data.data)
            })
            .catch(error => {
                console.log(error)
            })

    }, []);

    return (
        <>
            <div className='  min-h-screen bg-neutral-content'>
                {/* Navbar */}
                <div className='bg-neutral px-8 py-4 flex items-center'>
                    <div onClick={() => navigate("/")} className='flex items-center grayscale opacity-70 hover:grayscale-0 transition-all hover:opacity-100 cursor-pointer text-primary'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-current'>
                            <FontAwesomeIcon icon={faArrowLeft} className='text-neutral text-xl ' />
                        </div>
                        <div className=''>
                            <p className='text-current text-sm ml-2'>Back to home</p>
                        </div>
                    </div>
                    <div className="divider divider-vertical  before:bg-base-100 after:bg-base-100  grayscale opacity-70 hover:grayscale-0 transition-all hover:opacity-100"></div>
                    <h2 className=' text-base-100 grayscale opacity-70 hover:grayscale-0 transition-all hover:opacity-100 '>{detailCourse.name}</h2>
                </div>
                {/* End Of Navbar */}

                {/* Container For The Content */}
                <div className=' mx-auto px-8 text-base-100 py-4 flex flex-col lg:flex-row'>
                    <div className='basis-8/12 relative course-video'>
                        {/* Logic For displaying what content should be appear */}
                        {isQuizTime === true ?
                            <Quiz />
                            :
                            //    <YoutubeIframe videoId='2g811Eo7K8U'/>
                            <YoutubeIframe videoId={getVideoId(linkVideo)} />

                            // <iframe width="100%" height="500" src="https://www.youtube.com/embed/IxxstCcJlsc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        }
                        {/* Logic For Next Video Button */}
                        {/* {isQuizTime == false ?
                            <div className=' active:translate-y-1 opacity-0 absolute transition-all next-video bg-primary top-1/2 -right-10 py-3 px-2 cursor-pointer text-neutral-content grayscale opacity-70 hover:grayscale-0 transition-all hover:opacity-100 '>
                                <p className='font-bold'>Next Lesson</p>
                            </div>

                            : ""} */}
                    </div>
                    {/* Container For The Sidebar */}
                    <div className='basis-4/12 mt-8 lg:mt-0 px-0 lg:px-4 flex-grow'>
                        {/* Sidebar */}
                        <div className='bg-neutral flex-col h-full rounded-lg p-4 '>
                            {/* Header */}
                            <div className='flex items-center bg-primary p-2 rounded-lg grayscale opacity-70 hover:grayscale-0 transition-all hover:opacity-100 '>
                                <FontAwesomeIcon icon={faAngleDoubleRight} className='text-4xl text-neutral-content mr-2 ' />
                                <p className='text-neutral-content font-bold text-xl w-full text-center -ml-4'>Course Content</p>
                            </div>
                            {/* Request Counselling */}
                            <div className='flex justify-center my-4'>
                                <Link to={`/help/courses/${params.my_course_id}`} className='text-xs text-base-300 grayscale opacity-70 hover:grayscale-0 transition-all hover:opacity-100 '>Are you have a problem? <span className='text-primary underline decoration-solid'>Request Consultation</span></Link>
                            </div>
                            {/* Card Section Container*/}
                            <div className='rounded-lg my-3'>
                                <CollapsedContent
                                    changeState={setIsQuizTime}
                                    dataCourses={detailCourse}
                                />
                            </div>
                            {/* End Of Card Section Container*/}
                        </div>
                        {/* End Of Sidebar */}
                    </div>
                    {/* End Of Sidebar Container */}
                </div>
                {/* End Of Container For The Content */}
            </div>
            {/* End Of Pages */}
        </>
    )
}

export default Course