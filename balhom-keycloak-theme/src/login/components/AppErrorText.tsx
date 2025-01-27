import "./AppErrorText.css";

interface Props {
  text?: string;
}

const AppErrorText = ({ text }: Props) => {
  return <>{text && <p className="app-error-text">{text}</p>}</>;
};

export default AppErrorText;
