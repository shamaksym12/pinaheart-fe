import TextField from './text_field'
import SelectField from './select_field'
import cn from 'classnames'
import { Fragment } from 'react'
import { monthArray, dayArray, yearArray } from '../../utils'
import Autocomplete from './autocomplete'

const DialogTextArea = ({height = "150px", value, onChange, field, row = 2, placeholder}) => {
	const handleChangeInput = ({target: {value}}) => {
		onChange(value)
	}
	return  <div className="wrap-input">
							<textarea
								id="message-area"
								style={{resize: 'none', height: height}}
								value={value}
								placeholder = {placeholder}
								onChange={handleChangeInput}
								className={cn('form-control text-field message-area')}
								/>
				<style jsx>{`
					.text-field{
						background: white
					}
					.message-area {
						border-radius: 9px;
						margin: 15px;
					}
                	
                    @media (max-width: 768px) {
                        .wrap-input {
                            flex-wrap: wrap;
                        }
                        .input {
                            width: 100%;
                        }
                        .label-input {
                            width: 100%;
                        }
                    }
            	`}
                </style>
            </div>
}

export default DialogTextArea