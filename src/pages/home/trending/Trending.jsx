import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

const Trending = () => {

    const [endPoint, setEndPoint] = useState('day');
    const { data = {}, loading } = useFetch(`/trending/all/${endPoint}`);
    const onTabChange = (tab = 'day', index) => {
        setEndPoint(tab?.toLowerCase());
    }
    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">
                    Trending
                </span>
                <SwitchTabs data={['day', 'month', 'week']} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} />
        </div>
    )
}

export default Trending
