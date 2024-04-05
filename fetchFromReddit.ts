import { $fetch } from "ofetch";
import type { RedditAPIResponse, RedditUserResponse } from "./types.reddit";

interface Author {
  name: string;
  url: string;
  iconURL?: string;
}

interface ParsedPost {
  id: string;
  title: string;
  author: Author;
  url: string;
  text?: string;
  imageURL?: string;
}

export default async (
  subreddit: string,
  count: number,
  after: string
): Promise<ParsedPost[]> => {
  const response: RedditAPIResponse | null = await $fetch(
    `https://reddit.com/r/${subreddit}.json?after=${after}&limit=${count}`
  ).catch(() => null);

  if (
    !response ||
    !response.kind ||
    response.kind !== "Listing" ||
    !response.data ||
    !response.data.children.length
  ) {
    return [];
  }

  const posts = response.data.children;

  const parsedPosts: ParsedPost[] = [];

  // If you get more posts than the limit, that means the first posts are rules etc. for the subreddit and they can be ignored
  for (let i = posts.length - count, len = posts.length; i < len; i++) {
    const { data: post } = posts[i];
    const authorURL = `https://reddit.com/user/${post.author}/about.json`;
    const { data: author }: RedditUserResponse = await $fetch(authorURL);

    const authorField: Author = { name: post.author, url: authorURL };

    if (author.snoovatar_img) authorField.iconURL = author.snoovatar_img;

    parsedPosts.push({
      id: post.name,
      author: authorField,
      title: post.title,
      text: post.selftext,
      url: `https://reddit.com${post.permalink}`,
      imageURL: post.url_overridden_by_dest,
    });
  }

  return parsedPosts;
};
