import { Router } from "express";
import {
    atualizarCarros,
    cadastrarCarros,
    detalherCarros,
    excluirCarros,
    listarCarros,
} from "./controller/cars"

const router = Router();

router.get("/carros", listarCarros);
router.get("/carros/:id", detalherCarros);
router.post("/carros", cadastrarCarros);
router.put("/carros/:id", atualizarCarros);
router.delete("/carros/:id", excluirCarros);

export default router