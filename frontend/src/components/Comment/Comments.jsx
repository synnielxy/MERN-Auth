import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form, FormControl, ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { useSaveCommentMutation } from "../../slices/commentApiSlice";

function Comments(props) {
  const { userInfo } = useSelector((state) => state.auth);
  const [Comment, setComment] = useState("");
  const [saveComment] = useSaveCommentMutation();

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      toast.error("Please Log in first");
      return;
    }

    const variables = {
      content: Comment,
      writer: userInfo._id,
      postId: props.postId,
    };

    try {
      const res = await saveComment(variables).unwrap();
      setComment("");
      console.log(res.comment);
      props.refreshFunction(res.comment);
      toast.success("Comment successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <br />
      <h3>Share your opinions about {props.movieTitle} </h3>
      <hr />

      <ListGroup className="mt-3">
        {props.CommentLists &&
          props.CommentLists.map(
            (comment, index) =>
              !comment.responseTo && (
                <ListGroup.Item key={index}>
                  <SingleComment
                    comment={comment}
                    postId={props.postId}
                    refreshFunction={props.refreshFunction}
                  />
                  <ReplyComment
                    CommentLists={props.CommentLists}
                    postId={props.postId}
                    parentCommentId={comment._id}
                    refreshFunction={props.refreshFunction}
                  />
                </ListGroup.Item>
              )
          )}
      </ListGroup>
      <br />
      
      {/* Root Comment Form */}
      <Form style={{ display: "flex" }} onSubmit={onSubmit}>
        <FormControl
          as="textarea"
          style={{ width: "100%", marginRight: "10px", borderRadius: "5px" }}
          onChange={handleChange}
          value={Comment}
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
    </div>
  );
}

export default Comments;