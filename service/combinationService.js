import pool from '../db.js';

export async function saveCombinations(combinations) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const savedCombinations = [];
        for (const combination of combinations) {
            const [result] = await connection.query(
                `INSERT INTO combinations (combination_text) VALUES (?)`,
                [JSON.stringify(combination)]
            );

            if (result.insertId) {
                savedCombinations.push({ id: result.insertId, combination });
            } else {
                throw new Error("Failed to save combination.");
            }
        }

        await connection.commit();
        return savedCombinations;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

