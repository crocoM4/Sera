// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { TransitionGroup } from "react-transition-group";

import Resize from "~/components/anims/Resize";
import {
  searchCategory,
  setSelectedCategory,
  cleanSelectedCategory,
  setTaskSearchText,
  cleanTaskSearchText
} from "~/actions/todoFiltersActions";
import {
  getCategoryFilter,
  getSearchText
} from "~/selectors/todoFiltersSelectors";

import CategoryComponent from "../Category";
import type { Category } from "~/models/category";

import {
  Container,
  ContentSearch,
  ContentSelectedCategory,
  ContentInput,
  Input,
  Suggestions,
  Suggestion,
  itemAnimationStyle,
  LabelSuggestion
} from "./style";

const waitTime = 300;

type Props = {
  +selectedCategory?: Category,
  +searchText?: String,
  +doSearchCategory: (string, (Array<Category>) => void) => void,
  +doSetSelectedCategory: Category => void,
  +doCleanSelectedCategory: () => void,
  +doSetTaskSearchText: String => void,
  +doCleanTaskSearchText: () => void
};

type State = {
  text: string,
  categories: Array<Category>,
  suggestionsVisible: boolean,
  inputHeight: number
};

class SearchComponent extends Component<Props, State> {
  static defaultProps = {
    selectedCategory: undefined,
    searchText: undefined
  };

  state = {
    text: this.props.searchText || "", // eslint-disable-line
    categories: [],
    suggestionsVisible: false,
    inputHeight: 0
  };

  debounceSearch = undefined;

  contentSearch = undefined;

  constructor(props) {
    super(props);
    this.contentSearch = React.createRef();
  }

  componentDidMount() {
    this.debounceSearch = debounce(() => this.searchCategories(), waitTime, {
      leading: false,
      trailing: true
    });
    if (
      this.contentSearch !== undefined &&
      this.contentSearch.current !== undefined
    ) {
      // $FlowFixMe
      this.setState({ inputHeight: this.contentSearch.current.clientHeight });
    }
  }

  componentWillUnmount() {
    if (this.debounceSearch !== undefined) {
      this.debounceSearch.cancel();
    }
  }

  handleOnTextChange = e => {
    const text = e.target.value;
    this.setState({ text });
    if (this.debounceSearch !== undefined) {
      this.debounceSearch();
    }
  };

  handleOnInputBlur = () => {
    this.setState({ suggestionsVisible: false, categories: [] });
  };

  handleOnCategoryClick = category => {
    const { doSetSelectedCategory } = this.props;
    this.setState({ text: "" });
    doSetSelectedCategory(category);
  };

  handleOnCategoryClearClick = () => {
    const { doCleanSelectedCategory } = this.props;
    doCleanSelectedCategory();
  };

  handleOnSearchPerTaskTitle = () => {
    const { text } = this.state;
    const { doSetTaskSearchText } = this.props;
    doSetTaskSearchText(text);
  };

  handleOnSearchTextClear = () => {
    const { doCleanTaskSearchText } = this.props;
    this.setState({ text: "" });
    doCleanTaskSearchText();
  };

  searchCategories = () => {
    const { text } = this.state;
    const { doSearchCategory, doCleanTaskSearchText } = this.props;
    if (text === "") {
      this.setState({ suggestionsVisible: false, categories: [] });
      doCleanTaskSearchText();
      return;
    }
    doSearchCategory(text, categories => {
      this.setState({
        suggestionsVisible: true,
        categories
      });
    });
  };

  render() {
    const { text, categories, suggestionsVisible, inputHeight } = this.state;
    const { selectedCategory } = this.props;
    let itemToRender = (
      <ContentInput>
        <Input
          value={text}
          placeholder="Type to search"
          onChange={e => this.handleOnTextChange(e)}
          onBlur={this.handleOnInputBlur}
        />
      </ContentInput>
    );
    if (selectedCategory !== undefined && selectedCategory !== null) {
      itemToRender = (
        <ContentSelectedCategory>
          <CategoryComponent
            category={selectedCategory}
            onClick={() => {}}
            onDelete={this.handleOnCategoryClearClick}
          />
        </ContentSelectedCategory>
      );
    }
    return (
      <Container>
        <ContentSearch ref={this.contentSearch}>{itemToRender}</ContentSearch>
        <Suggestions
          top={inputHeight}
          className={`${suggestionsVisible ? "" : "empty"}`}
        >
          <TransitionGroup>
            <Resize key="task-description" style={itemAnimationStyle(false)}>
              <LabelSuggestion onClick={this.handleOnSearchPerTaskTitle}>
                {`Search "${text}" in task's description`}
              </LabelSuggestion>
            </Resize>
            {categories.map((category, i) => (
              <Resize
                key={category.id}
                style={itemAnimationStyle(i === categories.length - 1)}
              >
                <Suggestion>
                  <CategoryComponent
                    category={category}
                    onClick={this.handleOnCategoryClick}
                    size="small"
                  />
                </Suggestion>
              </Resize>
            ))}
          </TransitionGroup>
        </Suggestions>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  selectedCategory: getCategoryFilter(state),
  searchText: getSearchText(state)
});

const mapDispatchToProps = dispatch => ({
  doSearchCategory: (text, callback) =>
    dispatch(searchCategory(text, callback)),
  doSetSelectedCategory: category => dispatch(setSelectedCategory(category)),
  doCleanSelectedCategory: () => dispatch(cleanSelectedCategory()),
  doSetTaskSearchText: text => dispatch(setTaskSearchText(text)),
  doCleanTaskSearchText: () => dispatch(cleanTaskSearchText())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);