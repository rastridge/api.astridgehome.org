const mysql = require('mysql2/promise')
const doDBQuery = require('_helpers/do-query')
const activityLog = require("_helpers/activity-log");

module.exports = {
		getAll,
		getCurrent,
		getOne,
    editOne,
    addOne,
    deleteOne,
    changeStatus
}

async function getAll() {

    const sql = `SELECT
									supporting_id,
									supporting_id as id,
									supporting_name,
									supporting_name as title,
									supporting_description,
									supporting_owner,
									supporting_category,
									supporting_url,
									supporting_secret,
									supporting_username,
									supporting_password,
									status,
									deleted,
									deleted_dt,
									created_dt,
									modified_dt,
									modified_dt as dt
                FROM
									supportingaccts
                WHERE
									deleted = 0
                ORDER BY
									id ASC`

    supportingApps = await doDBQuery(sql)
    return  supportingApps
}

async function getCurrent() {

	const sql = `SELECT
								supporting_id,
								supporting_id as id,
								supporting_name,
								supporting_name as title,
								supporting_description,
								supporting_owner,
								supporting_category,
								supporting_url,
								supporting_secret,
								supporting_username,
								supporting_password,
								status,
								deleted,
								deleted_dt,
								created_dt,
								modified_dt,
								modified_dt as dt
							FROM
								supportingaccts
							WHERE
								deleted = 0
								AND
								status = 1
							ORDER BY
								id ASC`

	supportingApps = await doDBQuery(sql)
	return  supportingApps
}

async function getOne(id) {

    const sql = `SELECT
									supporting_id,
									supporting_id as id,
									supporting_name,
									supporting_name as title,
									supporting_description,
									supporting_owner,
									supporting_category,
									supporting_url,
									supporting_secret,
									supporting_username,
									supporting_password
                FROM
                  supportingaccts
                WHERE
									deleted = 0
									AND
									supporting_id = ${id}`

    supportingApps = await doDBQuery(sql)

    return supportingApps[0]
}

async function editOne({
		supporting_name,
		supporting_description,
		supporting_url,
		supporting_owner,
		supporting_category,
		supporting_secret,
		supporting_username,
		supporting_password,
		id
		})
{
    const sql = `UPDATE supportingaccts SET
									supporting_name = ?,
									supporting_description = ?,
									supporting_url = ?,
									supporting_owner = ?,
									supporting_category = ?,
									supporting_secret = ?,
									supporting_username = ?,
									supporting_password = ?,
									modified_dt= NOW()
                WHERE supporting_id = ?`
    const inserts = []
    inserts.push(
			supporting_name,
			supporting_description,
			supporting_url,
			supporting_owner,
			supporting_category,
			supporting_secret,
			supporting_username,
			supporting_password,
			id
		)
    supportingApps = await doDBQuery(sql, inserts)
    return supportingApps
}

async function addOne({
	supporting_name,
	supporting_description,
	supporting_url,
	supporting_owner,
	supporting_category,
	supporting_secret,
	supporting_username,
	supporting_password
})
{
	activityLog('addOneservice', 'req.body=', {
		supporting_name,
		supporting_description,
		supporting_url,
		supporting_owner,
		supporting_category,
		supporting_secret,
		supporting_username,
		supporting_password
	})

		const sql = `INSERT INTO supportingaccts
									SET
									supporting_name = ?,
									supporting_description = ?,
									supporting_url = ?,
									supporting_owner = ?,
									supporting_category = ?,
									supporting_secret = ?,
									supporting_username = ?,
									supporting_password = ?,
									status = 1,
									deleted = 0,
									created_dt = NOW(),
									modified_dt = NOW()`
    var inserts = []
    inserts.push(
			supporting_name,
			supporting_description,
			supporting_url,
			supporting_owner,
			supporting_category,
			supporting_secret,
			supporting_username,
			supporting_password
				)
    supportingApps = await doDBQuery(sql, inserts)
    return supportingApps
}

async function deleteOne(id) {

    const sql = `UPDATE supportingaccts SET deleted = 1, deleted_dt= NOW() WHERE supporting_id = ` + id
    supportingApps = await doDBQuery(sql)
    return supportingApps
}

async function changeStatus({ id, status }) {
    const sql = `UPDATE supportingaccts SET status = "` + status + `" WHERE supporting_id = ` + id
    supportingApps = await doDBQuery(sql)
    return supportingApps
}
