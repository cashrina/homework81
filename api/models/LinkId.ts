import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LinkSchema = new Schema ({
  originalUrl: {
    type: String,
    require: true,
  },

  shortUrl: {
    type: String,
    require: true,
  },
});

const LinkId = mongoose.model('LinkId', LinkSchema);

export default LinkId;
