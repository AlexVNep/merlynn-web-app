import mongoose, { Schema } from "mongoose";
import { DecisionData } from "../utils/definitions";

const { model, models } = mongoose;

const decisionSchema = new Schema<DecisionData>(
  {
    id: { type: String, required: true },
    modelInput: { type: Map, of: Schema.Types.Mixed, required: true },
    userInput: { type: Map, of: Schema.Types.Mixed, required: true },
    decision: { type: String, required: true },
    confidence: { type: Number, required: true },
    model: { type: String },
  },
  { timestamps: true }
);

const ModelDecision =
  models.ModelDecision || model<DecisionData>("ModelDecision", decisionSchema);

export default ModelDecision;
