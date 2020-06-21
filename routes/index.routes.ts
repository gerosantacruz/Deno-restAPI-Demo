import { Router, Response } from "https://deno.land/x/oak/mod.ts";
import * as indexCtrl from "../controllers/index.controller.ts";

const router = new Router();


router.get('/', ({response}) => {
    response.body = 'Hello world from Denos software'
});

router.get('/users', indexCtrl.getUsers);
router.get('/users/:id', indexCtrl.getUser);
router.post('/user', indexCtrl.createUser);
router.put('/users/:id', indexCtrl.updateUser)


export default router;