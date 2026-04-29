const BASE_URL = "https://rickandmortyapi.com/api";

export async function fetchCharacters() {
  const res = await fetch(`${BASE_URL}/character`);
  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}`);
  }
  return res.json();
}

export async function fetchCharacterById(id) {
  const res = await fetch(`${BASE_URL}/character/${id}`);
  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}`);
  }
  return res.json();
}