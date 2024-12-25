import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
});

const LinkId = mongoose.model('LinkId', LinkSchema);

export default LinkId;