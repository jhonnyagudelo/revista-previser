export function capitalize(str: string | null | undefined): string {
  if (!str) return "";
  // Asegura que todo esté en minúsculas
  const lower = str.toLowerCase();

  // Devuelve la primera letra en mayúscula + el resto de la palabra
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
