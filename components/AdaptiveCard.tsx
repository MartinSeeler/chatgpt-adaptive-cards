import * as React from "react";
import * as AdaptiveCards from "adaptivecards";
import type { IAdaptiveCard } from "adaptivecards/lib/schema";

export type AdaptiveCardProps = {
  card: IAdaptiveCard;
};

const AdaptiveCard = ({ card }: AdaptiveCardProps) => {
  const cardWrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!cardWrapperRef || !card) return;

    const adaptiveCard = new AdaptiveCards.AdaptiveCard();
    adaptiveCard.parse(card);

    if (cardWrapperRef.current) {
      cardWrapperRef.current.innerHTML = "";
      adaptiveCard.render(cardWrapperRef.current);
    }
  }, [card, cardWrapperRef]);

  return <div ref={cardWrapperRef} />;
};

export default AdaptiveCard;
