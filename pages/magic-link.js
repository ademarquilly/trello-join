import React, { useEffect, useState } from 'react';
export const key = '32fdG17bHvc2O9vZ';

const Join = () => {
  const [firstName, setFirstName] = useState('Antonin');
  const [boardName, setBoardName] = useState('Compta Somophors 24-25');
  const [membersCount, setMembersCount] = useState('7');
  const [tasksCount, setTasksCount] = useState('43');
  const [creationDate, setCreationDate] = useState('19/12/2024');
  const [isValidInvite, setIsValidInvite] = useState(true);
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const invite = searchParams.get('invite');
      if (invite !== key) {
        setIsValidInvite(false);
      } else {
        setFirstName(searchParams.get('owner') || 'Antonin');
        setBoardName(searchParams.get('board') || 'Compta Somophors 24-25');
        setMembersCount(searchParams.get('members') || '7');
        setTasksCount(searchParams.get('tasks') || '43');
        setCreationDate(searchParams.get('creation') || '19/12/2024');
      }
    }
  }, []);

  return (
    <div className="container">
      <img className='img-1' src='/bg-img1.png'/>
      <img className='img-2' src='/bg-img2.png'/>

      <article>
        <img className='logo' src='/trello-logo.png'/>
        {isValidInvite ? (
          <>
            <h1>{firstName} vous invite à rejoindre le tableau d'équipe :<br/></h1>
            <h3>{boardName}</h3>
            <p className='notice'>{membersCount} membres | {tasksCount} tâches | Créé le : {creationDate}</p>
            <button className="join-button" onClick={() => window.location.href = `/signup?invite=${key}&owner=${firstName}&board=${boardName}&members=${membersCount}&tasks=${tasksCount}&creation=${creationDate}`}>Rejoindre</button>
            <a target='_blank' className='login' href='https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3Fdisplay%3DeyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%253D%253D%26createMember%3Dtrue&display=eyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%3D%3D'>Déjà un compte Atlassian ? <span>Connectez-vous</span></a>
          </>
        ) : (
          <h1>Invitation invalide</h1>
        )}
        <hr/>
        <img className='logo footer' src='/atlassian-logo.png'/>
        <p className='notice footer'>One account for Trello, Jira, Confluence and <a href='https://support.atlassian.com/atlassian-account/docs/what-is-an-atlassian-account/' target="_blank">more</a></p>
        <p target='_blank' className='notice footer'>This site is protected by reCAPTCHA and the Google <a target='_blank' href='https://policies.google.com/privacy'>Privacy Policy</a> and <a target='_blank' href='https://policies.google.com/terms'>Terms of Service</a> apply.</p>
      </article>
    </div>
  );
};

export default Join;

//http://localhost:3000/magic-link?invite=32fdG17bHvc2O9vZ&owner=Antonin%20Bourard&board=Compta%20Semophors%2024-25&members=7&tasks=64&creation=19/12/2024