import { ConfirmOrderCardTemplate } from "./index";
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
            id: "SteakOtherRequest",
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
              SelectedMeal: "Steak",
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
            id: "ChickenAllergyInfo",
            valueOn: "noPeanuts",
            valueOff: "peanuts",
            title: "I'm allergic to peanuts",
            label: "Do you have any allergies?",
          },
          {
            type: "Input.Text",
            id: "ChickenOtherRequest",
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
              SelectedMeal: "Chicken",
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
              SelectedMeal: "Tofu",
            },
          },
        ],
        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      },
    },
  ],
};

export type ConfirmOrderCardTemplateProps = {
  customer: {
    firstName: string;
    lastName: string;
    address: string;
  };
  order: {
    meal: string;
    notes?: string;
  };
};

export const confirmOrderCardTemplate = (
  props: ConfirmOrderCardTemplateProps
) =>
  ({
    type: "AdaptiveCard",
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    version: "1.6",
    body: [
      {
        type: "TextBlock",
        text: "Please confirm your order",
        wrap: true,
        style: "heading",
      },
      {
        type: "FactSet",
        facts: [
          {
            title: "Name",
            value: `${props.customer?.firstName ?? "Unknown"} ${
              props.customer?.lastName ?? "Unknown"
            }`,
          },
          {
            title: "Address",
            value: props.customer?.address ?? "Unknown",
          },
          {
            title: "Meal",
            value: props.order?.meal ?? "Unknown",
          },
          {
            title: "Additional Notes",
            value: props.order?.notes ?? "None",
          },
        ],
      },
    ],
    actions: [
      {
        id: "confirm",
        type: "Action.Submit",
        title: "Order Now",
        data: "confirm",
      },
      {
        id: "change meal",
        type: "Action.Submit",
        title: "Edit Meal",
        data: "wrong meal",
      },
      {
        id: "change personal data",
        type: "Action.Submit",
        title: "Edit Personal Data",
        data: "personal data incorrect",
      },
    ],
  }) as IAdaptiveCard;

export const personalInfoCard: IAdaptiveCard = {
  $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
  type: "AdaptiveCard",
  version: "1.6",
  body: [
    {
      type: "TextBlock",
      text: "Personal Informations",
      weight: "bolder",
      size: "medium",
      style: "heading",
    },
    {
      type: "TextBlock",
      text: "Please share your name and address for the delivery.",
      isSubtle: true,
      size: "small",
    },
    {
      type: "Input.Text",
      label: "First Name",
      id: "firstname",
      regex: "^[A-Z][a-z]+, [A-Z][a-z]+$",
      errorMessage: "Please enter your first name in the specified format",
      isRequired: true,
    },
    {
      type: "Input.Text",
      label: "Last Name",
      id: "lastname",
      regex: "^[A-Z][a-z]+, [A-Z][a-z]+$",
      errorMessage: "Please enter your last name in the specified format",
      isRequired: true,
    },
    {
      type: "Input.Text",
      label: "Address",
      id: "address",
      errorMessage: "Please enter your address",
      isRequired: true,
    },
    {
      type: "Input.Text",
      id: "telephone",
      label: "Phone Number (xxx-xxx-xxxx)",
      validation: "^[0-9]{3}-[0-9]{3}-[0-9]{4}$",
      error:
        "Invalid phone number. Use the specified format: 3 numbers, hyphen, 3 numbers, hyphen and 4 numbers",
    },
  ],
  actions: [
    {
      id: "submit",
      type: "Action.Submit",
      title: "Submit",
    },
  ],
};
