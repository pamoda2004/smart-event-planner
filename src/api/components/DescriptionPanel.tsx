type Props = {
  description: string;
  onChange: (v: string) => void;
  loading: boolean;
};

export default function DescriptionPanel({ description, onChange, loading }: Props) {
  return (
    <div className="glass-card">
      <div className="panel-header">
        <div className="panel-title">
          <span className="icon">✍️</span>
          <h2>Description</h2>
        </div>
        {loading ? (
          <span className="extracting-badge">
            <span className="dot" />
            Extracting…
          </span>
        ) : null}
      </div>

      <textarea
        className="form-input form-textarea"
        placeholder="e.g. We're planning a corporate gala for 200 guests with a high budget and elegant vibe…"
        value={description}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="char-count">
        {description.length > 0 ? `${description.length} characters` : "Start typing…"}
      </div>
    </div>
  );
}