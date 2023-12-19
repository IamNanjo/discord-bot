import { $fetch } from "ofetch";
import type { RedditAPIResponse, RedditUserResponse } from "./types.reddit";

interface Author {
	name: string;
	url: string;
	iconURL?: string;
}

interface ParsedPost {
	title: string;
	author: Author;
	url: string;
	text?: string;
	imageURL?: string;
}

export default async (
	subreddit: string,
	count: number
): Promise<ParsedPost[]> => {
	const page = 1;

	const response: RedditAPIResponse = await $fetch(
		`https://reddit.com/r/${subreddit}.json?after=${page}`
	);

	if (
		!response.kind ||
		response.kind !== "Listing" ||
		!response.data ||
		!response.data.children.length
	) {
		return [];
	}

	const posts = response.data.children;

	const parsedPosts: ParsedPost[] = [];

	const iMax = posts.length > count ? count : posts.length;
	for (let i = 0; i < iMax; i++) {
		const { data: post } = posts[i];
		const authorURL = `https://reddit.com/user/${post.author}/about.json`;
		const { data: author }: RedditUserResponse = await $fetch(authorURL);

		const authorField: Author = { name: post.author, url: authorURL };

		if (author.snoovatar_img) authorField.iconURL = author.snoovatar_img;

		parsedPosts.push({
			author: authorField,
			title: post.title,
			text: post.selftext,
			url: `https://reddit.com${post.permalink}`,
			imageURL: post.url_overridden_by_dest
		});
	}

	return parsedPosts;
};
