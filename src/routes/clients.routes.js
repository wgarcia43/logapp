import { Router } from 'express';
const router = Router();

import * as clientsControllers from '../controllers/clientsController';
import { authjwt } from '../middlewares';

router.post('/', [authjwt.verifyToken, authjwt.isModerator], clientsControllers.createClient);

router.get('/', clientsControllers.getClients);

router.get('/:id', clientsControllers.getClientById);

router.put('/:id', [authjwt.verifyToken, authjwt.isAdmin], clientsControllers.updateClientById);

router.delete('/:id', [authjwt.verifyToken, authjwt.isAdmin], clientsControllers.deleteClientById);

export default router;