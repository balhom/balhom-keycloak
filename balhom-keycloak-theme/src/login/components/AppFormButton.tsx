import "./AppFormButton.css";

interface Props {
    id?: string;
    name?: string;
    text: string;
    isDisabled?: boolean;
    tabIndex?: number;
    dataSitekey?: string;
    dataCallback?: () => void;
    dataAction?: string;
}

const AppFormButton: React.FC<Props> = ({
    id,
    name,
    text,
    isDisabled,
    tabIndex,
    dataSitekey,
    dataCallback,
    dataAction
}: Props) => {
    return (
        <button
            tabIndex={tabIndex}
            disabled={isDisabled}
            className="app-form-button"
            name={name}
            id={id}
            type="submit"
            value={text}
            data-sitekey={dataSitekey}
            data-callback={dataCallback}
            data-action={dataAction}
        />
    );
};

export default AppFormButton;
