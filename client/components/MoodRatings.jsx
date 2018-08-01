import React from 'react';

function MoodRatings({ movie, moods, reviewCount }) {
  return (
    <div className="columns">
      <div className="column" style={{ textAlign: 'center' }}>
        <progress
          className="progress is-success"
          value={`${movie[moods[0]]}`}
          max={reviewCount}
        />
        {Math.floor((movie[moods[0]] / reviewCount) * 100) +
          '% of users rated this movie ' +
          moods[0]}
      </div>
      <div className="column" style={{ textAlign: 'center' }}>
        {moods.length > 1 ? (
          <progress
            className="progress is-primary"
            value={`${movie[moods[1]]}`}
            max={reviewCount}
          />
        ) : (
          <div />
        )}
        {Math.floor((movie[moods[1]] / reviewCount) * 100) +
          '% of users rated this movie ' +
          moods[1]}
      </div>
      <div className="column" style={{ textAlign: 'center' }}>
        {moods.length > 2 ? (
          <progress
            className="progress is-warning"
            value={`${movie[moods[2]]}`}
            max={reviewCount}
          />
        ) : (
          <div />
        )}
        {Math.floor((movie[moods[2]] / reviewCount) * 100) +
          '% of users rated this movie ' +
          moods[2]}
      </div>
    </div>
  );
}

export default MoodRatings;
