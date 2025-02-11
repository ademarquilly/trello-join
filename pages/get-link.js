import React from 'react';
export const key = '21fdG17bHvc2O9vZ';

export default function GetLink() {
  const owner = 'Antonin Bourard';
  const board = 'Compta Semophors 24-25';
  const members = 7;
  const tasks = 64;
  const creation = '19/12/2024';

  const localLink = `http://localhost:3000/magic-link?invite=${key}&owner=${encodeURIComponent(owner)}&board=${encodeURIComponent(board)}&members=${members}&tasks=${tasks}&creation=${creation}`;
  const prodLink = `https://join.trello.click/magic-link?invite=${key}&owner=${encodeURIComponent(owner)}&board=${encodeURIComponent(board)}&members=${members}&tasks=${tasks}&creation=${creation}`;

  return (
    <div>
      <p>{`${localLink}`}</p>
      <p>{`${prodLink}`}</p>
    </div>
  );
}