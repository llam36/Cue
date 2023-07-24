import { connectDB } from "./database";

let ditto
export default async function handler(req, res) {
    if (ditto == null) {
        ditto = await connectDB();
    }

    let data = req.body

    switch (req.method) {
        case 'POST':
            try {
                const docID = await ditto.store.collection('swapRequests').upsert({ _id: data.sourceId, target: data.targetId })

                return res.status(200).json({ success: true, message: `Requested target customer ${data.targetId} to switch with customer ${docID}` })
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message })
            }
        default:
            return res.status(500).json({ success: false, message: "Only Post requests allowed" })
    }
}