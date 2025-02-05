import "./AppFormButton.css";

interface Props {
    id?: string;
    name?: string;
    text: string;
    isDisabled?: boolean;
    tabIndex?: number;
}

const AppFormInputButton: React.FC<Props> = ({
    id,
    name,
    text,
    isDisabled,
    tabIndex
}: Props) => {
    return (
        <input
            tabIndex={tabIndex}
            disabled={isDisabled}
            className="app-form-button"
            name={name}
            id={id}
            type="submit"
            value={text}
        />
    );
};

export default AppFormInputButton;
