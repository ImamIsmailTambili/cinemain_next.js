import { db } from "@/lib/prisma";

export const getFilm = async (id: number) => {
    return await db.film.findUnique({
        where: { id },
        include: {
            tayangDi: {
                include: {
                    Cinema: { include: { daerah: true } },
                    TanggalTayang: { include: { jam: true } },
                },
            },
        },
    });
};
