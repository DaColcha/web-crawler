import { Router } from "express";
import { crawlWebsite, filterByLessThanWords, filterByMoreThanWords} from "../controllers/crawler.controller.js";

export const crawlerRouter = Router();

crawlerRouter.get("/crawl", async (req, res) => {
    res.send("Crawler GET endpoint");
});

crawlerRouter.post("/crawl", crawlWebsite);
crawlerRouter.post("/filter/less-than", filterByLessThanWords);
crawlerRouter.post("/filter/more-than", filterByMoreThanWords);
