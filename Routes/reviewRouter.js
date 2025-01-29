import express from "express"; 
import { addReview, getReviews ,deleteReview, approveReview} from "../controller/reviewController.js";

const reviewRouter = express.Router(); 

reviewRouter.post("/",addReview); 
reviewRouter.get("/",getReviews);

reviewRouter.delete("/:email",deleteReview);

reviewRouter.put("/approve/:email",approveReview);

export default reviewRouter;