import { render, screen, act, waitFor } from '@testing-library/react';
import { CharacterProvider, useCharacterContext } from '@/components/CharacterContext';
import { Character } from '@/types';
import { singleCharacter } from '@/tests/testData';

const mockCharacter: Character = singleCharacter;

const TestComponent = () => {
  const { selectedCards, toggleCard, isCardCheckedId, deselectAllCards, isCardChecked } = useCharacterContext();

  return (
    <div>
      <button onClick={() => toggleCard(mockCharacter)}>Toggle Card</button>
      <button onClick={deselectAllCards}>Deselect All Cards</button>
      <div data-testid='selected-cards'>
        {selectedCards.map((card) => (
          <div key={card.id}>{card.name}</div>
        ))}
      </div>
      <div data-testid='is-card-checked-id'>{isCardCheckedId(mockCharacter.id) ? 'Checked' : 'Not Checked'}</div>
      <div data-testid='is-card-checked'>{isCardChecked(mockCharacter) ? 'Checked' : 'Not Checked'}</div>
    </div>
  );
};

describe('CharacterContext', () => {
  it('provides and updates context values correctly', async () => {
    render(
      <CharacterProvider>
        <TestComponent />
      </CharacterProvider>,
    );

    expect(screen.getByTestId('selected-cards')).toBeEmptyDOMElement();
    expect(screen.getByTestId('is-card-checked-id')).toHaveTextContent('Not Checked');
    expect(screen.getByTestId('is-card-checked')).toHaveTextContent('Not Checked');

    act(() => {
      screen.getByText('Toggle Card').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('selected-cards')).toHaveTextContent(mockCharacter.name);
      expect(screen.getByTestId('is-card-checked-id')).toHaveTextContent('Checked');
      expect(screen.getByTestId('is-card-checked')).toHaveTextContent('Checked');
    });

    act(() => {
      screen.getByText('Deselect All Cards').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('selected-cards')).toBeEmptyDOMElement();
      expect(screen.getByTestId('is-card-checked-id')).toHaveTextContent('Not Checked');
      expect(screen.getByTestId('is-card-checked')).toHaveTextContent('Not Checked');
    });
  });
});
