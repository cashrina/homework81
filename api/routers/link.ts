import express from 'express';
import LinkId from '../models/LinkId';

const linkRouter = express.Router();

linkRouter.get('/:shortUrl', async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    const link = await LinkId.findOne({ shortUrl });

    if (!link || !link.originalUrl) {
      return res.status(404).send('Link not found');
    }
    return res.status(301).redirect(link.originalUrl as string);
  } catch (e) {
    next(e);
  }
});

const generateShortUrl = async () => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let shortUrl = '';
  for (let i = 0; i < 6; i++) {
    shortUrl += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  const existingLink = await LinkId.findOne({ shortUrl });
  if (existingLink) {
    return generateShortUrl();
  }

  return shortUrl;
};


linkRouter.post('/links', async (req, res,next) => {
  try {
    const { originalUrl } = req.body;


    if (!originalUrl) {
      return res.status(400).send('originalUrl is required');
    }

    const shortUrl = await generateShortUrl();

    const newLink = new LinkId({
      originalUrl,
      shortUrl,
    });

    await newLink.save();

    res.status(201).json(newLink);
  } catch (error) {
    next(error);
  }
});

export default linkRouter;