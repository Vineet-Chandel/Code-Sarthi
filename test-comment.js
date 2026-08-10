const mongoose = require('mongoose');
const Comment = require('./Backend/src/models/comment');
const Issue = require('./Backend/src/models/issue');
const User = require('./Backend/src/models/user');
require('dotenv').config({ path: './Backend/.env' });

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected");
        
        // Try creating a fake comment (rollback later)
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
