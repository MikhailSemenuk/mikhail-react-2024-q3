import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='page mt-2' data-testid='Page404'>
      <h1>Page 404</h1>
      <p className='fs-5'>
        Return to the{' '}
        <Link href='/pages/1' className='link-body-emphasis'>
          Homepage
        </Link>
        .
      </p>
    </div>
  );
}
