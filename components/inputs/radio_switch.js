import React from 'react'

const RadioSwitch = props => {
    const {
        text,
        description = null,
        className = '',
        value,
        checked
    } = props
    return (
        <div className={className}>
            <div className={`d-flex align-items-center pointer`} onClick={() => props.onChange(value)}>
                <div className={`switch-dot ${checked === value && 'active'}`}></div>
                <div className="no-wrap fs-14">{text}</div>
            </div>
            {description && <div className="switch-description">{description}</div>}
            <style jsx>{`
                .switch-dot {
                    position: relative;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    margin-right: 12px;
                    background: #fff;
                    border: 1px solid #848183;
                }
                .switch-dot.active:after {
                    content: '';
                    width: 10px;
                    height: 10px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #E73E44;
                    border-radius: 50%;
                }
                .switch-description {
                    margin-left: 28px;
                    line-height: 0.5;
                }
            `}
            </style>
        </div>
    );
}

export default RadioSwitch