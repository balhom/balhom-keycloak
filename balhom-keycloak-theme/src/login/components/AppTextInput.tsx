import "./AppTextInput.css";

interface Props {
  id: string;
  name: string;
  tabIndex?: number;
  defaultValue: string;
  autoComplete?: string;
}

const AppTextInput: React.FC<Props> = ({
  id,
  name,
  tabIndex,
  defaultValue,
  autoComplete,
}: Props) => {
  return (
    <div>
      <input
        id={id}
        name={name}
        tabIndex={tabIndex}
        className="app-text-input"
        type="text"
        defaultValue={defaultValue}
        autoFocus
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default AppTextInput;
