import { NotEnoughCards } from "@/components/decks";
import BreadCrumb from "@/components/shared/BreadCrumb/BreadCrumb";
import { selectCards, selectFilteredCards } from "helpers/client/cards/cardsSlice";
import { saveDeckSelected, selectDeckById } from "helpers/client/decks/decksSlice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function StudyDeck() {
    // redux
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { query: { deckId }} = router;
    const deck = useAppSelector<any>(state => selectDeckById(state, Number(deckId)));
    useEffect(() => {
        dispatch(saveDeckSelected(deck));
      },[deckId]);
    const cards = useAppSelector<any>(state => selectFilteredCards(state))
    const name = deck && deck.name;
    //react
    const [nextBtnVisible, setNextBtnVisible] = useState(false);
    const [cardIdx, setCardIdx] = useState(1);
    const handleCarNum = () => {
        setNextBtnVisible(() => false);
        setCardIdx(() => cardIdx+1);
        if (cards && cardIdx === cards.length) {
            const message = `
            Restart cards?
    
            Click 'cancel' to return the home page`;

            const confirm = window.confirm(message);
            if (confirm === false) {
                setCardIdx(() => 1);
                router.push('/');
            }
            else {
                setCardIdx(() => 1);
            };
        };
    };
    const [front, setFront] = useState(true);
    const handleFlip = () => {
        setFront(() => !front);
        setNextBtnVisible(() => true);
    }
    return (cards 
    ? <div >
        <BreadCrumb deck = {deck}/>
        <div>
            <h2 className ="text-dark py-3">{name}: Study</h2> 
        </div>
        <div className = "container border border-secondary p-2 my-2"> 
            {cards.length < 3
                ? <NotEnoughCards deck = {deck} cards = {cards}/>
                : <div>
                    <h5>Card {cardIdx} of {cards.length}</h5>  
                        <div>
                            {front===true 
                            ? <p>{cards[cardIdx-1].front}</p>
                            : <p>{cards[cardIdx-1].back}</p>}
                        </div>       
                        <div className = "row w-100 ">
                            <div className ="col"> 
                                <button onClick = {handleFlip} className ="me-2 btn btn-secondary">
                                    Flip
                                </button>
                        
                                { nextBtnVisible === true
                                ? <button onClick = {handleCarNum} className ="btn btn-primary">
                                    Next
                                </button>
                                : <> </>}
                            </div> 
                        </div>
                </div>
            }
        </div>
    </div>
    :<></>
    )
}

    