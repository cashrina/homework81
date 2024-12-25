import express from 'express';
import { Request, Response, NextFunction } from 'express';
import LinkId from '../models/LinkId';


const generateShortUrl = async (): Promise<string> => {
  const lettersRandom = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let shortUrl = '';
  for (let i = 0; i < 7; i++) {
    shortUrl += lettersRandom.charAt(Math.floor(Math.random() * lettersRandom.length));
  }

  const existingLink = await LinkId.findOne({shortUrl});
  if (existingLink) {
    return generateShortUrl();
  }

  return shortUrl;
};

const linkRouter = express.Router();

linkRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { originalUrl } = req.body;

      if (!originalUrl) {
        res.status(400).send('Не существует ссылки');
        return;
      }

      const shortUrl = await generateShortUrl();

      const newLink = new LinkId({
        originalUrl,
        shortUrl,
      });

      await newLink.save();

      res.status(201).json(newLink);
    } catch (err) {
      next(err);
    }
  }
);

export default linkRouter;
