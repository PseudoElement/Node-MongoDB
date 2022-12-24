const mongooose = require("mongoose");
const Schema = mongooose.Schema;
const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  }
}); // add time and date
const Contact = mongooose.model("Contact", contactSchema);
module.exports = {
  contact: Contact,
};