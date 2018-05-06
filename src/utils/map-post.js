module.exports = function mapPost(
	{ _id: id, title, body, user, ip },
	own = false,
) {
	const userFormatted = {
		id: user._id,
		username: user.username,
	};
	let post = {
		id,
		title,
		body,
		user: userFormatted,
	};
	if (own) {
		post.ip = ip;
	}
	return post;
};
