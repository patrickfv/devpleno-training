import React from 'react';

export default function({ time }) {
  var minutes = parseInt(time / 60);
  var seconds = time % 60; // time - minutes * 60
  const strPadLeft = (str, pad, length) => (new Array(length+1).join(pad)+str).slice(-length);

  minutes = strPadLeft(minutes, '0', 2);
  seconds = strPadLeft(seconds, '0', 2);

  return (
    <span>{ minutes }:{ seconds }</span>
  );
}