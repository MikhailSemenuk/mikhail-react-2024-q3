export default function Loading() {
  return (
    <div className='d-flex align-items-center justify-content-around my-3' data-testid='Loading'>
      <strong className='me-3'>Loading...</strong>
      <div className='spinner-border ml-auto' role='status' aria-hidden='true' />
    </div>
  );
}
