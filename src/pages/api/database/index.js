import { init, Ditto } from "@dittolive/ditto"

let ditto
export async function connectDB(path) {

    await init()
    const identity = { type: 'onlinePlayground', appID: '7c0220a4-1752-4685-a09d-767a7a109587', token: '251280c8-dcf2-464c-aad0-e0d47b520b50' }
    ditto = new Ditto(identity, path)
    ditto.startSync()
    // document.cookie = ditto

    return ditto
    // if (ditto == null) {
    //     console.log("DITTO INSTANCE IS NULL")
    //     await init()
    //     const identity = { type: 'onlinePlayground', appID: '7c0220a4-1752-4685-a09d-767a7a109587', token: '251280c8-dcf2-464c-aad0-e0d47b520b50' }
    //     ditto = new Ditto(identity)
    //     ditto.startSync()
    // }
    // else {
    //     console.log("DITTO INSTANCE IS NOT NULL")
    // }
    // return ditto
}