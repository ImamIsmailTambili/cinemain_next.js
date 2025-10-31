import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const jamTayangId = searchParams.get("jamTayangId");

        if (!jamTayangId) {
            return NextResponse.json({ error: "jamTayangId diperlukan" }, { status: 400 });
        }

        // Ambil semua kursi yang sudah dipesan di jam tayang ini
        const kursiTerpesan = await db.kursiTerpesan.findMany({
            where: {
                jamTayangId: Number(jamTayangId),
            },
            include: {
                masterKursi: true, // biar bisa dapet nomor kursinya
            },
        });

        // Ambil hanya nomor kursinya
        const bookedSeats = kursiTerpesan.map((k) => k.masterKursi.nomorKursi);

        return NextResponse.json({ bookedSeats });
    } catch (error) {
        console.error("Gagal mengambil kursi terpesan:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}
