import React, { PureComponent, FormEvent, ChangeEvent } from 'react'
import slugify from 'slugify'
import DatePicker from 'react-datepicker'
import cx from 'classnames'
import { ReactComponent as SearchIcon } from '../../../img/search.svg'
import Help from './Help'
import Label from './Label'
import Row from './Row'
import InputGroup from './InputGroup'
import styles from './Input.module.scss'

interface InputProps {
    name: string
    label: string
    placeholder?: string
    required?: boolean
    help?: string
    tag?: string
    type?: string
    options?: string[]
    additionalComponent?: any
    value?: string
    onChange?(
        event:
            | FormEvent<HTMLInputElement>
            | ChangeEvent<HTMLInputElement>
            | ChangeEvent<HTMLSelectElement>
            | ChangeEvent<HTMLTextAreaElement>
    ): void
    rows?: number
    group?: any
    multiple?: boolean
    disabled?: boolean
    small?: boolean
}

interface InputState {
    isFocused: boolean
    dateCreated?: Date
}

export default class Input extends PureComponent<InputProps, InputState> {
    public state: InputState = {
        isFocused: false,
        dateCreated: new Date()
    }

    public inputWrapClasses() {
        if (this.props.type === 'search') {
            return styles.inputWrapSearch
        } else if (this.props.type === 'search' && this.state.isFocused) {
            return cx(styles.inputWrapSearch, styles.isFocused)
        } else if (this.state.isFocused && this.props.type !== 'search') {
            return cx(styles.inputWrap, styles.isFocused)
        } else {
            return styles.inputWrap
        }
    }

    public toggleFocus = () => {
        this.setState({ isFocused: !this.state.isFocused })
    }

    private handleDateChange = (date: Date) => {
        this.setState({ dateCreated: date })

        const event = {
            currentTarget: {
                name: 'dateCreated',
                value: date
            }
        }
        this.props.onChange!(event as any) // eslint-disable-line @typescript-eslint/no-non-null-assertion
    }

    public InputComponent = () => {
        const {
            type,
            options,
            group,
            name,
            required,
            onChange,
            value,
            disabled
            small
        } = this.props

        const wrapClass = this.inputWrapClasses()

        switch (type) {
            case 'select':
                return (
                    <div className={wrapClass}>
                        <select
                            id={name}
                            className={cx(styles.select, small && styles.small)}
                            name={name}
                            required={required}
                            onFocus={this.toggleFocus}
                            onBlur={this.toggleFocus}
                            onChange={onChange}
                            value={value}
                            disabled={disabled}
                        >
                            <option value="">---</option>
                            {options &&
                                options
                                    .sort((a, b) => a.localeCompare(b))
                                    .map((option: string, index: number) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                        </select>
                    </div>
                )
            case 'textarea':
                return (
                    <div className={wrapClass}>
                        <textarea
                            id={name}
                            className={cx(styles.input, small && styles.small)}
                            onFocus={this.toggleFocus}
                            onBlur={this.toggleFocus}
                            {...this.props}
                        />
                    </div>
                )
            case 'radio':
            case 'checkbox':
                return (
                    <div className={styles.radioGroup}>
                        {options &&
                            options.map((option: string, index: number) => (
                                <div className={styles.radioWrap} key={index}>
                                    <input
                                        className={styles.radio}
                                        id={slugify(option, {
                                            lower: true
                                        })}
                                        type={type}
                                        name={name}
                                        value={slugify(option, {
                                            lower: true
                                        })}
                                        disabled={disabled}
                                    />
                                    <label
                                        className={styles.radioLabel}
                                        htmlFor={slugify(option, {
                                            lower: true
                                        })}
                                    >
                                        {option}
                                    </label>
                                </div>
                            ))}
                    </div>
                )
            case 'date':
                return (
                    <div className={wrapClass}>
                        <DatePicker
                            selected={this.state.dateCreated}
                            onChange={this.handleDateChange}
                            className={cx(styles.input, small && styles.small)}
                            onFocus={this.toggleFocus}
                            onBlur={this.toggleFocus}
                            id={name}
                            name={name}
                            disabled={disabled}
                        />
                    </div>
                )
            default:
                return (
                    <div className={wrapClass}>
                        {group ? (
                            <InputGroup>
                                <input
                                    id={name}
                                    type={type || 'text'}
                                    className={cx(
                                        styles.input,
                                        small && styles.small
                                    )}
                                    onFocus={this.toggleFocus}
                                    onBlur={this.toggleFocus}
                                    {...this.props}
                                />
                                {group}
                            </InputGroup>
                        ) : (
                            <input
                                id={name}
                                type={type || 'text'}
                                className={cx(
                                    styles.input,
                                    small && styles.small
                                )}
                                onFocus={this.toggleFocus}
                                onBlur={this.toggleFocus}
                                {...this.props}
                            />
                        )}

                        {type === 'search' && <SearchIcon />}
                    </div>
                )
        }
    }

    public render() {
        const {
            name,
            label,
            required,
            help,
            additionalComponent,
            multiple,
            small
        } = this.props

        return (
            <Row small={small}>
                <Label htmlFor={name} required={required} small={small}>
                    {label}
                </Label>

                <this.InputComponent />

                {help && <Help>{help}</Help>}

                {multiple && 'hello'}

                {additionalComponent && additionalComponent}
            </Row>
        )
    }
}
