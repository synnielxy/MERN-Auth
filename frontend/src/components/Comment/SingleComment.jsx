import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useSaveCommentMutation } from "../../slices/commentApiSlice";

function SingleComment(props) {
  const { userInfo } = useSelector((state) => state.auth);
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);
  const [saveComment, { isLoading }] = useSaveCommentMutation();

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      toast.error("Please Log in first");
      return;
    }

    const variables = {
      writer: userInfo._id,
      postId: props.postId,
      responseTo: props.comment._id,
      content: CommentValue,
    };

    try {
      const res = await saveComment(variables).unwrap();
      setCommentValue("");
      setOpenReply(!OpenReply);
      props.refreshFunction(res.comment);
      toast.success("Comment successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <div className="comment-section">
        <div className="comment-content">
          <strong>{props.comment.writer.name}</strong>
          <p style={{ marginBottom:"0" }}>{props.comment.content}</p>
          <span
            style={{ fontSize: "14px", color: "gray", cursor: "pointer" }}
            onClick={openReply}
          >
            Reply to{" "}
          </span>
        </div>
      </div>

      {OpenReply && (
        <Form style={{ display: "flex" }} onSubmit={onSubmit}>
          <FormControl
            as="textarea"
            style={{ width: "100%", marginRight: "10px", borderRadius: "5px" }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="Write some comments"
          />
          <Button
            variant="primary"
            type="submit"
            style={{ width: "20%", height: "52px" }}
          >
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}

export default SingleComment;
