import { z } from "zod";

export const sizeSchema = z.union([
  z.literal("auto"),
  z.literal("stretch"),
  z.literal("small"),
  z.literal("medium"),
  z.literal("large"),
]);

export const textSizeSchema = z.union([
  z.literal("small"),
  z.literal("default"),
  z.literal("medium"),
  z.literal("large"),
  z.literal("extraLarge"),
]);

export const horizontalAlignmentSchema = z.union([
  z.literal("left"),
  z.literal("center"),
  z.literal("right"),
]);

export const verticalAlignmentSchema = z.union([
  z.literal("top"),
  z.literal("center"),
  z.literal("bottom"),
]);

export const spacingSchema = z.union([
  z.literal("none"),
  z.literal("small"),
  z.literal("default"),
  z.literal("medium"),
  z.literal("large"),
  z.literal("extraLarge"),
  z.literal("padding"),
]);

export const textWeightSchema = z.union([
  z.literal("lighter"),
  z.literal("default"),
  z.literal("bolder"),
]);

export const textColorSchema = z.union([
  z.literal("default"),
  z.literal("dark"),
  z.literal("light"),
  z.literal("accent"),
  z.literal("good"),
  z.literal("warning"),
  z.literal("attention"),
]);

export const containerStyleSchema = z.union([
  z.literal("default"),
  z.literal("emphasis"),
]);

export const imageStyleSchema = z.union([
  z.literal("default"),
  z.literal("person"),
]);

export const iActionSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
});

export const iSubmitActionSchema = iActionSchema.extend({
  type: z.literal("Action.Submit"),
  data: z.any().optional(),
});

// export const iCardElementSchema = z.record(z.any()).and(
export const iCardElementSchema = z.object({
  id: z.string().optional(),
  speak: z.string().optional(),
  horizontalAlignment: horizontalAlignmentSchema.optional(),
  spacing: spacingSchema.optional(),
  separator: z.boolean().optional(),
  height: z.union([z.literal("auto"), z.literal("stretch")]).optional(),
});

export const iTextBlockSchema = iCardElementSchema.extend({
  type: z.literal("TextBlock"),
  size: textSizeSchema.optional(),
  weight: textWeightSchema.optional(),
  color: textColorSchema.optional(),
  text: z.string(),
  isSubtle: z.boolean().optional(),
  wrap: z.boolean().optional(),
  maxLines: z.number().optional(),
});

export const iContainerSchema = iCardElementSchema.extend({
  type: z.literal("Container"),
  style: containerStyleSchema.optional(),
  verticalContentAlignment: verticalAlignmentSchema.optional(),
  selectAction: iActionSchema.optional(),
  items: z.array(iCardElementSchema).optional(),
});

export const iColumnSchema = iCardElementSchema.extend({
  style: containerStyleSchema.optional(),
  verticalContentAlignment: verticalAlignmentSchema.optional(),
  selectAction: iActionSchema.optional(),
  items: z.array(iCardElementSchema).optional(),
  width: z
    .union([
      z.number(),
      z.literal("auto"),
      z.literal("stretch"),
      z.literal("auto"),
    ])
    .optional(),
});

export const iColumnSetSchema = iCardElementSchema.extend({
  type: z.literal("ColumnSet"),
  columns: z.array(iColumnSchema),
});

export const iFactSchema = z.object({
  title: z.string(),
  value: z.string(),
  speak: z.string().optional(),
});

export const iFactSetSchema = iCardElementSchema.extend({
  type: z.literal("FactSet"),
  facts: z.array(iFactSchema),
});

export const iInputSchema = iCardElementSchema.extend({
  id: z.string(),
  value: z.string().optional(),
});

export const iDateInputSchema = iInputSchema.extend({
  type: z.literal("Input.Date"),
  min: z.string().optional(),
  max: z.string().optional(),
  placeholder: z.string().optional(),
});

export const iTimeInputSchema = iInputSchema.extend({
  type: z.literal("Input.Time"),
  min: z.string().optional(),
  max: z.string().optional(),
  placeholder: z.string().optional(),
});

export const iNumberInputSchema = iInputSchema.extend({
  type: z.literal("Input.Number"),
  min: z.number().optional(),
  max: z.number().optional(),
  placeholder: z.string().optional(),
});

export const iTextInputSchema = iInputSchema.extend({
  type: z.literal("Input.Text"),
  isMultiline: z.boolean().optional(),
  maxLength: z.number().optional(),
  placeholder: z.string().optional(),
});

export const iToggleInputSchema = iInputSchema.extend({
  type: z.literal("Input.Toggle"),
  title: z.string(),
  valueOn: z.string().optional(),
  valueOff: z.string().optional(),
});

export const iChoiceSchema = z.object({
  title: z.string(),
  value: z.string(),
});

export const iChoiceSetInputSchema = iInputSchema.extend({
  type: z.literal("Input.ChoiceSet"),
  isMultiSelect: z.boolean().optional(),
  style: z.union([z.literal("expanded"), z.literal("compact")]).optional(),
  placeholder: z.string().optional(),
  choices: z.array(iChoiceSchema),
});

export const iVersionSchema = z.object({
  major: z.number(),
  minor: z.number(),
});

export const iAdaptiveCardSchema = iCardElementSchema.extend({
  type: z.literal("AdaptiveCard"),
  version: z.union([iVersionSchema, z.string()]).optional(),
  body: z
    .array(
      z.union([
        iTextBlockSchema,
        iFactSetSchema,
        iColumnSetSchema,
        iContainerSchema,
      ])
    )
    .optional(),
  actions: z.array(iSubmitActionSchema).optional(),
  speak: z.string().optional(),
});
