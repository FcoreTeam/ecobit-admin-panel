import "./reset.scss";

interface InputInterface {
  type: "text" | "number" | "email" | "password" | "file";
  value: string;
  className: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isTextArea?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
}

const Input = ({
  type,
  value,
  className,
  onChange,
  isTextArea,
  placeholder,
  onFocus,
  onBlur,
  textareaRef,
}: InputInterface) => {
  return (
    <>
      {!isTextArea ? (
        <input
          type={type}
          value={value}
          className={className}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      ) : (
        <textarea
          value={value}
          className={className}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={textareaRef}
        />
      )}
    </>
  );
};
export default Input;
