import type { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "./FormField";
import type { AiSuggestion, FormValues } from "../../lib/schema";

type Props = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  values: FormValues;
  suggestion: AiSuggestion;
  onApplyField: (key: keyof FormValues) => void;
  onAcceptAll: () => void;
};

export default function StructuredForm({
  register,
  errors,
  values,
  suggestion,
  onApplyField,
  onAcceptAll,
}: Props) {
  const hasAnySuggestion =
    suggestion.category !== undefined ||
    suggestion.guests !== undefined ||
    suggestion.budget !== undefined ||
    suggestion.vibe !== undefined;

  const showCategoryBadge =
    suggestion.category !== undefined && suggestion.category !== values.category;

  const showGuestsBadge =
    suggestion.guests !== undefined && suggestion.guests !== values.guests;

  const showBudgetBadge =
    suggestion.budget !== undefined && suggestion.budget !== values.budget;

  const showVibeBadge =
    suggestion.vibe !== undefined && suggestion.vibe !== values.vibe;

  return (
    <div className="glass-card">
      <div className="panel-header">
        <div className="panel-title">
          <span className="icon">📋</span>
          <h2>Structured Form</h2>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={onAcceptAll}
          disabled={!hasAnySuggestion}
        >
          ✅ Accept All
        </button>
      </div>

      <div>
        {/* Category */}
        <FormField
          label="Event Category"
          value={values.category ?? ""}
          placeholder="Wedding / Birthday / Corporate / Conference / Other"
          showSuggestedBadge={showCategoryBadge}
          suggestedText={
            suggestion.category !== undefined
              ? `AI suggests: ${String(suggestion.category)}`
              : ""
          }
          onChange={() => { }}
          onApply={() => onApplyField("category")}
          disableApply={!showCategoryBadge}
        />
        <input
          style={{ display: "none" }}
          {...register("category")}
          readOnly
        />
        {errors.category ? (
          <p className="error-text">{errors.category.message as string}</p>
        ) : null}

        {/* Guests */}
        <FormField
          label="Estimated Guest Count"
          value={values.guests?.toString() ?? ""}
          placeholder="e.g., 150"
          inputMode="numeric"
          showSuggestedBadge={showGuestsBadge}
          suggestedText={
            suggestion.guests !== undefined ? `AI suggests: ${String(suggestion.guests)}` : ""
          }
          onChange={() => { }}
          onApply={() => onApplyField("guests")}
          disableApply={!showGuestsBadge}
        />
        <input
          style={{ display: "none" }}
          {...register("guests", { valueAsNumber: true })}
          readOnly
        />
        {errors.guests ? (
          <p className="error-text">{errors.guests.message as string}</p>
        ) : null}

        {/* Budget */}
        <FormField
          label="Budget Level"
          value={values.budget ?? ""}
          placeholder="Low / Medium / High"
          showSuggestedBadge={showBudgetBadge}
          suggestedText={
            suggestion.budget !== undefined ? `AI suggests: ${String(suggestion.budget)}` : ""
          }
          onChange={() => { }}
          onApply={() => onApplyField("budget")}
          disableApply={!showBudgetBadge}
        />
        <input
          style={{ display: "none" }}
          {...register("budget")}
          readOnly
        />
        {errors.budget ? (
          <p className="error-text">{errors.budget.message as string}</p>
        ) : null}

        {/* Vibe */}
        <FormField
          label="Primary Vibe"
          value={values.vibe ?? ""}
          placeholder="e.g., Elegant"
          showSuggestedBadge={showVibeBadge}
          suggestedText={
            suggestion.vibe !== undefined ? `AI suggests: ${String(suggestion.vibe)}` : ""
          }
          onChange={() => { }}
          onApply={() => onApplyField("vibe")}
          disableApply={!showVibeBadge}
        />
        <input
          style={{ display: "none" }}
          {...register("vibe")}
          readOnly
        />
        {errors.vibe ? (
          <p className="error-text">{errors.vibe.message as string}</p>
        ) : null}
      </div>
    </div>
  );
}