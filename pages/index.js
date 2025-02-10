import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('https://support.atlassian.com/trello/docs/inviting-people-by-using-a-shareable-link/');
  }, [router]);

  return null; 
}