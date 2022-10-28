/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from "react";
import PropTypes from 'prop-types';
import CardNoImage from "../CardNoImage/CardNoImage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faFlag } from "@fortawesome/free-solid-svg-icons";

const CollapsedContent = (props) => {
    const { dataCourses } = props;

    return (
        <>
            {
                // console.log(dataCourses.chapters)
                dataCourses.chapters?.map((elm, idx) => {
                    return (
                        <div key={idx} className="collapse w-full my-4 border rounded-box border-base-300 hover:border-primary collapse-arrow">
                            <input type="checkbox" />
                            <div className="collapse-title">
                                <p className='font-bold'>{elm.name}</p>
                                <p className='text-sm'>{elm.lessons.length} Videos</p>
                            </div>
                            <div className="collapse-content">
                                {/* The First Collapse Content Is Always The Resource Of The Section */}
                                <a href={elm.link_ppt} target="_blank" rel='noreferrer' title="Download The Resource For This Section" className=' p-1 border border-primary my-1 inline-block  grayscale opacity-70 hover:grayscale-0 transition-all hover:opacity-100'>
                                    <FontAwesomeIcon icon={faFileAlt} className='mx-1' />
                                    <span className='mx-1' >Resources</span>
                                </a>
                                {
                                    elm.lessons?.map((elm, idx) => {
                                        return (
                                            <CardNoImage
                                                key={idx}
                                                IsQuizTime={props.changeState}
                                                dataLessons={elm}
                                            />
                                        )
                                    })
                                }
                                {/* Quiz Card */}
                               
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

CollapsedContent.propTypes = {
    changeState: PropTypes.func
};
export default CollapsedContent