import React from 'react';
import { useSelector } from 'react-redux';
import './genre.scss';

const Genre = ({ data = [] }) => {
  const { genres } = useSelector(appState => appState.home || {});
  return (
    <div className='genres'>
      {data.map((g) => {
        if (!genres[g].name) return;
        return (<div className='genre' key={g}>
          {genres[g]?.name}
        </div>)
      })}
    </div>
  )
}

export default Genre
