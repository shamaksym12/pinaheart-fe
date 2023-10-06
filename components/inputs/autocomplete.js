import React, { Component } from 'react'
import cn from 'classnames'

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            value: props.value,
            active: false
        }
        this.input = false
        this.placeObj = {}
    }

    thisRef = (ref) => {
        this.input = ref
    }

    handleChange = ({target: {value}}) => {
        this.setState({active: true})
        if (this.props.onChange) {
            this.props.onChange(value)
        }
    }

    initGoogle = () => {
        const script = document.createElement("script")
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAlZFaoKWlzhnSWYabtlwf0TLfUTiFS_TE&libraries=places&language=en";
        script.onload = () => {
            this.setState({ready: true})
        }
        document.body.appendChild(script)
    }

    componentWillReceiveProps(nextProps) {
        if (this.input.value !== nextProps.value) {
            this.input.value = nextProps.value
        }
    }

    componentDidMount() {
        this.initGoogle()
    }

    render() {
        const { country = '', label, placeholder, value, valid, check, row = 2, loader, lostConnection, icon = true, accordion } = this.props
        const options = {types: ['(cities)'],componentRestrictions: {country: country}}
        if (this.state.ready) {
            const autocomplete = new window.google.maps.places.Autocomplete(this.input, options)
            
            window.google.maps.event.addDomListenerOnce(autocomplete, 'place_changed', () => {
                // console.log('select')
                this.placeObj = autocomplete.getPlace()
                this.props.onSelect(this.input.value, this.placeObj)
            });
        }
        
        return (
                <div className="wrap-input">
                    {
                        !accordion
                        ?   <div className={cn('label-input', 
                                    {
                                        success: valid && check,
                                        danger: !valid && check,
                                    })
                            }>{label}</div>
                        :   null
                    }
                    <div className={cn('input', {success: valid && check, danger: !valid && check})}>
                        <input
                            className="form-control text-field"
                            ref={this.thisRef}
                            type="text"
                            id="auocompleteInput"
                            defaultValue={value}
                            onChange={this.handleChange}
                            placeholder=" " />
                    </div>
                    {
                        icon
                        &&  <div className={cn('icon-input', {success: valid && check, danger: !valid && check})}>
                                {
                                    (valid && check && !loader)
                                    &&  <i className="fas fa-check"></i>
                                }
                                {
                                    (!valid && check && !loader)
                                    &&  <i className="fas fa-times"></i>
                                }
                                {
                                    (!check && (loader && !lostConnection))
                                    &&  <span>&nbsp;</span>
                                }
                                {
                                    (loader && !lostConnection)
                                    &&  <i className="fas fa-spinner fa-spin loader text-info"></i>
                                }
                                {
                                    (lostConnection && loader)
                                    &&  <i className="fas fa-ban text-danger"></i>
                                }
                            </div>
                    }
                    
                    <style jsx>{`
                        .wrap-input {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 15px;
                        }
                        .birth-wrap {
                            display: flex;
                        }
                        .wrap-blocks {
                            display: flex;
                            flex-wrap: wrap;
                        }
                        .birth-wrap > div {
                            margin-right: 5px;
                            width: 100%;
                            border: 1px solid #ccc;
                            overflow: hidden;
                            border-radius: 9px;
                        }
                        .birth-wrap > div > select {
                            border: none;
                        }
                        .wrap-blocks > div {
                            width: ${100/row}%;
                            margin-bottom: 5px;
                            text-align: center;
                        }
                        .wrap-blocks > div:nth-child(odd) {
                            padding-right: ${row == 1 ? `0px` : `5px`};
                        }
                        .select-wrap {
                            border: 1px solid #ccc;
                            overflow: hidden;
                        }
                        .select {
                            height: 40px;
                            border: none;
                            background: #FAF8F8;
                        }
                        .input {
                            width: ${accordion ? 100 : (!icon ? 70 : 60)}%;
                        }
                        .input.success .text-field,
                        .input.success .select-wrap,
                        .birth-wrap.success > div {
                            border-color: #98D538;
                        }
                        .input.danger .text-field,
                        .input.danger .select-wrap,
                        .birth-wrap.danger > div {
                            border-color: #C5141B;
                        }
                        .label-input {
                            margin-right: 5px;
                            width: 30%;
                            padding-left: ${icon ? 15 : 0}px;
                            font-weight: bold;
                            font-size: ${icon ? 12 : 14}px;
                        }
                        .loader {

                        }
                        @media (max-width: 768px) {
                            .wrap-input {
                                flex-wrap: wrap;
                            }
                            .input {
                                width: 90%;
                            }
                            .label-input {
                                width: 100%;
                            }
                        }
                        @media (max-width: 415px) {
                            .wrap-input {
                                flex-wrap: wrap;
                            }
                            .input {
                                width: 90%;
                            }
                            .label-input {
                                width: 100%;
                            }
                        }
                        .input .select-multiple {
                            border: 1px solid #ccc;
                            min-height: 200px;
                        }
                        
                        .input.success .select-multiple {
                            border: 1px solid #98D538;
                        }
                        .input.danger .select-multiple {
                            border: 1px solid #C5141B;
                        }
                        @media(max-width: 1199px) {
                            .wrap-blocks > div {
                                width: 100%;
                            }
                            .wrap-blocks > div:nth-child(odd) {
                                padding-right: 0px;
                            }
                            .label-input {
                                align-self: start;
                            }
                        }
                        .icon-input {
                            padding: 0px 15px;
                            font-size: 20px;
                            width: 10%;
                        }
                        .success {
                            color: #98D538;
                        }
                        .danger {
                            color: #C5141B;
                        }
                        .align-start {
                            align-self: start;
                        }
                    `}
                    </style>
                </div>
        );
    }
}

export default Autocomplete