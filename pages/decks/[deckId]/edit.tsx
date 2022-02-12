import { EditDeck } from "@/components/decks";
import { selectDeckById } from "helpers/client/decks/decksSlice";
import { useRouter } from "next/router";
import React from "react";
import { useAppSelector } from "redux/hooks";

export default function EditDeckPage() {
    const router = useRouter();
    const { query: { deckId, cardId }} = router;
    const deck = useAppSelector<any>(state => selectDeckById(state, Number(deckId)));
    //Using this to prevent prerendered error when deploying the app
    return (deck 
        ?   <EditDeck editedDeck={deck} option="edit-deck" />
        :   <></>
        )
}