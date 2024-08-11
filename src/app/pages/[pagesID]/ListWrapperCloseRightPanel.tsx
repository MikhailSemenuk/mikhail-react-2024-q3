'use client';
import { changePagesURL } from '@/libs/changePagesURL';
import { PageSearchDetailURL } from '@/types';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
  urlData: PageSearchDetailURL;
}

export default function ListWrapperCloseRightPanel({ children, urlData }: LayoutProps) {
  const router = useRouter();

  const handleCloseRightPanel = () => {
    if (urlData.detailId) {
      const urlDataUpdate = { ...urlData };
      urlDataUpdate.detailId = undefined;
      changePagesURL(router, urlDataUpdate);
    }
  };

  return (
    <>
      <div className='d-flex flex-column align-items-center' onClick={handleCloseRightPanel}>
        {children}
      </div>
    </>
  );
}
