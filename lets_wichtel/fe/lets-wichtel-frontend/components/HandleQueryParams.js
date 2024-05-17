export function SanitizeQuery(query) {
  return query.trim().replace(/ /g, "+");
}

export function DesanitizeQuery(query) {
  return query.replace(/\+/g, " ");
}
