import Kursi from "@/app/pilihKursi/kursi"
import { db } from "@/lib/prisma"

const page = async () => {
    const kursi = await db.masterKursi.findMany()
    return (
        <div>
            <Kursi kursi={kursi} />
        </div>
    )
}

export default page