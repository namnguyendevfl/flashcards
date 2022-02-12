import { Deck } from "lib/global/types";
import React from "react";
import BreadCrumb from "../shared/BreadCrumb/BreadCrumb";
import DeckForm from "./DeckForm";

interface EditDeckProps {
    editedDeck: Deck;
    option: string;
};

export default function EditDeck(props: EditDeckProps) {
    const {
        editedDeck,
        option,
    } = props;
    
    //depending on the value of option, we can create or edit a deck
    const breadcrumb = option === "edit-deck" ? editedDeck : undefined;
    return (
        <div className = "container">
            <BreadCrumb deck = {breadcrumb}/>
            <DeckForm   option = "edit-deck" editedDeck = {editedDeck} />
        </div>
    )
}