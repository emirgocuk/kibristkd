import { Repository, Not } from "typeorm";

type HasIdSlug = { id: number; slug?: string | null };

export function slugify(s: string): string {
  return s
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i").replace(/İ/g, "I")
    .replace(/ş/g, "s").replace(/Ş/g, "S")
    .replace(/ğ/g, "g").replace(/Ğ/g, "G")
    .replace(/ç/g, "c").replace(/Ç/g, "C")
    .replace(/ö/g, "o").replace(/Ö/g, "O")
    .replace(/ü/g, "u").replace(/Ü/g, "U")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export async function uniqueSlug<T extends HasIdSlug>(
  repo: Repository<T>,
  title: string,
  currentId?: number
): Promise<string> {
  const base = slugify(title);
  let candidate = base;
  let i = 1;

  while (true) {
    const where: any = currentId ? { slug: candidate, id: Not(currentId) } : { slug: candidate };
    const exists = await repo.findOne({ where });
    if (!exists) return candidate;
    i++;
    candidate = `${base}-${i}`;
  }
}
