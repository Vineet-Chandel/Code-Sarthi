const Convo = "../models/Convo";
const Msg = "../models/Msg"
const uploadImgVideoFile = require("../middlewares/multerConvoImgVideo");
const SendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, content, messageStatus } = req.body;
        const file = req.file;
        const Participants = [senderId, receiverId].sort();

        if (Participants.length() > 2) {
            throw new Error("Convo between more than two people are not allowed through this API")
        }
        let conversation = await Convo.findOne({
            Participants: Participants
        })

        if (!conversation) {
            conversation = new Convo({
                Participants
            });
            await Convo.save()
        }
        let ImgOrVideoUrl = null;
        let contentType = null;
        if (file) {
            const UploadVideoImageFile = await uploadImgVideoFile(file);
            if (!uploadImgVideoFile) {
                return res.status(400).json({
                    success: false,
                    message: "File failed to upload",
                });
            }
            ImgOrVideoUrl = UploadVideoImageFile?.getDataUrl;

            if (file.mime_type.startwith('image')) {
                contentType = "image"
            } else if (file.mime_type.startwith('video')) {
                contentType = "video"
            } else {
                return res.status(400).json({
                    success: false,
                    message: "File failed to upload",
                });
            }
        } else if (content?.trim()) {
            contentType = "text"
        } else {
            return res.status(400).json({
                success: false,
                message: "Message content is required",
            });
        }


        const message = new Msg({
            conversation: Convo?._id,
            sender: senderId,
            receiver: receiverId,
            content,
            contentType,
            ImgOrVideoUrl,
            messageStatus
        })

        await message.save();


        if (message?.content) {
            Convo.LastMsg = message?._id
        }

        conversation.unReadCount += 1;
        await Convo.save()
    } catch (error) {

    }
}