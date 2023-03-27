module.exports = {
    validator: {
        $jsonSchema: {
            required: ['ref' , 'boutiqueRef' , 'nom'],
            properties: {
                ref: {
                    bsonType: 'string'
                },
                boutiqueRef: {
                    bsonType: 'string'
                },
                nom: {
                    bsonType: 'string'
                },
                adresse: {
                    bsonType: 'string'
                },
                createdAt: {
                    bsonType: 'date'
                },
                updatedAt: {
                    bsonType: 'date'
                },
            }
        }
    }
}