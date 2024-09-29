// @ts-nocheck

import type { IAdaptiveCard } from "adaptivecards";

export const orderFoodCard: IAdaptiveCard = {
  $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
  type: "AdaptiveCard",
  version: "1.6",
  body: [
    {
      type: "TextBlock",
      text: "Your registration is almost complete",
      size: "medium",
      weight: "bolder",
      wrap: true,
      style: "heading",
    },
    {
      type: "TextBlock",
      text: "What type of food do you prefer?",
      wrap: true,
    },
    {
      type: "ImageSet",
      images: [
        {
          type: "Image",
          url: "https://loremflickr.com/320/240/steak,dinner",
          altText: "Steak",
          size: "medium",
        },
        {
          type: "Image",
          url: "https://loremflickr.com/320/240/chicken,plate,dinner",
          altText: "Chicken",
          size: "medium",
        },
        {
          type: "Image",
          url: "https://loremflickr.com/320/240/tofu,plate,food",
          altText: "Tofu",
          size: "medium",
        },
      ],
    },
  ],
  actions: [
    {
      type: "Action.ShowCard",
      title: "Steak",
      card: {
        type: "AdaptiveCard",
        body: [
          {
            type: "Input.ChoiceSet",
            id: "SteakTemp",
            style: "expanded",
            label: "How would you like your steak prepared?",
            isRequired: true,
            errorMessage: "Please select one of the above options",
            choices: [
              {
                title: "Rare",
                value: "rare",
              },
              {
                title: "Medium-Rare",
                value: "medium-rare",
              },
              {
                title: "Well-done",
                value: "well-done",
              },
            ],
          },
          {
            type: "Input.Text",
            id: "SteakOther",
            isMultiline: true,
            label: "Any other preparation requests?",
          },
        ],
        actions: [
          {
            id: "Submit",
            type: "Action.Submit",
            title: "OK",
            data: {
              FoodChoice: "Steak",
            },
          },
        ],
        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      },
    },
    {
      type: "Action.ShowCard",
      title: "Chicken",
      card: {
        type: "AdaptiveCard",
        body: [
          {
            type: "Input.Toggle",
            id: "ChickenAllergy",
            valueOn: "noPeanuts",
            valueOff: "peanuts",
            title: "I'm allergic to peanuts",
            label: "Do you have any allergies?",
          },
          {
            type: "Input.Text",
            id: "ChickenOther",
            isMultiline: true,
            label: "Any other preparation requests?",
          },
        ],
        actions: [
          {
            id: "Submit",
            type: "Action.Submit",
            title: "OK",
            data: {
              FoodChoice: "Chicken",
            },
          },
        ],
        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      },
    },
    {
      type: "Action.ShowCard",
      title: "Tofu",
      card: {
        type: "AdaptiveCard",
        body: [
          {
            type: "Input.Toggle",
            id: "Vegetarian",
            title: "Please prepare it vegan",
            label: "Would you like it prepared vegan?",
            valueOn: "vegan",
            valueOff: "notVegan",
          },
          {
            type: "Input.Text",
            id: "VegOther",
            isMultiline: true,
            label: "Any other preparation requests?",
          },
        ],
        actions: [
          {
            id: "Submit",
            type: "Action.Submit",
            title: "OK",
            data: {
              FoodChoice: "Vegetarian",
            },
          },
        ],
        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      },
    },
  ],
};
