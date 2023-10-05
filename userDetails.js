const mongoose = require("mongoose")

const userDetailSchema = new mongoose.Schema(
    {
        fName: {
            type: String,
            required: true,
            unique: true,
          },
         lName: {
            type: String,
            required: true,
            unique: true,
          },
          email: {
            type: String,
            required: true,
            unique: true,
          },
          password: {
            type: String,
            required: true,
          },
},
{
    collection: "UserInfo"
}

);
mongoose.model("UserInfo",userDetailSchema)