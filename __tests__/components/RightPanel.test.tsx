import { render, screen, fireEvent } from '@testing-library/react';
import RightPanel from '@/components/RightPanel';
import { useRouter } from 'next/navigation';
import { changePagesURL } from '@/libs/changePagesURL';
import { singleCharacter } from '../data/testData';
import { CharacterProvider } from '@/components/CharacterContext'; // Import your actual provider

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/libs/changePagesURL', () => ({
  changePagesURL: jest.fn(),
}));

describe('RightPanel', () => {
  const mockChangePagesURL = changePagesURL as jest.MockedFunction<typeof changePagesURL>;
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

  const character = singleCharacter;
  const urlData = { search: '', page: 1, detailId: undefined };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
    } as unknown as ReturnType<typeof useRouter>);
  });

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<CharacterProvider>{ui}</CharacterProvider>);
  };

  it('renders RightPanel with CharacterCard when isShowRightPanel is true and character is defined', () => {
    renderWithProvider(<RightPanel character={character} isShowRightPanel={true} urlData={urlData} />);

    expect(screen.getByTestId('right-panel')).toBeInTheDocument();
    expect(screen.getByText(character.name)).toBeInTheDocument();
  });

  it('does not render RightPanel when isShowRightPanel is false', () => {
    renderWithProvider(<RightPanel character={character} isShowRightPanel={false} urlData={urlData} />);

    expect(screen.queryByTestId('right-panel')).toBeNull();
  });

  it('does not render RightPanel when character is undefined', () => {
    renderWithProvider(<RightPanel character={undefined} isShowRightPanel={true} urlData={urlData} />);

    expect(screen.queryByTestId('right-panel')).toBeNull();
  });

  it('calls changePagesURL with updated URL data when handleClose is called', () => {
    renderWithProvider(<RightPanel character={character} isShowRightPanel={true} urlData={urlData} />);

    // Simulate a close event by clicking on the close button inside CharacterCard
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(mockChangePagesURL).toHaveBeenCalledWith(expect.any(Object), {
      search: '',
      page: 1,
      detailId: undefined,
    });
  });
});
