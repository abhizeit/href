import mongoose, { Document, Schema, model, models } from "mongoose";

export interface IUrl extends Document {
  mainUrl: string;
  clickCount: number;
  shortUrl: string;
}

const urlSchema: Schema = new Schema({
  mainUrl: {
    type: String,
    required: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  shortUrl: {
    type: String,
    required: true,
  },
});

const url = models.url || model("url", urlSchema);

export default url;
