import { render, screen, fireEvent } from '@testing-library/react';

import { downloadAsCSV } from '@/libs/downloadAsCSV';
import { singleCharacterArray } from '@/tests/testData';
import { useCharacterContext } from '@/components/CharacterContext';
import { BottomPanel } from '@/components/BottomPanel';
import { useTheme } from '@/hooks/useTheme';

// Mocking the hooks and libraries
jest.mock('@/hooks/useTheme', () => ({
  useTheme: jest.fn(),
}));

jest.mock('@/libs/downloadAsCSV');

jest.mock('@/components/CharacterContext', () => ({
  useCharacterContext: jest.fn(),
}));

describe('BottomPanel', () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({ darkTheme: false });
    (useCharacterContext as jest.Mock).mockReturnValue({
      selectedCards: singleCharacterArray,
      deselectAllCards: jest.fn(),
    });
  });

  it('renders correctly with selected cards', () => {
    render(<BottomPanel />);

    expect(screen.getByText(/1 item is selected/i)).toBeInTheDocument();
  });

  it('calls deselectAllCards when "Unselect all" button is clicked', () => {
    const mockDeselectAllCards = jest.fn();
    (useCharacterContext as jest.Mock).mockReturnValue({
      selectedCards: singleCharacterArray,
      deselectAllCards: mockDeselectAllCards,
    });

    render(<BottomPanel />);

    const unselectButton = screen.getByText(/unselect all/i);
    fireEvent.click(unselectButton);

    expect(mockDeselectAllCards).toHaveBeenCalled();
  });

  it('calls downloadAsCSV when "Download" button is clicked', () => {
    render(<BottomPanel />);

    const downloadButton = screen.getByText(/download/i);
    fireEvent.click(downloadButton);

    expect(downloadAsCSV).toHaveBeenCalledWith(singleCharacterArray);
  });

  it('renders buttons with correct classes based on theme', () => {
    (useTheme as jest.Mock).mockReturnValue({ darkTheme: true });

    render(<BottomPanel />);

    const unselectButton = screen.getByText(/unselect all/i);
    const downloadButton = screen.getByText(/download/i);

    expect(unselectButton).toHaveClass('btn-outline-warning');
    expect(downloadButton).toHaveClass('btn-outline-primary');
  });
});
