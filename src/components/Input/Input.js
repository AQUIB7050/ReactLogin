import react,{useRef, useImperativeHandle} from 'react';
import classes from './Input.module.css';

const Input = react.forwardRef((props, ref) => {

    const inputRef = useRef();

    const Activate = () => {
        return inputRef.current.focus();
    }

    useImperativeHandle(ref, () => {
        return {
            focus:Activate
        }
    });

    return (
        <div
    className={`${classes.control} ${
      props.isValid === false ? classes.invalid : ''
    }`}
  >
    <label htmlFor={props.label}>{props.label}</label>
    <input
      ref={inputRef}
      type={props.type}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  </div>
    );
    
});

export default Input;