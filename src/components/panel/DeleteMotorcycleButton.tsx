"use client";

export default function DeleteMotorcycleButton({
  action,
  hasSale,
}: {
  action: () => Promise<void>;
  hasSale: boolean;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        const message = hasSale
          ? "Esta moto tiene una venta registrada. Si la eliminas, también se borrará esa venta y desaparecerá del histórico y de los reportes de facturación. ¿Seguro que quieres continuar?"
          : "¿Seguro que quieres eliminar esta moto?";
        if (!confirm(message)) {
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
