import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { reduxForm, Field } from "redux-form";

import { PrimaryButton, SuccessButton, DangerButton } from "../../../Button";
import { Form, InputField, TextAreaField } from "../../../Form";
import { Header, Body, Footer } from "../../../Card";

const ListItem = styled.li`
  animation: ${p => p.theme.SHOW_FROM_TOP} 400ms;
  position: relative;
  width: 90%;
`;

const RemoveItemButton = DangerButton.extend`
  position: absolute;
  right: -3em;
  margin-left: 1.2em;
  margin-top: -3.25em;
  padding: 0.5em 1em;
  border-radius: 50%;
  text-align: center;
  font-size: 1.1em;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: 150ms ease-in;
  &:hover {
    background-color: #fff;
    color: #e57373;
  }
`;

/**
 * @name List
 * @desc Display a list with ordered items
 * @prop [REDUX-FORM] handleSubmit : Redux-Form's default form handle function
 * @prop hideAddPostComponentModal : A trigger to close the AddPostComponentModal(close the modal intentionally)
 * @prop submitHandlerFunc : Custom submition handler function
 * @prop headerText : Text displaying at <Header /> of this modal, which determinig what component is about to be added
 */
class List extends React.Component {
  state = {
    items: ["first"]
  };

  removeItem = itemToDelete =>
    this.setState(({ items }) => ({
      items: items.filter(item => item !== itemToDelete)
    }));

  addItem = () =>
    this.setState(({ items }) => ({
      items: items.concat(
        Math.ceil((Math.random() + (1 + Math.random())) * 100)
      )
    }));

  renderItemDependsOnTotalItemsNumber = () =>
    this.state.items.map((item, i) => (
      <ListItem>
        <Field
          key={item}
          name={`list-item-${item}`}
          component={TextAreaField}
        />
        {item !== "first" ? (
          <RemoveItemButton type="button" onClick={() => this.removeItem(item)}>
            -
          </RemoveItemButton>
        ) : null}
      </ListItem>
    ));

  render() {
    const {
      hideAddPostComponentModal,
      submitHandlerFunc,
      handleSubmit,
      headerText
    } = this.props;
    return [
      <Header>{headerText}</Header>,
      <Form onSubmit={handleSubmit(submitHandlerFunc)}>
        <Body>
          <Field
            name="description"
            label="คำอธิบายเกี่ยวกับรายการนี้"
            component={InputField}
            type="text"
          />
          <ol>
            {this.renderItemDependsOnTotalItemsNumber()}
            <PrimaryButton
              type="button"
              textCenter
              marginTop="1em"
              style={{ width: "90%" }}
              onClick={this.addItem}
            >
              + เพิ่มรายการ
            </PrimaryButton>
          </ol>
        </Body>
        <Footer>
          <SuccessButton marginRight="0.5em">เสร็จสิ้น</SuccessButton>
          <DangerButton type="button" onClick={hideAddPostComponentModal}>
            ยกเลิก
          </DangerButton>
        </Footer>
      </Form>
    ];
  }
}

List.propTypes = {
  hideAddPostComponentModal: PropTypes.func.isRequired,
  submitHandlerFunc: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired
};

export default reduxForm({ form: "list_component_data" })(List);
