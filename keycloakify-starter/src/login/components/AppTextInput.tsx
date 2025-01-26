import AppErrorText from "./AppErrorText";
import "./AppTextInput.css";

interface Props {
  id: string;
  text: string;
  onTextChange: (value: string) => void;
  errorText?: string;
  maxLength?: number;
  placeholder?: string;
}

const AppTextInput: React.FC<Props> = ({
  id,
  text,
  onTextChange,
  errorText,
  maxLength,
  placeholder,
}: Props) => {
  return (
    <div>
      <input
        id={id}
        className="app-text-input"
        type="text"
        value={text}
        onChange={(e) => {
          if (maxLength && e.target.value.length > maxLength) {
            return;
          }
          onTextChange(e.target.value);
        }}
        placeholder={placeholder}
      />
      {maxLength && (
        <p className="app-text-input-char-count">
          {text.length}/{maxLength}
        </p>
      )}
      <AppErrorText text={errorText} />
    </div>
  );
};

export default AppTextInput;
