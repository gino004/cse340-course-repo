import db from './db.js';

const getAllCategories = async () => {

	const query = `
        SELECT
            category_id,
            name
        FROM public.category
        ORDER BY name;
    `;

	const result = await db.query(query);

	return result.rows;
};

const getCategoryById = async (id) => {

	const query = `
        SELECT
            category_id,
            name
        FROM category
        WHERE category_id = $1;
    `;

	const queryParams = [id];

	const result = await db.query(query, queryParams);

	return result.rows.length > 0
		? result.rows[0]
		: null;
};

const getProjectsByCategoryId = async (categoryId) => {

	const query = `
        SELECT
            p.project_id,
            p.title
        FROM project p
        JOIN project_category pc
            ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.project_date;
    `;

	const queryParams = [categoryId];

	const result = await db.query(query, queryParams);

	return result.rows;
};

export { 
	getAllCategories, getCategoryById, getProjectsByCategoryId 
};