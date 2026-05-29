import { createContext, useContext, useState, ReactNode } from 'react';
import { CardType } from '@/components/Card';

type CardsContextType = {
    cards: CardType[];
    addCard: (card: CardType) => void;
    deleteCard: (id: string) => void;
    updateCard: (card: CardType) => void;
};

const CardsContext =
    createContext({} as CardsContextType);

export function CardsProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [cards, setCards] =
        useState<CardType[]>([]);

    function addCard(card: CardType) {
        setCards((old) => [card, ...old]);
    }

    function deleteCard(id: string) {
        setCards((old) =>
            old.filter((item) => item.id !== id)
        );
    }

    function updateCard(card: CardType) {
        setCards((old) =>
            old.map((item) =>
                item.id === card.id ? card : item
            )
        );
    }

    return (
        <CardsContext.Provider
            value={{
                cards,
                addCard,
                deleteCard,
                updateCard,
            }}
        >
            {children}
        </CardsContext.Provider>
    );
}

export function useCards() {
    return useContext(CardsContext);
}