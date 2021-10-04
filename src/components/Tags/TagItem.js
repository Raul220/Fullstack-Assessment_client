import React from "react";
import PropTypes from "prop-types";
import { InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faMailBulk } from '@fortawesome/pro-light-svg-icons';
import "./Tag.scss";
import Editor from "../Editor/Editor";

export default class TagItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showButton: true,
            showEditor: false
        };
        this._getClass = this._getClass.bind(this);
        this._isValidHttpUrl = this._isValidHttpUrl.bind(this);
        this._elementText = this._elementText.bind(this);
        this.showEditor = this.showEditor.bind(this);
        this.showButton = this.showButton.bind(this);
    }
    
    _isValidHttpUrl (str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }
    _getClass(text){
        var email = /\S+@\S+\.\S+/;
        var span = '';
        if(email.test(text)){
            span= 'email';
        } else if (this._isValidHttpUrl(text)){
            span = 'url';
        } else if (text.charAt(0) === '@' && text.replace(/[^@]/g, "").length === 1){
            span = 'user-name';
        } else if (text.charAt(0) === '#' && text.replace(/[^#]/g, "").length === 1){
            span = 'hash-tag';
        } else {
            span = 'text';
        }
        return span;
    }
    _elementText(item) {
        var element = '';
        if(this._getClass(item) === 'email') {
            element = <e><FontAwesomeIcon icon={faMailBulk} /> Mail</e>;
        } else if (this._getClass(item) === 'url') {
            element = <e><FontAwesomeIcon icon={faLink} /> Link</e>;
        } else {
            element = item;
        }
        return element;
    }
    showEditor(){
        this.setState({
            showButton : false,
            showEditor: true,
        });
    }
    showButton(){
        this.setState({
            showButton : true,
            showEditor: false,
        }); 
    }
    render() {
      return (
        <div>
            {this.state.showButton && 
                <div className="tag-item" id={this.props.item.id}>
                    <Button variant="outline-primary" onClick={()=>this.showEditor()} className="add-btn">+</Button>
                    <InputGroup>
                        <InputGroup.Checkbox />
                            {this.props.items !== undefined && this.props.items.map((item, index) => {
                                return (
                                    <span key={index} className={`span-item span-${this._getClass(item)}`} >{this._elementText(item)}</span>
                                );
                            })}
                    </InputGroup>
                </div>
            }
            {this.state.showEditor &&
                <Editor items={this.props.items} showEditor={true} showButton={false} updateId={this.props.item.id} />
            }
        </div>
      );
    }
}  
TagItem.propTypes = {
    items: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
};