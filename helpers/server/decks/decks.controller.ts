import { Request, Response } from 'express';
import { service } from "./decks.service";
import { asyncErrorBoundary } from '../errors';
import { dbToFrontConverter, front2DbConverter } from '../utils';
import { Card } from 'lib/global/types';

interface DeckDb {
    deck_id: string;
    name: string;
    description: string;
    user_id: string;
    cards: Card[];
}

const listDecks = async (req: Request, res: Response) => {
    const { cards } = res.locals
    const { userId } = req.query;
    const decksDb = await service.list(Number(userId))
    let returnedDecks: DeckDb[] = [];
    decksDb.forEach((deck: DeckDb) => {
        const deckConverted = dbToFrontConverter(deck)
        // deckConverted.cards = cards.filter((card: Card) => card.deckId === deckConverted.id)
        returnedDecks.push(deckConverted);
    })
    return res.json({ data: returnedDecks});
};

const create = async (req: Request, res: Response) => {
    const deckInDbForm = front2DbConverter(req.body.data)
    const response = await service.create(deckInDbForm);
    const returnedDeck = {...response[0], id: response[0].deck_id};
	return res.status(200).json({ data: returnedDeck});
};

const update = async (req: Request, res: Response) => {
	const response = await service.update(req.body.data.deck_id, req.body.data);
    const returnedDeck = {...response[0], id: response[0].deck_id}
	return res.status(200).json({ data: returnedDeck});
};

const _delete = async (req: Request, res: Response) => {
    const { deckId } = req.query;
    await service._delete(Number(deckId));
    res.status(200).json({ data: { status: "deleted" } });
};

export const decksController = {
    create: [asyncErrorBoundary(create)],
    list: [asyncErrorBoundary(listDecks)],
    update: [asyncErrorBoundary(update)],
    _delete: [asyncErrorBoundary(_delete)]
};



