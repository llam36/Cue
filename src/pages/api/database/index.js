import { init, Ditto } from "@dittolive/ditto"

let ditto
export async function connectDB() {
    if (ditto == null) {
        await init()
        const identity = { type: 'onlinePlayground', appID: '7c0220a4-1752-4685-a09d-767a7a109587', token: '251280c8-dcf2-464c-aad0-e0d47b520b50' }
        ditto = new Ditto(identity)
        ditto.startSync()
    }
    return ditto
}