import bcrypt from "bcryptjs";
import { AppDataSource } from "../data-source.js";
import { User } from "../entities/User.js";

/**
 * Kullanım:
 *  npm run build && npm run seed:user -- --email=admin@example.com --password=123456 --name="Admin" --role=admin
 */

type Args = {
  email?: string;
  password?: string;
  name?: string;
  role?: string;
};

function parseArgs(argv: string[]): Args {
  const out: Args = {};
  for (const a of argv) {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) (out as any)[m[1]] = m[2];
  }
  return out;
}

(async () => {
  const args = parseArgs(process.argv.slice(2));
  const email = args.email?.trim();
  const password = args.password?.trim();
  const name = (args.name || "Kullanıcı").trim();
  const role = (args.role || "user").trim();

  if (!email || !password) {
    console.error("Gerekli: --email=... --password=... [--name=...] [--role=admin|user]");
    process.exit(1);
  }

  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(User);

  let user = await repo.findOne({ where: { email } });

  if (user) {
    // varsa şifre/isim/rol güncelle
    user.name = name;
    user.role = role;
    user.password = await bcrypt.hash(password, 10);
    await repo.save(user);
    console.log(`✔ Güncellendi: ${email} (role=${role})`);
  } else {
    user = repo.create({
      email,
      name,
      role,
      password: await bcrypt.hash(password, 10),
    });
    await repo.save(user);
    console.log(`✔ Oluşturuldu: ${email} (role=${role})`);
  }

  await AppDataSource.destroy();
  process.exit(0);
})().catch((err) => {
  console.error("Hata:", err);
  process.exit(1);
});
