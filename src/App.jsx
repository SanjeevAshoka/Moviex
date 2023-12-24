import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import NotFound from './pages/404/NotFound';
import Explore from './pages/explore/Explore';
import Details from './pages/details/Details';
import Home from './pages/home/Home';
import SearchResult from './pages/search/SearchResult';
import { fetchDataFromApi } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';

function App() {
  const dispatch = useDispatch();

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration').then(res => {
      const url = {
        backdrop: res?.images?.secure_base_url + 'original',
        poster: res?.images?.secure_base_url + 'original',
        profile: res?.images?.secure_base_url + 'original'
      }
      dispatch(getApiConfiguration(url));
    }).catch
  }
  const generesCall = () => {
    const tvDataPr = fetchDataFromApi('/genre/tv/list')
    const movieDataPr = fetchDataFromApi('/genre/movie/list');
    const allGenre = {};
    Promise.all([tvDataPr, movieDataPr]).then(([tvData, movieData]) => {
      tvData.genres.map((item) => (allGenre[item.id] = item));
      movieData.genres.map((item) => (allGenre[item.id] = item));
      dispatch(getGenres(allGenre));
    })
  }
  useEffect(() => { fetchApiConfig(); generesCall(); }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:media/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
