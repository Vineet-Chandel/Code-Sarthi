const mongoose = require('mongoose');
const Comment = require('./src/models/comment');
const Issue = require('./src/models/issue');
const User = require('./src/models/user');
require('dotenv').config();

async function run() {
    try {
        await mongoose.connect(process.env.DB_LINK);
        console.log("Connected");
        
        const teamId = new mongoose.Types.ObjectId();
        const issueId = new mongoose.Types.ObjectId();
        const authorId = new mongoose.Types.ObjectId();
        
        const comment = await Comment.create({
            issueId,
            teamId,
            authorId,
            body: "Test comment"
        });
        
        console.log("Created", comment._id);
        
        await comment.populate('authorId', 'firstName lastName photoUrl email');
        console.log("Populated", comment.authorId);
        
        await Comment.deleteOne({ _id: comment._id });
        console.log("Deleted");
    } catch(e) {
        console.error("ERROR", e);
    } finally {
        mongoose.disconnect();
    }
}
run();
