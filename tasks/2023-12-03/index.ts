export type Lokalizacja = { x: number; y: number; z: number; czas: number };
export type MapaCzasoprzestrzenna = (
  x: number,
  y: number,
  z: number,
  czas: number
) => number;

export function znajdzWorek(
  lokalizacje: Lokalizacja[],
  mapa: MapaCzasoprzestrzenna
): Lokalizacja | null {
  if (lokalizacje.length === 0) {
    return null;
  }

  const wyliczoneWspółrzędne = lokalizacje
    .filter(
      (l) =>
        l.czas > 0 &&
        l.x > 0 &&
        l.y > 0 &&
        l.z > 0 &&
        !Number.isNaN(mapa(l.x, l.y, l.z, l.czas))
    )
    .reduce(
      (a, b) =>
        mapa(a.x, a.y, a.z, a.czas) > mapa(b.x, b.y, b.z, b.czas) ? a : b,
      {} as Lokalizacja
    );

  return Object.keys(wyliczoneWspółrzędne).length === 0
    ? null
    : wyliczoneWspółrzędne;
}
