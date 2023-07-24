import { connectDB } from "./index.js";

let ditto
let queueSubscription
let queueLiveQuery

export default async function handler(req, res) {
    if (ditto == null) {
        ditto = await connectDB();
    }
    switch (req.method) {
        case 'POST':
            try {
                let size = req.body.size
                queueSubscription = await ditto.store.collection('reservations').find(`tableSize == ${size}`).subscribe()
                queueLiveQuery = await ditto.store.collection('reservations').find(`tableSize == ${size}`).observeLocal((docs, event) => {
                    let res = []
                    Object.values(docs).forEach(doc => {
                        res.push(doc.value)
                    });
                    console.log(`Queue length: ${res.length}`)
                })
                return res.status(200).json({ success: true, message: `Started observing queue` })
            } catch (err) {
                return res.status(500).json({ success: false, message: e.message })
            }
        default:
            return res.status(500).json({ success: false, message: "Only Post requests allowed" })
    }
}
