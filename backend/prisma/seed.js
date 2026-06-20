const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('Hacker@117', 10);
  await prisma.admin.upsert({
    where: { email: 'christiandoh29@gmail.com' },
    update: { password: hash },
    create: { email: 'christiandoh29@gmail.com', password: hash, name: 'Admin BTP' },
  });

  const services = [
    { title: 'Construction neuve', description: 'Maisons individuelles, immeubles résidentiels et locaux commerciaux livrés clé en main avec des matériaux haut de gamme.', icon: 'fa-building', order: 1 },
    { title: 'Rénovation complète', description: 'Rénovation lourde ou légère, ravalement de façade, mise aux normes thermiques et acoustiques.', icon: 'fa-rotate-left', order: 2 },
    { title: 'Aménagement intérieur', description: 'Plâtrerie, carrelage, parquet, menuiserie sur mesure et agencement d\'espaces.', icon: 'fa-pencil-ruler', order: 3 },
    { title: 'Gros oeuvre & structure', description: 'Fondations, dalles, murs porteurs, charpente et couverture réalisés par des équipes qualifiées.', icon: 'fa-trowel-bricks', order: 4 },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { id: s.order },
      update: s,
      create: s,
    });
  }

  console.log('Seed completed');
}

main().catch(console.error).finally(() => prisma.$disconnect());
