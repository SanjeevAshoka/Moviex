import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Popular = () => {

    const [endPoint, setEndPoint] = useState('movie');
    const { data = {}, loading } = useFetch(`/${endPoint}/popular`);
    const onTabChange = (tab, index) => {
        setEndPoint(tab === 'Movies' ? 'movie' : 'tv');
    }
    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">
                    Popular
                </span>
                <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} media_type={endPoint} />
        </div>
    )
}

export default Popular
