'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToPage1() {
  const router = useRouter();

  useEffect(() => {
    router.push('/pages/1');
  }, [router]);

  return null;
}
