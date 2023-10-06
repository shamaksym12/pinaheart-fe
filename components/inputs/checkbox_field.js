import cn from 'classnames'

const CheckBox = ({className, checked, inputRef, text, disabled = false, id = 'checkbox-1', valid = true, onChange }) => {
    return  <div className={cn('checkbox-default', className)}>
                <input
                    id={`checkbox-${id}`}
                    type="checkbox"
                    disabled={disabled}
                    ref={inputRef}
                    checked={checked}
                    className={cn('checkbox-input', className, {danger: !valid})}
                    onChange={({target: {checked}}) => onChange(checked)} />
                <label htmlFor={`checkbox-${id}`} className="checkbox-label mb-0">{text}</label>
                <style jsx>
                {`
                    .checkbox-default {
                        display: inline-block;
                        position: relative;
                        font-size: 16px;
                        line-height: 24px;
                    }
                    .checkbox-input {
                        position: absolute;
                        top: 4px;
                        left: 0;
                        width: 16px;
                        height: 16px;
                        opacity: 0;    
                        z-index: 0;
                    }
                    .checkbox-label {
                        display: block;
                        padding: 0 0 0 25px;
                        cursor: pointer;
                        font-size: 14px;
                    }
                    .checkbox-label:before {
                        content: '';
                        position: absolute;
                        top: 4px;
                        left: 0;
                        width: 16px;
                        height: 16px;
                        background-color: transparent;
                        border: 1px solid #848183;
                        border-radius: 2px;
                        z-index: 1;
                        transition: all .28s cubic-bezier(.4, 0, .2, 1);
                        transition-property: background-color, border-color;
                    }
                    .checkbox-label:after {
                        content: '';
                        position: absolute;
                        top: 5px;
                        left: 5px;
                        width: 6px;
                        height: 12px;
                        border-bottom: 2px solid transparent;
                        border-right: 2px solid transparent;
                        transform: rotate(45deg);
                        z-index: 2;
                        transition: border-color .28s cubic-bezier(.4, 0, .2, 1);
                    }
                    .checkbox-input:checked + .checkbox-label:before {
                        background-color: #E52F36;
                        border-color: #E52F36;
                    }
                    .checkbox-input:hover:not(:checked) + .checkbox-label:before {
                        background-color: #E52F36;
                        border-color: #E52F36;
                        opacity: 0.35;
                    }
                    .checkbox-input:checked + .checkbox-label:after,
                    .checkbox-input:hover + .checkbox-label:after {
                        border-color: #fff;
                    }
                    .checkbox-input.danger:not(:checked) + .checkbox-label:before {
                        border-color: red;
                    }
                `}
                </style>
            </div>
}

export default CheckBox