import Client from '../models/Client';

exports.createClient = async (req, res, next) => {

    const client = new Client(req.body);
    try {
        const clientSaved = await client.save();
        res.json(clientSaved);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.getClients = async (req, res, next) => {
    try {
        const clients =  await Client.find();
        res.json(clients);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.getClientById = async (req, res, next) => {
    try {
        const client = await Client.findById(req.params.id);
        res.json(client);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.updateClientById = async (req, res, next) => {
    try {
        const client = await Client.findOneAndUpdate({_id: req.params.id}, req.body,{
            new:true            
        })
        res.json(client);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.deleteClientById = async (req, res, next) => {
    try {
        await Client.findOneAndDelete({_id: req.params.id});
        res.json('Client deleted successfully');
    } catch (error) {
        console.log(error);
        next();
    }
}