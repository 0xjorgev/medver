
exports.up = function(knex, Promise) {
  	return Promise.all([
		knex.raw("INSERT INTO persons (name, last_name, nickname, img_url, birthday, email, gender_id, document_number, document_img_url, created_at, updated_at) SELECT first_name, last_name, nickname, img_url, birthday, email, gender_id, document_number, document_img_url, created_at, updated_at from players")
	])
};

exports.down = function(knex, Promise) {
  	return Promise.all([
		knex.raw("TRUNCATE TABLE ONLY persons")
	])
};
