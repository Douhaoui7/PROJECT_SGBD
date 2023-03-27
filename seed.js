require('dotenv').config();

const dbClient = require('./db');
const validators = require('./validator/article.val');

const seed = async () => {
    const db = await dbClient.db("storedb");

    console.log(db)

    const collections = ['article', 'boutique', 'client', 'commande'];

    const existingCollectionsCursor = await db.listCollections();
    const existingCollections = await existingCollectionsCursor.toArray();
    const names = existingCollections.map((c) => c.name);

    collections.forEach(async (c) => {
        try {
            if (names.includes(c)) {
                await db.dropCollection(c);
            }
            await db.createCollection(c, validators[c] ?? null);
        } catch (e) {
            console.error(c, e);
        }
    });

    // DTO = DATA TRANSFER OBJECT

    const boutiqueDtos = [
        {
            ref: "B001",
            nom: "Boutique de chaussure",
            adresse: "Rue du style",
            gerant: {
                ref: "G001",
                nom: "Jean dupon",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            ref: "B002",
            nom: "Boutique de telephone",
            adresse: "Rue de la RAM",
            gerant: {
                ref: "G002",
                nom: "Francois de la chastaigne",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ];

    const createdBoutique = await Promise.all(
        boutiqueDtos.map((data) => db.collection('boutique').insertOne(data))
    );

    const articleDtos = [
        {
            ref: "A001",
            boutiqueRef: "B001",
            nom: "Jordan",
            description: "Air Jordan 1 High",
            qteEnStock: "100",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            ref: "A002",
            boutiqueRef: "B001",
            nom: "Air force",
            description: "Air Force One",
            qteEnStock: "85",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            ref: "A003",
            boutiqueRef: "B001",
            nom: "Sebago",
            description: " la Sebago s'adapte à toutes les envies et s'adresse aussi bien aux femmes qu'aux hommes et aux enfants",
            qteEnStock: "8",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            ref: "A004",
            boutiqueRef: "B001",
            nom: "Ballerines",
            description: "Les ballerines sont très tendances pour les petites filles qui aiment généralement adopter le même look que leur maman.",
            qteEnStock: "94",
            createdAt: new Date(),
            updatedAt: new Date(),
        },


        {
            ref: "A005",
            boutiqueRef: "B002",
            nom: "TV Samsung.",
            description: "TV Samsung Neo QLED 85 pouce QE85QN900A 8K UHD Gris anthracite",
            qteEnStock: "578",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            ref: "A006",
            boutiqueRef: "B002",
            nom: "TV LG.",
            description: "TV LG OLED48C2 122 cm 4K UHD Smart TV Blanc Gris",
            qteEnStock: "587",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            ref: "A007",
            boutiqueRef: "B002",
            nom: "TV Philips.",
            description: "TV OLED Philips 55OLED887 139 cm Ambilight 4K UHD Android TV Métal chrome foncé",
            qteEnStock: "78",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            ref: "A008",
            boutiqueRef: "B002",
            nom: "TV Sony.",
            description: "TV OLED Sony XR-65A83K 65 pouce Bravia 4K UHD Smart TV Noir",
            qteEnStock: "98",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            ref: "A009",
            boutiqueRef: "B002",
            nom: "TV LG.",
            description: "TV QLED LG 50QLED820 127 cm 4K UHD Smart TV Aluminium brossé",
            qteEnStock: "57",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            ref: "A0010",
            boutiqueRef: "B002",
            nom: "TV Xiaomi.",
            description: "TV LED Xiaomi Mi A2 108 cm 4K UHD Android TV Noir",
            qteEnStock: "98",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    const createdArticle = await Promise.all(
        articleDtos.map((data) => db.collection('article').insertOne(data))
    );

    const clientDtos = [
        {
            ref: "C001",
            boutiqueRef: "B001",
            nom: "George",
            adresse: "Chaussée de Tournai 50",
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            ref: "C002",
            boutiqueRef: "B001",
            nom: "Mohamed",
            adresse: "Rue Saint Pierre 23",
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            ref: "C003",
            boutiqueRef: "B002",
            nom: "Samy",
            adresse: "Rue de la Gare 88",
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            ref: "C004",
            boutiqueRef: "B002",
            nom: "Luc",
            adresse: "Rue saint paul 45",
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            ref: "C005",
            boutiqueRef: "B002",
            nom: "Fred",
            adresse: "Avenue Royale 14",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    const createdClient = await Promise.all(
        clientDtos.map((data) => db.collection('client').insertOne(data))
    );


    const commandeDtos = [
        {
            ref: "I001",
            boutiqueRef: "B001",
            clientRef: "C001",
            articles: [{
                articleRef: "A001",
                qte: 1,
            },
            {
                articleRef: "A002",
                qte: 2,
            }, {
                articleRef: "A003",
                qte: 1,
            }],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            ref: "I002",
            boutiqueRef: "B001",
            clientRef: "C001",
            articles: [{
                articleRef: "A001",
                qte: 1,
            }],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            ref: "I003",
            boutiqueRef: "B001",
            clientRef: "C002",
            articles: [{
                articleRef: "A003",
                qte: 2,
            }],
            createdAt: new Date(),
            updatedAt: new Date(),
        },

        {
            ref: "I004",
            boutiqueRef: "B002",
            clientRef: "C003",
            articles: [{
                articleRef: "A005",
                qte: 2,
            }],
            createdAt: new Date(),
            updatedAt: new Date(),
        },

        {
            ref: "I005",
            boutiqueRef: "B002",
            clientRef: "C004",
            articles: [{
                articleRef: "A006",
                qte: 1,
            }],
            createdAt: new Date(),
            updatedAt: new Date(),
        },

        {
            ref: "I006",
            boutiqueRef: "B002",
            clientRef: "C005",
            articles: [{
                articleRef: "A007",
                qte: 2,
            },
            {
                articleRef: "A008",
                qte: 1,
            }],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    const createdCommande = await Promise.all(
        commandeDtos.map((data) => db.collection('commande').insertOne(data))
    );

    process.exit(0);
};

seed();
