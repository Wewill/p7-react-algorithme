export function sanitize(str: string): string {
  return str
    .trim() // Supprime les espaces en début et fin
    .toLowerCase() // Convertit en minuscules
    .replace(/[^a-z0-9]/g, "_") // Remplace les caractères non alphanumériques par "_"
    .replace(/_+/g, "_"); // Réduit les multiples "_" en un seul
}

export function capitalize(str: string): string {
  if (!str) return str; // Gérer les chaînes vides
  return str.charAt(0).toUpperCase() + str.slice(1);
}
