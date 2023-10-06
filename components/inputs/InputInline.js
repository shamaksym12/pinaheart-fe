import TextField from './text_field'
import SelectField from './select_field'
import cn from 'classnames'
import { Fragment } from 'react'
import { monthArray, dayArray, yearArray } from '../../utils'
import Autocomplete from './autocomplete'

const InputInline = ({ icon = true, required = false, accordion = false, any = false, value, label, valid = true, check = false, type = 'text', options = [], onChange, field, row = 2, disabled = false, loader, lostConnection, selectedCountry, id = '' }) => {

	let input = null
	const handleChangeBlocks = (id, val) => {
		if (any && !id) {
			onChange(field, [])
			return
		}
		//add only one param for choise
		if (field === 'english_language_ability' || field === 'education') {
			onChange(field, [id])
			return
		}
		const specIds = {
			do_you_have_pets: [74, 75],
			relationship_youre_looking_for: [137]
		}

		if (specIds[field] && specIds[field].includes(id) && val) {
			onChange(field, [id])
			return
		}

		// const specId = field === 'do_you_have_pets' ? 74 : (field === 'relationship_youre_looking_for' ? 137 : false)
		// const specId2 = field === 'do_you_have_pets' ? 75 : false
		// console.log(id, val)
		// if ((specId || specId2) && val && (id === specId || id === specId2)) {
		//     onChange(field, [specId || specId2])
		//     return
		// }
		let temp = value ? value : []
		if (val) {
			temp = [...temp, id]
		} else {
			temp = temp.filter(item => item !== id)
		}
		if (specIds[field]) {
			temp = temp.filter(item => {
				return !specIds[field].includes(item)
			})
		}

		onChange(field, temp)
	}
	const handleChangeInput = ({ target: { value } }) => {
		onChange(field, value)
	}
	const handleChangeMultiple = ({ target }) => {
		let selected = []

		for (let i = 0; i < target.options.length; i++) {
			if (target.options[i].selected) {
				selected.push(target.options[i].id)
			}
		}
		selected = selected.filter(item => item !== '' && item !== 'null')
		if (any && selected.includes('0')) {
			selected = ['0']
		}
		onChange(field, selected)
	}
	const handleChangeBirth = (key) => ({ target: { value } }) => {
		onChange(key, value)
	}
	const handleChangeCountry = ({ target }) => {
		const options = target.options
		const id = options[options.selectedIndex].id
		onChange(field, { value: target.value, id })
	}
	const handleSelectCity = (value, place) => {

	}
	const hndleChangeCity = () => {

	}
	const renderOptions = (option, i) => {
		const disabled = !!option.disabled
		return <option key={i} id={option.id} className="option" disabled={disabled} value={option.id}>{option.name}</option>
	}
	const renderBlocks = (option, i) => {
		let selected = value ? value.includes(option.id) : false
		if (any && !option.id) {
			selected = true
		}
		if (any && !option.id && (value && value.length)) {
			selected = false
		}
		return <div key={i}
			onClick={() => handleChangeBlocks(option.id, !selected)}
			className={cn('block-select', { selected: selected })}>
			{
				option.name == 'Romance / Dating' ? 'Romance'
				: option.name == 'Long Term Relationship' ? 'Long Term' : option.name
			}
			<style jsx>{`
						.block-select {
							border: 1px solid #ccc;
							border-radius: 9px;
							padding: 9px 0px;
							color: #555;
							cursor: pointer;
							white-space: nowrap;
						}

						.block-select.selected,
						.block-select:hover {
							background-color: #F1FFE0;
						}
					`}
			</style>
		</div>
	}

	const renderSingleselect = (option, i) => {
		let selected = value ? value.includes(option.id) : false
		if (any && !option.id) {
			selected = true
		}
		if (any && !option.id && (value && value.length)) {
			selected = false
		}
		return <div key={i}
			onClick={() => handleChangeBlocks(option.id, !selected)}
			className={cn('block-select', { selected: selected })}>
			{option.name}
			<style jsx>{`
						.block-select {
							border: 1px solid #ccc;
							border-radius: 9px;
							padding: 9px 0px;
							color: #555;
							cursor: pointer;
							white-space: nowrap;
						}
						.block-select.selected,
						.block-select:hover {
							background-color: #F1FFE0;
						}
					`}
			</style>
		</div>
	}
	return <div className="wrap-input" id={id}>
		{
			!accordion
			&& <div className={cn('label-input',
				{
					success: valid && check,
					danger: !valid && check,
					'align-start': type === 'textarea' || type === 'multiselect' || type === 'singleselect'
				})
			}>
				{required ? <span className="text-danger asterix" data-toggle="tooltip" data-placement="top" title="This field is required">* </span> : <span></span>}
				{label}
			</div>
		}

		<div className={cn('input', { success: valid && check, danger: !valid && check })}>
			{
				type === 'text'
				&& <input
					className="form-control text-field"
					onChange={handleChangeInput}
					value={value}
					ref={ref => input = ref} />
			}
			{
				type === 'autocomplete'
				&& <Autocomplete
					onSelect={handleSelectCity}
					onChange={hndleChangeCity}
					country={selectedCountry} />
			}
			{
				(type === 'select' && field !== 'birth' && field !== 'country_id')
				&& <div className="text-field select-wrap">
					<select
						value={value ? value : ''}
						disabled={disabled}
						className="form-control select"
						onChange={handleChangeInput}>
						{options.map((option, i) => renderOptions(option, i))}
					</select>
				</div>
			}
			{
				(type === 'select' && field === 'country_id')
				&& <div className="text-field select-wrap">
					<select
						value={value}
						disabled={disabled}
						className="form-control select"
						onChange={handleChangeCountry}>
						{options.map((option, i) => renderOptions(option, i))}
					</select>
				</div>
			}
			{
				(type === 'select' && field === 'birth')
				&& <div className={cn('birth-wrap', { success: valid && check, danger: !valid && check })}>
					<div>
						<select
							value={value.dob_day}
							className="form-control select"
							onChange={handleChangeBirth('dob_day')}>
							{dayArray().map((option, i) => renderOptions(option, i))}
						</select>
					</div>
					<div>
						<select
							value={value.dob_month}
							className="form-control select"
							onChange={handleChangeBirth('dob_month')}>
							{monthArray().map((option, i) => renderOptions(option, i))}
						</select>
					</div>
					<div>
						<select
							value={value.dob_year}
							className="form-control select"
							onChange={handleChangeBirth('dob_year')}>
							{yearArray().map((option, i) => renderOptions(option, i))}
						</select>
					</div>
				</div>
			}
			{
				type === 'textarea'
				&& <textarea
					rows="5"
					style={{ resize: 'none' }}
					value={value}
					onChange={handleChangeInput}
					className={cn('form-control text-field')}
					ref={ref => input = ref} />
			}
			{
				type === 'message-area'
				&& <textarea
					style={{ resize: 'none' }}
					value={value}
					onChange={handleChangeInput}
					className={cn('form-control text-field message-area')}
					ref={ref => input = ref} />
			}
			{
				type === 'multiselect'
				&& <div className="wrap-blocks">
					{options.map((option, i) => <div key={i}>{renderBlocks(option, i)}</div>)}
				</div>
			}
			{
				type === 'select-multiple'
				&& <select
					value={(any && !value) ? '0' : value}
					multiple
					style={{ height: 'auto' }}
					className="form-control select select-multiple"
					onChange={handleChangeMultiple}>
					{options.map((option, i) => renderOptions(option, i))}
				</select>
			}
			{
				type === 'singleselect'
				&& <div className="wrap-blocks">
					{options.map((option, i) => <div key={i}>{renderSingleselect(option, i)}</div>)}
				</div>
			}
		</div>
		{
			(icon && !accordion)
			&& <div className={cn('icon-input', { success: valid && check, danger: !valid && check })}>
				{
					(valid && check && !loader)
					&& <i className="fas fa-check"></i>
				}
				{
					(!valid && check && !loader)
					&& <i className="fas fa-times"></i>
				}
				{/*
                                (!check && (loader && !lostConnection))
                                &&  <span>&nbsp;</span>
                            */}
				{
					(loader && !lostConnection)
					&& <i className="fas fa-spinner fa-spin loader text-info"></i>
				}
				{
					(lostConnection && loader)
					&& <i className="fas fa-ban text-danger"></i>
				}
			</div>
		}
		<style jsx>{`
					.message-area{
					border-top-left-radius: 0;
					border-top-right-radius: 0;
					border-bottom-right-radius: 9px;
					border-bottom-left-radius: 9px;
					}

					.asterix {
						cursor: pointer;
					}
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
                		width: ${100 / row}%;
                		margin-bottom: 5px;
                		text-align: center;
                	}
                    .wrap-blocks > div {
                        padding-right: ${row == 4 ? `5px` : `0px`};
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
										font-family: "Open Sans", Arial; 
									}
									.select option {
										font-family: "Open Sans", Arial; 
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
                        padding-left: ${!icon ? 0 : 15}px;
                        font-weight: bold;
                	}
                    .loader {

                    }
                    @media (max-width: 768px) {
                        .wrap-input {
                            flex-wrap: wrap;
                        }
                        .input {
                            width: 58%;
                        }
                        .label-input {
                            width: 30%;
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
                            padding-right: 0px;
                		}
                		.wrap-blocks > div:nth-child(odd) {
	                		padding-right: 0px;
	                	}
	                	.label-input {
	                		align-self: start;
	                	}
                	}
                	.icon-input {
                		font-size: 20px;
                		width: 10%;
                        text-align: center;
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
}

export default InputInline