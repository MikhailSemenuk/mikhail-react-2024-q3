import whereIAm from '@/libs/whereIAm';

export default function Home() {
  whereIAm('Home');

  return (
    <div>
      <div className='d-flex'>
        <div className='flex-grow-1'>
          <h1 className='text-center mt-2'>Characters from Rick and Morty</h1>
          <div className='d-flex flex-column align-items-center'>Left panel</div>
        </div>
        <div>Right panel</div>
      </div>
      <div>Bottom panel</div>
    </div>
  );
}
