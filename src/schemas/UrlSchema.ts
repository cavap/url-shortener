import { model, Schema, Document } from "mongoose";

export interface UrlInterface extends Document {
  url: string;
  hashedUrl: string;
}

const UrlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  hashedUrl: {
    type: String,
    required: true,
  },
});

export default model<UrlInterface>("Url", UrlSchema);
