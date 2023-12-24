import React, { useState } from "react";
import "./videoSection.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import LazyLoad from '../../../components/lazyLoading/LazyLoad';
import { PlayIcon } from "../detailsBanner/Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const VideosSection = ({ data = {}, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };


    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.results && data?.results?.length > 0 && data.results.map((item) => {
                            return (<div className="videoItem"
                                key={item.id} onClick={() => { setVideoId(item.key); setShow(true); }}>
                                <div className="videoThumbnail">
                                    {/* <LazyLoad src= {`https://img.youtube.com/vi/${item.key}/default.jpg`} className={"img"}/> */}
                                    <img src={`https://img.youtube.com/vi/${item.key}/default.jpg`} />
                                    <PlayIcon />
                                </div>
                                <div className="videoTitle">{item.name}</div>
                            </div>)
                        })}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;