import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PosterFallback from "../../assets/no-poster.png";
import LazyLoad from "../lazyLoading/LazyLoad";
import "./movieCard.scss";
import CircleRating from "../circleRating/Rating";
import Genres from "../generes/Genre";

const MovieCard = ({ data = {}, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home ?? {});
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <LazyLoad className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data?.vote_average.toFixed(1)} />
                        <Genres data={data?.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data?.title || data?.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;