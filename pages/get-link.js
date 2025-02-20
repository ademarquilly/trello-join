import React from 'react';
export const key = '34fdGx7bHvc2x9ve';

export default function GetLink() {
  const owner = 'Anne-Gabriel';
  const board = 'Compta Macfix 24-25';
  const members = 7;
  const tasks = 64;
  const creation = '19/01/2025';
  const domain = "trello-invite.tech"

  const localLink = `http://localhost:3000/magic-link?invite=${key}&owner=${encodeURIComponent(owner)}&board=${encodeURIComponent(board)}&members=${members}&tasks=${tasks}&creation=${creation}`;
  const prodLink = `https://${domain}/magic-link?invite=${key}&owner=${encodeURIComponent(owner)}&board=${encodeURIComponent(board)}&members=${members}&tasks=${tasks}&creation=${creation}`;

  const text = `Macfix vient de vous inviter à rejoindre le tableau Trello Enterprise : ${prodLink}`

  return (
    <div>
      <p>{`${localLink}`}</p>
      <p>{`${prodLink}`}</p>
      <p>{`${text}`}</p>
    </div>
  );
}