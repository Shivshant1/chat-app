import User from "../models/user.model.js";

export const getUsersForSidebar = async(req,res)=>{
    try {
        
        const loggedInUserId = req.user._id

        const filteredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password")//here "$ne" refers that the User's id must not be equal to that logged in user id

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error for sidebar controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}