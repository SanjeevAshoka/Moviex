import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';
import notFound from '../404/NotFound';
import './searchResult.scss';
import { fetchDataFromApi } from '../../utils/api';


const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        setData(res); setPageNum((prev) => prev + 1); setLoading(false);
      }).catch((err) => {
        setLoading(false);
        console.log("Err at fetchInitialData: ", err);
      });
  }

  const fetchNextPageData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        if (data?.results) {
          setData({ ...data, results: [...data?.results, ...res.results] });
        } else {
          setData(res);
        }
        setLoading(false);
        setPageNum((prev) => prev + 1);
      }).catch((err) => {
        setLoading(false);
        console.log("Err at fetchNextPageData: ", err);
      });
  }
  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);
  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading && <ContentWrapper>
        {data?.results?.length > 0 ? (<>
          <div className="pageTitle">
            {`Search: ${data.total_results > 1 ? 'Results' : 'Result'} of ${query}`}
          </div>
          <InfiniteScroll
            className='content'
            dataLength={data?.results?.length || 0}
            next={fetchNextPageData}
            hasMore={pageNum <= data.total_pages}
            loader={<Spinner />}
          >
            {
              data?.results?.map((item, ind) => {
                if (item.media_type === 'person') return;
                return <MovieCard
                  key={ind} data={item} fromSearch={true}
                />
              })
            }
          </InfiniteScroll>
        </>) : <span className="resultNotFound">
          Result Not Found
        </span>}
      </ContentWrapper>}
    </div>
  )
}

export default SearchResult
