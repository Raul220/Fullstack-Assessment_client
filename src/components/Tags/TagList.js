import TagItem from "./TagItem";
import "./Tag.scss";

export default function TagList(props) {
    return (
        <div className="tag-list">
                {props.tags !== undefined && props.tags.map((item, index) => {
                    return (
                      <TagItem key={index} items= {splitText(item.text)} item={item} />
                    );
                })}
        </div> 
    );    
  }  
function splitText(tags){
    return tags.split(" ");
}