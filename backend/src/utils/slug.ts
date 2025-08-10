import { Repository } from "typeorm";

// Türkçe karakterleri sadeleştir, boşlukları - yap
export function slugify(input: string): string {
  const map: Record<string, string> = {
    ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u",
    Ç: "c", Ğ: "g", I: "i", İ: "i", Ö: "o", Ş: "s", Ü: "u",
  };
  const replaced = input
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("");

  return replaced
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// repo üzerinde benzersiz slug üret
export async function uniqueSlug<T extends { id: number; slug: string }>(
  repo: Repository<T>,
  baseTitle: string,
  excludeId?: number
): Promise<string> {
  const base = slugify(baseTitle) || "icerik";
  let candidate = base;
  let i = 2;

  while (true) {
    const where: any = { slug: candidate };
    if (excludeId) where.id = (val: number) => val !== excludeId; // typeorm raw yoksa alttaki fallback:
    const exists = await repo.findOne({ where: { slug: candidate } as any });
    if (!exists || (excludeId && exists.id === excludeId)) {
      return candidate;
    }
    candidate = `${base}-${i++}`;
  }
}
