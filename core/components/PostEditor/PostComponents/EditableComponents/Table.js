import React from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import styled, { keyframes } from "styled-components";

import TableWrapper from "../../../PostPage/RenderedComponents/Table";
import { Form, InputField, TextAreaField } from "../../../Form";
import { SuccessButton, DangerButton } from "../../../Button";
import { Header, Body, Footer } from "../../../Card";

const RemoveItemButton = DangerButton.extend`
  color: #fff;
  margin-left: 1em;
  padding: 0.5em 1em;
  border-radius: 50%;
  text-align: center;
  font-size: 1.1em;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: 150ms ease-in;
  &:hover {
    background-color: #fff;
    color: ${p => p.theme.DANGER_COLOR};
  }
`;

const AddItemButton = RemoveItemButton.extend`
  background-color: ${p => p.theme.PRIMARY_COLOR};
`;

/**
 * @name Table
 * @desc Display a data as a grid
 * @prop [REDUX-FORM] handleSubmit : Redux-Form's default form handle function
 * @prop hideAddPostComponentModal : A trigger to close the AddPostComponentModal(close the modal intentionally)
 * @prop submitHandlerFunc : Custom submition handler function
 * @prop headerText : Text displaying at <Header /> of this modal, which determinig what component is about to be added
 */
class Table extends React.Component {
  state = {
    meta: { name: "", description: "" },
    head: ["ชื่อจริง", "นามสกุล", "อายุ"],
    body: [{ id: "1", items: ["Tony", "Stark", "39"] }]
  };

  /**
   * @name removeRowItem
   * @desc f() to remove one particular row from the table, specifying by row ID
   * @param rowToRemove : An indentification of the row which will be removed
   */
  removeRowItem = rowToRemove =>
    this.setState(prevState => ({
      body: prevState.body.filter(rowItem => rowItem.id !== rowToRemove)
    }));

  /**
   * @name addRowItem
   * @desc f() to add a new row item to the table
   */
  addRowItem = () => {
    this.setState(prevState => ({
      body: prevState.body.concat([
        {
          id: Math.ceil((Math.random() + (1 + Math.random())) * 100),
          items: ["Tony", "Stark", "39"]
        }
      ])
    }));
  };

  /**
   * @name renderRows
   * @desc f() to render a rows corresponding to the number of the current rows at the time
   */
  renderRows = () => {
    console.table(this.state.body);
    return this.state.body.map((rowItem, i) => (
      <tr key={i + 1}>
        <td>{i + 1}</td>
        {rowItem.items.map((row, j) => <td key={j}>{row}</td>)}
        <td>
          <RemoveItemButton onClick={() => this.removeRowItem(rowItem.id)}>
            -
          </RemoveItemButton>
        </td>
      </tr>
    ));
  };

  /**
   * @name renderColumns
   * @desc f() to render a tables's columns name
   */
  renderColumns = () => (
    <tr>
      <th>ลำดับ</th>
      {this.state.head.map((column, i) => (
        <th>
          {column} <RemoveItemButton>-</RemoveItemButton>
        </th>
      ))}
      <th>
        <AddItemButton>+</AddItemButton>
      </th>
    </tr>
  );

  /**
   * @name renderNewRowInput
   * @desc f() to render the corresponding number of row inputs to the number of table's columns
   */
  renderNewRowInput = () => {
    const { head, body } = this.state;
    return (
      <tr>
        <td>{/* Leave this blank */}</td>
        {head.map(column => (
          <td>
            <Field
              name={`${column}-${body.length + 1}`}
              component={InputField}
            />
          </td>
        ))}
        <td>
          <AddItemButton onClick={this.addRowItem}>+</AddItemButton>
        </td>
      </tr>
    );
  };

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
            name="name"
            label="ชื่อตารางนี้"
            component={InputField}
            type="text"
          />
          <Field
            name="description"
            label="คำอธิบายเกี่ยวกับตารางนี้"
            component={InputField}
            type="text"
          />
          <TableWrapper>
            <thead>{this.renderColumns()}</thead>
            <tbody>
              {this.renderRows()}
              {this.renderNewRowInput()}
            </tbody>
          </TableWrapper>
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

Table.propTypes = {
  hideAddPostComponentModal: PropTypes.func.isRequired,
  submitHandlerFunc: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired
};

export default reduxForm({ form: "table_component_data" })(Table);
