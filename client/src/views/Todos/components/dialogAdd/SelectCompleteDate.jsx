import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-date-picker";

import labels from "~/constants/labels";
import { DONE } from "~/constants/steps";
import { addTask } from "~/actions/todoTasksActions";
import { showMessageInfo } from "~/actions/messageActions";

class SelectCompleteDate extends React.Component {
  state = {
    todoWithin: new Date()
  };

  onInputDateChange = date => {
    this.setState({ todoWithin: date });
  };

  onButtonAddClick = () => {
    const { todoWithin } = this.state;
    const { dispatch, options } = this.props;
    const { title, description, category } = options;
    if (!todoWithin || todoWithin === "") {
      dispatch(showMessageInfo(labels.msgSelectDate));
      return;
    }
    dispatch(
      addTask(title, description, category, todoWithin, this.onTodoTaskCreated)
    );
  };

  onTodoTaskCreated = () => {
    const { onNext } = this.props;
    onNext({ stepId: DONE, options: {} });
  };

  render() {
    const { todoWithin } = this.state;
    return (
      <div className="content-select-complete-date">
        <h2>{labels.titleTodoWithin}</h2>
        <div className="content-input">
          <DatePicker
            className="main-input"
            calendarClassName="dark-calendar"
            onChange={this.onInputDateChange}
            value={todoWithin}
            minDate={new Date()}
            locale="en-US"
            clearIcon={<i className="icon-delete" />}
            calendarIcon={<i className="icon-calendar" />}
          />
        </div>
        <div>
          <button className="main-button" onClick={this.onButtonAddClick}>
            {labels.buttonAdd}
          </button>
        </div>
      </div>
    );
  }
}

SelectCompleteDate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onNext: PropTypes.func.isRequired
};

export default connect()(SelectCompleteDate);