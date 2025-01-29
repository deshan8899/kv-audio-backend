import Review from '../models/review.js'; // Adjust the path as necessary

export function addReview(req, res){
    if(req.user==null){
        res.status(401).json({
            message:"please login and try agin!"
        }); 

        return; 
    }


    const data=req.body;

    data.name=req.user.firstName + " " + req.user.lastName;
    data.profilePicture=req.user.profilePicture;
    data.email=req.user.email;

    const newReview=new Review(data);//database save krnn pullwn vidiye review ekk 

    newReview.save().then(()=>{
        res.json("Review Added")
    }).catch((error)=>{
        res.status(500).json(error, "Error adding review")
    })

   
}

export function getReviews(req, res){
    
    const user=req.user; 

    if(user==null||user.role!="admin"){
        Review.find({isApproved:true}).then((reviews)=>{
            res.json(reviews)
        })
        return; 
    }

    if(user=="admin"){
        Review.find().then((reviews)=>{
            res.json(reviews)
        })
    }

    
}


    
export function deleteReview(req, res){
    const email=req.body.email; 

    if(req.user==null){
        res.status(401).json(
            { 
                message:"please loging and try again"
            }
        )
        return;
    }
    
    if(req.user.role=="admin"){    
         Review.deleteOne({email:email}).then(()=>{
            res.json("Review deleted")
        }).catch((error)=>{
            res.status(500).json(error, "Error deleting review")
        })
        return; 
    
    }
    
    
    if(req.user.role=="customer"){
    
        if(req.user.email==email){
            Review.deleteOne({email:email}).then(()=>{
                res.json("Review deleted")
            }).catch((error)=>{
                res.status(500).json(error, "Error deleting review")
            })
            
        }else{
            res.status(401).json(
                {
                    message:"You can only delete your own reviews"
                }
            )
        }
    
    }



    Review.deleteOne({email}).then(()=>{
        res.json("Review deleted")
    }).catch((error)=>{
        res.status(500).json(error, "Error deleting review")
    })
 
}

export function approveReview(req, res){
    const email=req.body.email; 

    if(req.user==null){
        res.status(401).json(
            { 
                message:"please loging and try again"
            }
        )
        return;
    }

    if(req.user.role=="admin"){
        Review.updateOne({

            email:email, 

        },
        
        {
            isApproved:true

        }).then(()=>{
            res.json("Review approved")
        }).catch((error)=>{
            res.status(500).json(error, "Error approving review")
        })
    }else{
        res.status(401).json(
            {
                message:"Only admins can approve reviews"
            }
        )
    }
}