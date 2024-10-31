import express from 'express';
import pool from '../db.js';
import { generateValidCombinations } from '../utils/generateCombinations.js';
import { saveCombinations } from '../service/combinationService.js';
import { ApiResponse } from '../model/response.js';

const router = express.Router();

router.post('/generate', async (req, res) => {
    const { items, length } = req.body;

    try {
        const [rows] = await pool.query(`SELECT name FROM items WHERE id IN (?)`, [items]);
        const itemNames = rows.map(row => row.name);

        if (!itemNames.length) {
            throw new Error("No items found for the provided IDs.");
        }

        const combinations = generateValidCombinations(itemNames, length);
        const savedCombinations = await saveCombinations(combinations);

        const response = new ApiResponse('success', 'Combinations generated successfully', savedCombinations);
        res.status(200).json(response);
    } catch (error) {
        const response = new ApiResponse('error', error.message);
        res.status(500).json(response);
    }
});

export default router;
