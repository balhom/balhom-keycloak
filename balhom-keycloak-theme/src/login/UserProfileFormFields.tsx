import "./UserProfileFormFields.css";
import { useEffect, Fragment } from "react";
import { assert } from "keycloakify/tools/assert";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import { useUserProfileForm, type FormAction, type FormFieldError } from "keycloakify/login/lib/useUserProfileForm";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { Attribute } from "keycloakify/login/KcContext";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import AppErrorText from "./components/AppErrorText";
import AuthPasswordInput from "./components/AuthPasswordInput";
import AppTextInput from "./components/AppTextInput";

export default function UserProfileFormFields(props: UserProfileFormFieldsProps<KcContext, I18n>) {
    const { kcContext, i18n, kcClsx, onIsFormSubmittableValueChange, doMakeUserConfirmPassword, BeforeField, AfterField } = props;

    const { advancedMsg } = i18n;

    const {
        formState: { formFieldStates, isFormSubmittable },
        dispatchFormAction
    } = useUserProfileForm({
        kcContext,
        i18n,
        doMakeUserConfirmPassword
    });

    useEffect(() => {
        onIsFormSubmittableValueChange(isFormSubmittable);
    }, [isFormSubmittable]);

    return (
        <>
            {formFieldStates
                .map(({ attribute, displayableErrors, valueOrValues }) => {
                    return (
                        <Fragment key={attribute.name}>
                            {BeforeField !== undefined && (
                                <BeforeField
                                    attribute={attribute}
                                    dispatchFormAction={dispatchFormAction}
                                    displayableErrors={displayableErrors}
                                    valueOrValues={valueOrValues}
                                    kcClsx={kcClsx}
                                    i18n={i18n}
                                />
                            )}
                            <div
                                className="user-page-form-group"
                                style={{
                                    display: attribute.name === "password-confirm" && !doMakeUserConfirmPassword ? "none" : undefined
                                }}
                            >
                                <div className="user-page-label">
                                    <label htmlFor={attribute.name}>{advancedMsg(attribute.displayName ?? "")}</label>
                                    {attribute.required && <> *</>}
                                </div>

                                <div className={kcClsx("kcInputWrapperClass")}>
                                    {attribute.annotations.inputHelperTextBefore !== undefined && (
                                        <div
                                            className={kcClsx("kcInputHelperTextBeforeClass")}
                                            id={`form-help-text-before-${attribute.name}`}
                                            aria-live="polite"
                                        >
                                            {advancedMsg(attribute.annotations.inputHelperTextBefore)}
                                        </div>
                                    )}
                                    <InputFieldByType
                                        attribute={attribute}
                                        valueOrValues={valueOrValues}
                                        displayableErrors={displayableErrors}
                                        dispatchFormAction={dispatchFormAction}
                                        kcClsx={kcClsx}
                                        i18n={i18n}
                                    />
                                    <FieldErrors attribute={attribute} displayableErrors={displayableErrors} fieldIndex={undefined} />
                                    {attribute.annotations.inputHelperTextAfter !== undefined && (
                                        <div
                                            className={kcClsx("kcInputHelperTextAfterClass")}
                                            id={`form-help-text-after-${attribute.name}`}
                                            aria-live="polite"
                                        >
                                            {advancedMsg(attribute.annotations.inputHelperTextAfter)}
                                        </div>
                                    )}

                                    {AfterField !== undefined && (
                                        <AfterField
                                            attribute={attribute}
                                            dispatchFormAction={dispatchFormAction}
                                            displayableErrors={displayableErrors}
                                            valueOrValues={valueOrValues}
                                            kcClsx={kcClsx}
                                            i18n={i18n}
                                        />
                                    )}
                                    {/* NOTE: Downloading of html5DataAnnotations scripts is done in the useUserProfileForm hook */}
                                </div>
                            </div>
                        </Fragment>
                    );
                })}
        </>
    );
}

function FieldErrors(props: { attribute: Attribute; displayableErrors: FormFieldError[]; fieldIndex: number | undefined }) {
    const { attribute, fieldIndex } = props;

    const displayableErrors = props.displayableErrors.filter(error => error.fieldIndex === fieldIndex);

    if (displayableErrors.length === 0) {
        return null;
    }

    return (
        <span id={`input-error-${attribute.name}${fieldIndex === undefined ? "" : `-${fieldIndex}`}`} aria-live="polite">
            {displayableErrors
                .filter(error => error.fieldIndex === fieldIndex)
                .map(({ errorMessage }, i) => (
                    <Fragment key={i}>
                        <AppErrorText text={errorMessage as unknown as string} />
                    </Fragment>
                ))}
        </span>
    );
}

type InputFieldByTypeProps = {
    attribute: Attribute;
    valueOrValues: string | string[];
    displayableErrors: FormFieldError[];
    dispatchFormAction: React.Dispatch<FormAction>;
    i18n: I18n;
    kcClsx: KcClsx;
};

function InputFieldByType(props: InputFieldByTypeProps) {
    const { attribute, valueOrValues, i18n, dispatchFormAction } = props;

    if (attribute.name === "password" || attribute.name === "password-confirm") {
        return (
            <AuthPasswordInput
                id={attribute.name}
                name={attribute.name}
                value={(() => {
                    assert(typeof valueOrValues === "string");

                    return valueOrValues as string;
                })()}
                i18n={i18n}
                passwordInputId={attribute.name}
                autoComplete={attribute.autocomplete}
                disabled={attribute.readOnly}
                pattern={attribute.annotations.inputTypePattern}
                size={attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`)}
                maxLength={
                    attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)
                }
                minLength={
                    attribute.annotations.inputTypeMinlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMinlength}`)
                }
                onChange={event =>
                    dispatchFormAction({
                        action: "update",
                        name: attribute.name,
                        valueOrValues: (() => {
                            return event.target.value;
                        })()
                    })
                }
                onBlur={() =>
                    dispatchFormAction({
                        action: "focus lost",
                        name: attribute.name,
                        fieldIndex: undefined
                    })
                }
            />
        );
    }

    return (
        <AppTextInput
            id={attribute.name}
            name={attribute.name}
            value={(() => {
                assert(typeof valueOrValues === "string");

                return valueOrValues as string;
            })()}
            autoComplete={attribute.autocomplete}
            disabled={attribute.readOnly}
            pattern={attribute.annotations.inputTypePattern}
            size={attribute.annotations.inputTypeSize === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeSize}`)}
            maxLength={attribute.annotations.inputTypeMaxlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMaxlength}`)}
            minLength={attribute.annotations.inputTypeMinlength === undefined ? undefined : parseInt(`${attribute.annotations.inputTypeMinlength}`)}
            onChange={event =>
                dispatchFormAction({
                    action: "update",
                    name: attribute.name,
                    valueOrValues: (() => {
                        return event.target.value;
                    })()
                })
            }
            onBlur={() =>
                dispatchFormAction({
                    action: "focus lost",
                    name: attribute.name,
                    fieldIndex: undefined
                })
            }
        />
    );
}
