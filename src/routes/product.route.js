import express from 'express';
import { getAllProducts,
         getProductDetails,
         editProduct,
         deleteProduct,
         addNewProduct
} from '../controllers/product.controller.js';


const router = express.Router();

router.get('/', getAllProducts);
router.post('/create', addNewProduct);
router.get('/:id/details', getProductDetails);
router.put('/:id/edit', editProduct);
router.delete('/:id/delete', deleteProduct);

export default router;