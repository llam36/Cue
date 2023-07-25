import { connectDB } from "./index.js";
import io from 'socket.io-client'

let socket;

let ditto
let queueSubscription
let queueLiveQuery

const socketInitializer = async () => {
    await fetch('http://localhost:3000/api/socket');
    socket = io("http://localhost:3001")

    socket.on('connect', () => {
        console.log('Socket connected for queue observer')
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
                let size = req.body.size
                queueSubscription = await ditto.store.collection('reservations').find(`tableSize == ${size}`).subscribe()
                queueLiveQuery = await ditto.store.collection('reservations').find(`tableSize == ${size}`).observeLocal((docs, event) => {
                    let res = []
                    Object.values(docs).forEach(doc => {
                        res.push(doc.value)
                    });
                    socket.emit("queue-change", res)
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
