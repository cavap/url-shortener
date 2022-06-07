import { Request, Response, NextFunction } from "express";
import Controller from "./Controller";
import Url from "../schemas/UrlSchema";
import shortid from "shortid";

class UrlController extends Controller {
  constructor() {
    super("/url");
  }

  protected configureRoutes(): void {
    this.router.post(this.route, this.createHashUrl);
    this.router.get(this.route + "/:hashedUrl", this.getUrl);
  }

  private async createHashUrl(req: Request, res: Response): Promise<Response> {
    let { url } = req.body;
    if (!url) url = req.query.url;

    const urlExists = await Url.findOne({ url: url });
    if (urlExists) {
      return res.send({ hashedUrl: urlExists.hashedUrl });
    }

    try {
      const hashedUrl = shortid.generate();
      await Url.create({ url, hashedUrl });
      res.status(201).send({ hashedUrl: hashedUrl });
    } catch (error) {
      res.status(500).send({ message: "Internal error" });
    }

    return res;
  }

  private async getUrl(req: Request, res: Response): Promise<void | Response> {
    let { hashedUrl } = req.params;

    if (hashedUrl) {
      try {
        const urlExists = await Url.findOne({ hashedUrl: hashedUrl });
        if (urlExists) {
          return res.redirect(urlExists.url);
        }
        res.status(404).send({ message: "hashedUrl not found" });
      } catch (error) {
        res.status(500).send({ message: "Internal error" });
      }
    }

    return res;
  }
}

export default UrlController;
