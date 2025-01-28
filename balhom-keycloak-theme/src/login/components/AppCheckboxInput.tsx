import "./AppCheckboxInput.css";

interface Props {
    id: string;
    name: string;
    tabIndex: number;
    text: string;
    defaultChecked: boolean;
}

const AppCheckboxInput: React.FC<Props> = ({
    id,
    name,
    tabIndex,
    text,
    defaultChecked,
}: Props) => {
    return (
        <label className="app-checkbox-input">
            <input
                id={id}
                name={name}
                tabIndex={tabIndex}
                type="checkbox"
                defaultChecked={defaultChecked}
            />{" "}
            {text}
        </label>
    );
};

export default AppCheckboxInput;
