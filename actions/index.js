export const RECEIVE_DECKS = 'RECEIVE DECKS';
export const ADD_DECK = 'ADD DECK';
export const DELETE_DECK = 'DELETE DECK';
export const ADD_CARD = 'ADD CARD';

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function deleteDeck (key) {
  return {
    type: DELETE_DECK,
    key,
  };
}

export function addCard (deckTitle, card) {
  return {
    type: ADD_CARD,
    deckTitle,
    card,
  };
}
