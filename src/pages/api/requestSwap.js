import { init, Ditto } from "@dittolive/ditto"
import { calculatePosition, calculateGoalTime } from "./initialize";
import { connectDB } from "./database";

let ditto
export default async function handler(req, res) {
    if (ditto == null) {
        ditto = await connectDB("ditto/swapRequests");
    }

    let data = req.body

    switch (req.method) {
        case 'POST':
            try {
                const docID = await ditto.store.collection('swapRequests').upsert({ _id: data.sourceId, target: data.targetId })
                //await ditto.close();

                return res.status(200).json({ success: true, message: `Requested target customer ${data.targetId} to switch with customer ${docID}` })
            } catch (e) {
                //await ditto.close();
                return res.status(500).json({ success: false, message: e.message })
            }
        default:
            //await ditto.close();
            return res.status(500).json({ success: false, message: "Only Post requests allowed" })
    }
}