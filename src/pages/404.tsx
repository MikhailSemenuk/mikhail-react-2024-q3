import Link from 'next/link';

export default function Custom404() {
  return (
    <div className='page mt-2' data-testid='Page404'>
      <h1>Page 404</h1>
      <p className='fs-5'>
        Return to the{' '}
        <Link href='/page/1' className='link-body-emphasis'>
          Homepage
        </Link>
        .
      </p>
    </div>
  );
}
