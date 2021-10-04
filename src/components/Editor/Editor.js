import axios from '../../config';
import React from "react";
import PropTypes from "prop-types";
import {fetchSendTag} from './Redux';
import authState from 'react-token-auth';
import vito from './vito.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Button, Form, Image} from 'react-bootstrap';
import { faExpandAlt, faCalendarAlt, faLockOpen, faHighlighter, faArrowSquareDown } from '@fortawesome/pro-light-svg-icons';
import "./Editor.scss";

// debugger;
export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showButton: this.props.showButton !== undefined ? this.props.showButton : true,
            showEditor: this.props.showEditor !== undefined ? this.props.showEditor :false,
            somethingToSend: false,
            spanCount: 0,
            showButtonOk: true,
            showButtonCancel : true
        };
        this._onButtonClick = this._onButtonClick.bind(this);
        this._cancelBtnAction = this._cancelBtnAction.bind(this);
        this._submitBtnAction = this._submitBtnAction.bind(this);
        this._processText = this._processText.bind(this);
        this._isValidHttpUrl = this._isValidHttpUrl.bind(this);
        this._getClass = this._getClass.bind(this);
    }
    componentDidMount(){
        this.setState({
            spanCount : this.props.items.length,
        });
        if(window.screen.width < 1230) {
            this.setState({
                showButtonOk : false
            });
        }
    }
    _getClass(text){
        var email = /\S+@\S+\.\S+/;
        var span = '';
        if(email.test(text)){
            span= 'email';
        } else if (this._isValidHttpUrl(text)){
            span = 'url';
        } else if (text.charAt(0) === '@' && text.replace(/[^@]/g, "").length === 1){
            span = 'user';
        } else if (text.charAt(0) === '#' && text.replace(/[^#]/g, "").length === 1){
            span = 'hash-tag';
        } else {
            span = 'text';
        }
        return span;
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
    _processText (e) {
        if(e.keyCode === 32){
            var text = document.getElementById('inputText').value;
            text = text.split(' ');
            text = text.slice(-1)[0];
            var input = document.getElementById('inputText');
            input.placeholder = '';
            input.value = '';
            var email = /\S+@\S+\.\S+/;
            if(email.test(text)) {
                var span = '<span class="tag-span email-span">'+text+' </span>';
                document.getElementById('spanContainer').insertAdjacentHTML('beforeend', span);
                this.setState({
                    spanCount: this.state.spanCount + 1,
                    somethingToSend: true
                });
            } else if (this._isValidHttpUrl(text)) {
                var span = '<span class="tag-span url-span">'+text+'</span>';
                document.getElementById('spanContainer').insertAdjacentHTML('beforeend', span);
                this.setState({
                    spanCount: this.state.spanCount + 1,
                    somethingToSend: true
                });
            } else if (text.charAt(0) === '@' && text.replace(/[^@]/g, "").length === 1){
                var span = '<span class="tag-span user-span">'+text+'</span>';
                document.getElementById('spanContainer').insertAdjacentHTML('beforeend', span);
                this.setState({
                    spanCount: this.state.spanCount + 1,
                    somethingToSend: true
                });
            } else if (text.charAt(0) === '#' && text.replace(/[^#]/g, "").length === 1){
                var span = '<span class="tag-span hash-tag-span">'+text+'</span>';
                document.getElementById('spanContainer').insertAdjacentHTML('beforeend', span);
                this.setState({
                    spanCount: this.state.spanCount + 1,
                    somethingToSend: true
                });
            } else {
                var span = '<span class="tag-span text-span">'+text+'</span>';
                document.getElementById('spanContainer').insertAdjacentHTML('beforeend', span);
                this.setState({
                    spanCount: this.state.spanCount + 1,
                    somethingToSend: true
                });
            }
        } else if (e.keyCode === 8){
            if(document.getElementById('inputText').value === ''){
                if(this.state.spanCount > 0){
                    var last_span = document.querySelectorAll('.tag-span:nth-last-of-type(1)')[0];
                    var text = last_span.innerText;
                    document.getElementById('inputText').value = text;
                    last_span.remove();
                    this.setState({
                        spanCount: this.state.spanCount - 1,
                    });
                }              
            } else if (document.getElementById('inputText').value.length === 1 && this.state.spanCount === 0){
                this.setState({
                    somethingToSend: false,
                });
            }
        } else {
            this.setState({
                somethingToSend: true,
            });
        }
        if(window.screen.width < 1230 && this.state.somethingToSend) {
            this.setState({
                showButtonOk : true,
                showButtonCancel: false
            });
        }
        if(window.screen.width < 1230 && !this.state.somethingToSend) {
            this.setState({
                showButtonOk : false,
                showButtonCancel: true
            });
        }
    }
    _onButtonClick() {
        this.setState({
            showEditor: true,
            showButton: false,
        });
    }
    _cancelBtnAction(){
        window.location = 'http://localhost:3000/';
    }
    _submitBtnAction(){
        if(this.state.somethingToSend){
            var text_span= '';
            var spans = document.getElementsByClassName("tag-span");
            for (var i = 0; i < spans.length; i++) {
                if (i === 0){
                    text_span = spans.item(i).innerText
                } else{
                    text_span = text_span + " " + spans.item(i).innerText;
                }
            }
            var textEdit = document.getElementById('inputText').value;
            if(!(/\s/.test(textEdit))){
                text_span = text_span + " " + textEdit;
            }            
            var idUp = this.props.updateId;
            if(idUp === undefined) {
                axios.post('/tags/add', {text:text_span})
                .then(response => {
                    const {data} = response;
                    window.location = 'http://localhost:3000/';
                })
                .catch(err => {
                    console.error(err);
                });
            } else {
                axios.post('/tags/modify', {text:text_span, id:idUp})
                .then(response => {
                    const {data} = response;
                    window.location = 'http://localhost:3000/';
                })
                .catch(err => {
                    console.error(err);
                });
            }          
        } else {
            this.setState({
                showEditor: false,
                showButton: true,
            });
        }
    }
    render() {
        return (
            <div>
                {this.state.showEditor &&
                    <div className="text-editor">
                        <div className="input-panel">
                            <Button variant="outline-primary" className="add-btn">+</Button>
                            <div id="spanContainer">
                                {this.props.items.length > 0 && this.props.items.map((item, index) => {
                                    return (
                                        <span key={index} className={`tag-span ${this._getClass(item)}-span`}>{item}</span>
                                        );
                                })}
                            </div>
                            <Form.Control type="text" id="inputText" placeholder={this.props.items.length > 0 ? "" : "Type to add new task"} 
                            onKeyDown={this._processText} />
                            <Image src={vito} roundedCircle />
                        </div>
                        <div className="buttons-panel">
                            <Button variant="light" className="first-btn btn-panel"><FontAwesomeIcon icon={faExpandAlt} />{window.screen.width < 1230 ? '' : ' Open'}</Button>
                            <Button variant="outline-info" className="btn-panel"><FontAwesomeIcon icon={faCalendarAlt} />{window.screen.width < 1230 ? '' : ' Today'}</Button>
                            <Button variant="outline-info" className="btn-panel"><FontAwesomeIcon icon={faLockOpen} />{window.screen.width < 1230 ? '' : ' Public'}</Button>
                            <Button variant="outline-info" className="btn-panel"><FontAwesomeIcon icon={faHighlighter} />{window.screen.width < 1230 ? '' : ' Normal'}</Button>
                            <Button variant="outline-info" className="btn-panel"><FontAwesomeIcon icon={faArrowSquareDown} />{window.screen.width < 1230 ? '' : ' Estimation'}</Button>
                            {this.state.showButtonOk && 
                                <Button id='btnOk' variant="primary" className="finish-btn" onClick={this._submitBtnAction}>{window.screen.width < 1230 ? '+' : 'OK'}</Button>
                            }
                            {this.state.showButtonCancel && 
                                <Button id='btnCancel' variant={window.screen.width < 1230 ? 'primary' : 'light'} className="finish-btn" 
                                onClick={this._cancelBtnAction}>{window.screen.width < 1230 ? 'X' : 'Cancel'}</Button>
                            }                          
                        </div>
                    </div>
                }
                {this.state.showButton &&
                    <Button variant="outline-primary" className="add-btn" onClick={this._onButtonClick}>+</Button>
                }
            </div>
             
        );
    }
}
Editor.propTypes = {
    items: PropTypes.array.isRequired,
    showButton: PropTypes.bool,
    showEditor: PropTypes.bool,
    updateId: PropTypes.number
};