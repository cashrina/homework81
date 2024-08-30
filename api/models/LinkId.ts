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

const Link = mongoose.model('Product', LinkSchema);

export default Link;
