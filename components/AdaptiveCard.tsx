import * as React from "react";
import * as AdaptiveCards from "adaptivecards";
import type { IAdaptiveCard } from "adaptivecards/lib/schema";

export type AdaptiveCardProps = {
  card: IAdaptiveCard;
  onAction?: (actionType: string, data: string) => void;
};

const AdaptiveCard = ({ card, onAction }: AdaptiveCardProps) => {
  const cardWrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!cardWrapperRef || !card) return;

    const adaptiveCard = new AdaptiveCards.AdaptiveCard();
    adaptiveCard.parse(card);

    // Set up the onExecuteAction handler
    adaptiveCard.onExecuteAction = (action) => {
      if (onAction) {
        // Handle Submit and OpenUrl actions
        if (action instanceof AdaptiveCards.SubmitAction) {
          onAction("submit", action.data ? JSON.stringify(action.data) : "");
        } else {
          // For other action types (like ShowCard)
          onAction("other", action ? JSON.stringify(action) : "");
        }
      }
    };

    if (cardWrapperRef.current) {
      cardWrapperRef.current.innerHTML = "";
      adaptiveCard.render(cardWrapperRef.current);
    }
  }, [card, cardWrapperRef, onAction]);

  return <div ref={cardWrapperRef} />;
};

export default AdaptiveCard;
