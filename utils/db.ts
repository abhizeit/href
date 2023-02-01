import mongoose from "mongoose";

const { CONNECTION_URI, DB_NAME } = process.env;
const connect = () =>
  mongoose.connect(
    process.env.DB_URI || "mongodb://127.0.0.1:27017/urlShortener"
  );

export default connect;
