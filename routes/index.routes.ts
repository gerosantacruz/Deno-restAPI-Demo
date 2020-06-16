import { Router  } from "https://deno.land/x/oak/mod.ts";

const router = new Router();


router.get('/', ({response}) => {
    response.body = 'Hello world from Denos software'
});

export default router;