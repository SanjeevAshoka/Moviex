
import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import LazyLoad from "../lazyLoading/LazyLoad";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import PosterFallback from "../../assets/no-poster.png";
import "./carousel.scss";
import CircleRating from "../circleRating/Rating";
import Genre from "../generes/Genre";

const Carousel = ({ data = [], loading, media_type, title = "" }) => {
    const carouselContainer = useRef();
    const navigate = useNavigate();
    const { url } = useSelector(appState => appState.home || {});
    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount = dir === 'left' ?
            container.scrollLeft - (container.offsetWidth + 20) :
            container.scrollLeft + (container.offsetWidth + 20);
        container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
    const skItem = () => {
        return <div className="skeletonItem">
            <siv className="posterBlock skeleton">
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </siv>
        </div>
    }
    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow"
                    onClick={() => navigation('left')} />
                <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={() => navigation('right')} />
                {
                    !loading ? (
                        <div className="carouselItems" ref={carouselContainer}>
                            {data?.map((item) => {
                                return (
                                    <div key={item.id} className="carouselItem"
                                        onClick={() => { navigate(`/${media_type ? media_type : item?.media_type}/${item.id}`) }}>
                                        <div className="posterBlock">
                                            <LazyLoad
                                                src={item.backdrop_path ? url.poster + item.backdrop_path : PosterFallback}
                                            />
                                            <CircleRating rating={item.vote_average.toFixed(1)} />
                                            <Genre data={item.genre_ids.slice(0, 2)} />
                                        </div>
                                        <div className="textBlock">
                                            <span className="title">
                                                {item.title || item.name}
                                            </span>
                                            <span className="date">
                                                {dayjs(item.release_date).format('MMM D, YYYY')}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="loadingSkeleton">
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    )
                }
            </ContentWrapper>
        </div>
    )
}

export default Carousel
