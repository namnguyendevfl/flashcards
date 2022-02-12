import { fetchWrapper } from "helpers/client";
import { Deck , Signal } from "lib/global/types";

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const { NEXTJS_API_BASE_URL } = publicRuntimeConfig;

function stripCards(deck: Deck) {
  const { cards, ...deckWithoutCards } = deck;
  return deckWithoutCards;
}

function stripId(deck: Deck) {
  const { id, ...deckWithoutId } = deck;
  return deckWithoutId;
}

// const API_BASE_URL = process.env.NEXTJS_API_BASE_URL;

async function listDecks(userId: string, signal: Signal) {
    const url = `${NEXTJS_API_BASE_URL}/${userId}/decks`;
    return await fetchWrapper.get(url, signal);
  }
  
async function create(deck: Deck, signal: Signal) {
    const url = `${NEXTJS_API_BASE_URL}/${deck.userId}/decks/new`;
    const body = stripCards(deck)
    return await fetchWrapper.post(url, body, signal);
  }
  
async function update(updatedDeck: Deck, signal: Signal) {
    const url = `${NEXTJS_API_BASE_URL}/${updatedDeck.userId}/decks/${updatedDeck.deckId}/edit`;
    const body = stripId(updatedDeck);
    return await fetchWrapper.put(url, body, signal);
  }
  
async function _delete(userId: string, deckId: string, signal: Signal) {
    const url = `${NEXTJS_API_BASE_URL}/${userId}/decks/${deckId}/delete`;
    return await fetchWrapper.delete(url, signal);
  }

export const deckAPICalls = {
    listDecks,
    create,
    update,
    _delete
};