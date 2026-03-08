import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { extractEventDetails } from "./api/extract";
import { useDebounce } from "./hooks/useDebounce";

import {
  formSchema,
  type FormValues,
  type AiSuggestion,
  CATEGORY_OPTIONS,
  BUDGET_OPTIONS,
} from "./lib/schema";

import DescriptionPanel from "./api/components/DescriptionPanel";
import StructuredForm from "./api/components/StructuredForm";
import Toast from "./api/components/ui/Toast";

function App() {
  const [description, setDescription] = useState("");
  const debounced = useDebounce(description, 1500);

  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<AiSuggestion>({});
  const [toast, setToast] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: undefined,
      guests: undefined,
      budget: undefined,
      vibe: undefined,
    },
    mode: "onChange",
  });

  const values = form.watch();
  const { register, formState } = form;

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  // Call backend after 1.5s debounce
  useEffect(() => {
    const run = async () => {
      if (!debounced.trim()) {
        setSuggestion({});
        return;
      }

      setLoading(true);
      const res = await extractEventDetails(debounced);

      if (!res.ok || !res.suggestion) {
        setSuggestion({});
        showToast("Could not extract details");
        setLoading(false);
        return;
      }

      setSuggestion({
        category:
          res.suggestion.category &&
            CATEGORY_OPTIONS.includes(res.suggestion.category as any)
            ? (res.suggestion.category as any)
            : undefined,

        guests: res.suggestion.guests ?? undefined,

        budget:
          res.suggestion.budget &&
            BUDGET_OPTIONS.includes(res.suggestion.budget as any)
            ? (res.suggestion.budget as any)
            : undefined,

        vibe: res.suggestion.vibe ?? undefined,
      });

      setLoading(false);
    };

    run();
  }, [debounced]);

  // Apply one field from AI suggestion
  function applyField(key: keyof FormValues) {
    const v = suggestion[key];
    if (v === undefined) return;
    form.setValue(key, v as any, { shouldDirty: true, shouldValidate: true });
  }

  // Accept all fields from AI suggestion
  function acceptAll() {
    (Object.keys(suggestion) as (keyof FormValues)[]).forEach((k) => {
      const v = suggestion[k];
      if (v !== undefined) {
        form.setValue(k, v as any, { shouldDirty: true, shouldValidate: true });
      }
    });
  }

  return (
    <>
      {/* Decorative floating orbs */}
      <div className="floating-orb orb-1" />
      <div className="floating-orb orb-2" />
      <div className="floating-orb orb-3" />

      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="header-icon">✨</div>
          <h1>
            <span className="gradient-text">Smart Event Planner</span>
          </h1>
          <div className="accent-line" />
          <p className="header-subtitle">
            Describe your event in natural language — our AI will extract
            structured details like category, guest count, budget, and vibe.
          </p>
        </header>

        {/* Two-panel layout */}
        <div className="panels-grid">
          <DescriptionPanel
            description={description}
            onChange={setDescription}
            loading={loading}
          />

          <StructuredForm
            register={register}
            errors={formState.errors}
            values={values}
            suggestion={suggestion}
            onApplyField={applyField}
            onAcceptAll={acceptAll}
          />
        </div>
      </div>

      {toast ? <Toast message={toast} /> : null}
    </>
  );
}

export default App;
