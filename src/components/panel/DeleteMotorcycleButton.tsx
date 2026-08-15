"use client";

export default function DeleteMotorcycleButton({ action }: { action: () => Promise<void> }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("¿Seguro que quieres eliminar esta moto? También se borrarán sus fotos.")) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="panel-btn-danger">
        Eliminar
      </button>
    </form>
  );
}
