import { Schema, model } from "mongoose";

const ItemSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
});

export const ItemModel = model("SomeModel", ItemSchema);
