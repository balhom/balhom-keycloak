import "./AppTextInput.css";

interface Props {
    id: string;
    name: string;
    tabIndex?: number;
    value?: string;
    defaultValue?: string;
    autoComplete?: string;
    disabled?: boolean;
    pattern?: string;
    size?: number;
    maxLength?: number;
    minLength?: number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const AppTextInput: React.FC<Props> = ({
    id,
    name,
    tabIndex,
    value,
    defaultValue,
    autoComplete,
    disabled,
    pattern,
    size,
    maxLength,
    minLength,
    onChange,
    onBlur
}: Props) => {
    return (
        <div>
            <input
                id={id}
                name={name}
                tabIndex={tabIndex}
                className="app-text-input"
                type="text"
                value={value}
                defaultValue={defaultValue}
                autoFocus
                autoComplete={autoComplete}
                disabled={disabled}
                pattern={pattern}
                size={size}
                maxLength={maxLength}
                minLength={minLength}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    );
};

export default AppTextInput;
