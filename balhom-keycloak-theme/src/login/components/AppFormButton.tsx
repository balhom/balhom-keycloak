import "./AppFormButton.css";

interface Props {
  text: string;
}

const AppFormButton = ({ text }: Props) => {
  return (
    <button type="submit" className="app-form-button">
      {text}
    </button>
  );
};

export default AppFormButton;
