import { connectDB } from "./index.js";

let ditto
let swapRequestsSubscription
let swapRequestsLiveQuery


export default async function handler(req, res) {
    if (ditto == null) {
        ditto = await connectDB();
    }
    switch (req.method) {
        case 'POST':
            try {
                let id = req.body.targetId
                swapRequestsSubscription = await ditto.store.collection('swapRequests').find(`target == '${id}'`).subscribe()
                swapRequestsLiveQuery = await ditto.store.collection('swapRequests').find(`target == '${id}'`).observeLocal((docs, event) => {
                    let res = []
                    Object.values(docs).forEach(doc => {
                        res.push(doc.value)
                    });
                    console.log(`Swap requests length: ${res.length}`)
                })
                return res.status(200).json({ success: true, message: `Observed Ditto` })
            } catch (err) {
                return res.status(500).json({ success: false, message: e.message })
            }
        default:
            return res.status(500).json({ success: false, message: "Only Post requests allowed" })
    }
}
