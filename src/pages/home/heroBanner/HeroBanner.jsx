import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import './herobanner.scss';
import LazyLoad from '../../../components/lazyLoading/LazyLoad';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';


const HeroBanner = () => {
    const [query, setQuery] = useState('');
    const [background, setBackground] = useState('');
    const { url } = useSelector(state => state.home ?? {});
    const { data = {}, loading, error } = useFetch('/movie/upcoming');
    const navigate = useNavigate();
    const searchQueryHandler = (event) => {
        if (event.key === 'Enter' && query.length !== 0) {
            navigate(`/search/${query}`);
        }
    }
    const handleSearch = (e) => {
        navigate(`/search/${query}`);
    }
    useEffect(() => {
        const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg)
    }, [data]);
    return (
        <div className='heroBanner'>
            {!loading && <div className="backdrop-img">
                <LazyLoad src={background} />
            </div>}
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className='title'>Welcome</span>
                    <span className="subTitle">Millions of Movie,
                        TV Shows and people to discover. Explore now</span>
                    <div className="searchInput">
                        <input type="text" placeholder='Search for movie or Tv Shows..'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler} />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner
