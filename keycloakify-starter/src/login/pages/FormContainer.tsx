import "./FormContainer.css";
import React from "react";

interface Props {
    children: React.ReactNode;
}

const FormContainer: React.FC<Props> = ({ children }) => {
    return (
        <div className="form-container-background">
            <div className="form-container-card">{children}</div>
        </div>
    );
};

export default FormContainer;