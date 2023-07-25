import { connectDB } from "./index.js";
import io from 'socket.io-client'

let socket;

let ditto
let swapRequestsSubscription
let swapRequestsLiveQuery

const socketInitializer = async () => {
    await fetch('http://localhost:3000/api/socket');
    socket = io("http://localhost:3001")

    socket.on('connect', () => {
        console.log('Socket connected for swapRequest observer')
    })
}

export default async function handler(req, res) {
    await socketInitializer()

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
                    socket.emit("swap-change", res)
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
