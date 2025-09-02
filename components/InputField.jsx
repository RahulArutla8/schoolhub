export default function InputField({ label, error, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
}
