const dbClient = require('../db');
const database = dbClient.db("storedb");
const collection = database.collection('client');
const validators = require('../validator/client.val');
const Joi = require('joi');
const { ObjectId } = require('mongodb');


exports.findAll = async (req, res) => {
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
}


exports.findOne = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            message: "l'id du client ne doit etre null",
        });
    }

    const pipeline = [
        { $match: { _id: new ObjectId(id) } },
        {
            '$lookup': {
                from: 'commande',
                localField: 'ref',
                foreignField: 'clientRef',
                as: 'commandes'
            }
        }];


    const data = await collection.aggregate(pipeline).toArray();

    if (!data) {
        res.status(404).json({
            message: `Aucun client liee a l'ID:${id}`,
        });
    }
    res.status(200).json(data);
}

exports.create = async (req, res) => {
    const schema = Joi.object({
        ref: Joi.string().min(2).required(),
        boutiqueRef: Joi.string().min(2).required(),
        nom: Joi.string().min(2).required(),
        adresse: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
    });

    const { body } = req;

    const { value, error } = schema.validate(body);

    if (error) {
        return res.status(400).json({ message: error });
    }

    const data = await collection.insertOne(value)
        .catch((err) => {
            return { error: `Impossible de sauvegarder ce client! ${err}` };
        });

    res.status(201).json(data);
};


exports.update = async (req, res) => {
    const schema = Joi.object({
        ref: Joi.string().min(2).required(),
        boutiqueRef: Joi.string().min(2).required(),
        nom: Joi.string().min(2).required(),
        adresse: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
    });

    const { body } = req;

    const { value, error } = schema.validate(body);

    if (error) {
        return res.status(400).json({ message: error });
    }

    const data = await collection.updateOne(value)
        .catch((err) => {
            return { error: `Impossible de mettre a jour ce client! ${err}` };
        });

    res.status(201).json(data);
};

exports.deleteOne = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            message: "l'id du client ne doit etre null",
        });
    }
    const { force } = req.query;

    if (parseInt(force, 10) === 1) {
        // suppression physique
        await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(204);
    }

    res.status(500).json({
        message: "Oups quelque chose s'est mal passée",
    });
}
