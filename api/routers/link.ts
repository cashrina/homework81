import express from 'express';
import LinkId from '../models/LinkId';

const generateShortUrl = async (): Promise<string> => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let shortUrl = '';
  for (let i = 0; i < 7; i++) {
    shortUrl += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  const existingLink = await LinkId.findOne({ shortUrl });
  if (existingLink) {
    return generateShortUrl();
  }

  return shortUrl;
};

const linkRouter = express.Router();

linkRouter.post('/', async (req, res, next) => {
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

linkRouter.get('/:shortUrl', async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    const link = await LinkId.findOne({ shortUrl });

    if (!link || !link.originalUrl) {
      return res.status(404).send('Link not found');
    }

    res.status(301).redirect(link.originalUrl);
  } catch (error) {
    next(error);
  }
});

export default linkRouter;