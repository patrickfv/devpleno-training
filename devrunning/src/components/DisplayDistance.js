import React from 'react';

export default function({ distance, metric='kilometers' }) {
  let pad = 'km';
  if(metric === 'miles') {
    pad = 'mi';
    distance = Math.floor(distance * 0.621371);
  }
  // 1km = 0,621371mi
  // miles or kilometers
  
  distance = `${distance}${pad}`;
  return (
    <span>{ distance }</span>
  );
}
