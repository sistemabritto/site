import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ClaudeCodeRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/evonexus');
  }, [router]);

  return null;
}
