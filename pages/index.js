import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('https://phenixconcilium.fr/');
  }, [router]);

  return null;
} 