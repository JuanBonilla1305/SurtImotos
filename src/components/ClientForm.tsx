type ClientFormValues = {
  name?: string;
  document?: string | null;
  phone?: string | null;
  address?: string | null;
  email?: string | null;
};

export default function ClientForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: ClientFormValues;
}) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div className="space-y-1">
        <label className="panel-label">Nombre completo *</label>
        <input
          name="name"
          required
          defaultValue={defaultValues?.name}
          className="panel-input"
        />
      </div>

      <div className="space-y-1">
        <label className="panel-label">Cédula</label>
        <input
          name="document"
          defaultValue={defaultValues?.document ?? ""}
          className="panel-input"
        />
      </div>

      <div className="space-y-1">
        <label className="panel-label">Teléfono</label>
        <input
          name="phone"
          defaultValue={defaultValues?.phone ?? ""}
          className="panel-input"
        />
      </div>

      <div className="space-y-1">
        <label className="panel-label">Dirección</label>
        <input
          name="address"
          defaultValue={defaultValues?.address ?? ""}
          className="panel-input"
        />
      </div>

      <div className="space-y-1">
        <label className="panel-label">Email</label>
        <input
          name="email"
          type="email"
          defaultValue={defaultValues?.email ?? ""}
          className="panel-input"
        />
      </div>

      <button type="submit" className="panel-btn-primary">
        Guardar
      </button>
    </form>
  );
}
