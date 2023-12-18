const { fb } = require("../db/firebaseConfig")
const fieldValue = require('firebase-admin').firestore.FieldValue;

const getEmptySpaces = async (req, res) => {

    const lot = "lot_" + req.params.lotid
    const zone = "zone_" + req.params.zoneid

    try {
        const doc = await fb.collection(lot).doc(zone).get();

        if (doc.exists) {
            // console.log(doc)
            res.status(200).json(doc._fieldsProto.empty.integerValue)
        }
        else {
            // console.log("data not here")
            res.status(400).json({ error: "No doc found" })
        }
    }
    catch (err) {
        // console.log("errpr")
        res.status(500).json({ error: `Error executing query: ${err}` })
    }
}

const updateEmptySpaces = async (req, res) => {

    const lot = "lot_" + req.params.lotid
    const zone = "zone_" + req.params.zoneid
    const empty = req.body.empty

    try{
        const doc = fb.collection(lot).doc(zone);

        doc.update({
          empty: empty
        });
        res.status(200).json()
    }
    catch(err){
        res.status(500).json({ error: `Error executing query: ${err}` })
    }
}

const incEmptySpaces = async (req, res) => {

    const lot = "lot_" + req.params.lotid
    const zone = "zone_" + req.params.zoneid

    try{
        const doc = fb.collection(lot).doc(zone);

        await doc.update({
          empty: fieldValue.increment(1)
        });
        res.status(200).json()
    }
    catch(err){
        res.status(500).json({ error: `Error executing query: ${err}` })
    }
}

const decEmptySpaces = async (req, res) => {

    const lot = "lot_" + req.params.lotid
    const zone = "zone_" + req.params.zoneid

    try{
        const doc = fb.collection(lot).doc(zone);
        
        await doc.update({
          empty: fieldValue.increment(-1)
        })

        return res.status(200).json()
    }
    catch(err){
        res.status(500).json({ error: `Error executing query: ${err}` })
    }
}

module.exports = {
    getEmptySpaces,
    updateEmptySpaces,
    incEmptySpaces,
    decEmptySpaces
}
