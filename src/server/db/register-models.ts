import { model } from "mongoose";
import userSchema from "../modules/user/user.schema";

export default function registerModels() {
  if (!global.registeredModels) {
    console.log("Registering User Model");
    model("user", userSchema);

    global.registeredModels = true;
  }
}