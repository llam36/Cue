export default function decode(doc) {
    return {
        name: doc["name"],
        phoneNumber: doc["phoneNumber"],
        tableSize: doc["tableSize"],
        seatingPreference: doc["seatingPreference"],
        position: doc["position"],
        goalTime: doc["goalTime"]
    }
}
