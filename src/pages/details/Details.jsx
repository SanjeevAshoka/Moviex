import React from 'react';
import { useParams } from 'react-router-dom';
import './details.scss';
import useFetch from '../../hooks/useFetch';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideosSection from './videoSection/VideoSection';
import Similar from './carouselsDetails/Similar';
import Recommendation from './carouselsDetails/Recommendation';

const Details = () => {
  const {media, id} = useParams();
  const {data={}, loading} = useFetch(`/${media}/${id}/videos`);
  const {data: credits, loading: creditsLoading} = useFetch(`/${media}/${id}/credits`)
  return (
    <div>
      <DetailsBanner video = {data?.results?.[0]} crew={credits?.crew}/>
      <Cast data = {credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading ={loading}/>
      <Similar mediaType={media} id={id}/>
      <Recommendation mediaType={media} id={id}/>
    </div>
  )
}

export default Details
