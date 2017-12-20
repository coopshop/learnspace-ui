import React from "react";
import PropTypes from "prop-types";

import { PrimaryButton } from "../Button";
import { Form, TextArea } from "../Form";

/**
 * @name CommentMessageForm
 * @desc A form to send a comment to a particular post
 */
const CommentMessageForm = () => (
  <Form>
    <TextArea style={{ marginBottom: "1em", width: "100%", height: "100px" }} />
    <PrimaryButton>ส่ง</PrimaryButton>
  </Form>
);

export default CommentMessageForm;