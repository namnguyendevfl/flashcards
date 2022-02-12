import React from "react";
import BreadCrumb from "../shared/BreadCrumb/BreadCrumb";
import DeckForm from "./DeckForm";
interface CreateDeckProps {
    option: string;
}
export default function CreateDeck({option}: CreateDeckProps) {
    return (
        <div className = "container">
            <div>
                <BreadCrumb />
            </div>
            <div>
                <DeckForm option = "create-deck"  />
            </div>
        </div>
    )
}