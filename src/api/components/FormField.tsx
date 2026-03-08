import Badge from "./ui/Badge";

type FormFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  suggestedText?: string;
  showSuggestedBadge: boolean;
  onChange: (v: string) => void;
  onApply: () => void;
  disableApply: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

export default function FormField({
  label,
  value,
  placeholder,
  suggestedText,
  showSuggestedBadge,
  onChange,
  onApply,
  disableApply,
  inputMode,
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label className="form-field-label">
        {label}
        {showSuggestedBadge ? <Badge /> : null}
      </label>

      <div className="form-field-row">
        <input
          className="form-input"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          inputMode={inputMode}
        />

        <button
          type="button"
          className="btn-apply"
          onClick={onApply}
          disabled={disableApply}
        >
          Apply
        </button>
      </div>

      {suggestedText ? (
        <p className="suggestion-text">💡 {suggestedText}</p>
      ) : null}
    </div>
  );
}