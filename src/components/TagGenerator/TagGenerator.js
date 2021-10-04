import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import {fetchTags} from "./Redux";
import TagList from '../Tags/TagList';
import Editor from '../Editor/Editor';
import "./TagGenerator.scss";


class TagGenerator extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.fetchTags();
    }
    render() {
        return(
            <div>
                {this.props.items !== undefined &&
                    <div>
                        {this.props.items.length > 0 ?
                            <TagList tags={this.props.items} />
                            : <Editor items={this.props.items} />
                        }
                    </div>
                }
            </div>
        );
    }            
}
TagGenerator.propTypes = {items: PropTypes.array.isRequired};
const mapStateToProps = (state)=>({
  items: state.tags.items
});
const mapDispatchToProps = (dispatch) =>({
  fetchTags: () => dispatch(fetchTags()),
});
export default connect(mapStateToProps, mapDispatchToProps)(TagGenerator);