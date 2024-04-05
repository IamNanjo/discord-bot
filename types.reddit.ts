/**
 * Subreddit API Responses
 */

export interface RedditAPIResponse {
  kind: string;
  data: RedditAPIResponseData;
}

export interface RedditAPIResponseData {
  after: string;
  dist: number;
  modhash: string;
  geo_filter: null;
  children: Child[];
  before: null;
}

export interface Child {
  kind: Kind;
  data: ChildData;
}

export interface ChildData {
  approved_at_utc: null;
  subreddit: Subreddit;
  selftext: string;
  author_fullname: string;
  saved: boolean;
  mod_reason_title: null;
  gilded: number;
  clicked: boolean;
  title: string;
  link_flair_richtext: any[];
  subreddit_name_prefixed: SubredditNamePrefixed;
  hidden: boolean;
  pwls: number;
  link_flair_css_class: null;
  downs: number;
  thumbnail_height: number;
  top_awarded_type: null;
  hide_score: boolean;
  name: string;
  quarantine: boolean;
  link_flair_text_color: FlairTextColor;
  upvote_ratio: number;
  author_flair_background_color: null;
  subreddit_type: SubredditType;
  ups: number;
  total_awards_received: number;
  media_embed: Gildings;
  thumbnail_width: number;
  author_flair_template_id: null | string;
  is_original_content: boolean;
  user_reports: any[];
  secure_media: null;
  is_reddit_media_domain: boolean;
  is_meta: boolean;
  category: null;
  secure_media_embed: Gildings;
  link_flair_text: null;
  can_mod_post: boolean;
  score: number;
  approved_by: null;
  is_created_from_ads_ui: boolean;
  author_premium: boolean;
  thumbnail: string;
  edited: boolean;
  author_flair_css_class: null | string;
  author_flair_richtext: any[];
  gildings: Gildings;
  post_hint: PostHint;
  content_categories: null;
  is_self: boolean;
  mod_note: null;
  created: number;
  link_flair_type: AuthorFlairType;
  wls: number;
  removed_by_category: null;
  banned_by: null;
  author_flair_type: AuthorFlairType;
  domain: Domain;
  allow_live_comments: boolean;
  selftext_html: null | string;
  likes: null;
  suggested_sort: null;
  banned_at_utc: null;
  url_overridden_by_dest: string;
  view_count: null;
  archived: boolean;
  no_follow: boolean;
  is_crosspostable: boolean;
  pinned: boolean;
  over_18: boolean;
  preview: DataPreview;
  all_awardings: any[];
  awarders: any[];
  media_only: boolean;
  can_gild: boolean;
  spoiler: boolean;
  locked: boolean;
  author_flair_text: null | string;
  treatment_tags: any[];
  visited: boolean;
  removed_by: null;
  num_reports: null;
  distinguished: null;
  subreddit_id: SubredditID;
  author_is_blocked: boolean;
  mod_reason_by: null;
  removal_reason: null;
  link_flair_background_color: string;
  id: string;
  is_robot_indexable: boolean;
  report_reasons: null;
  author: string;
  discussion_type: null;
  num_comments: number;
  send_replies: boolean;
  whitelist_status: WhitelistStatus;
  contest_mode: boolean;
  mod_reports: any[];
  author_patreon_flair: boolean;
  author_flair_text_color: FlairTextColor | null;
  permalink: string;
  parent_whitelist_status: WhitelistStatus;
  stickied: boolean;
  url: string;
  subreddit_subscribers: number;
  created_utc: number;
  num_crossposts: number;
  media: null;
  is_video: boolean;
  crosspost_parent_list?: CrosspostParentList[];
  crosspost_parent?: string;
}

export enum FlairTextColor {
  Dark = "dark",
}

export enum AuthorFlairType {
  Text = "text",
}

export interface CrosspostParentList {
  approved_at_utc: null;
  subreddit: string;
  selftext: string;
  author_fullname: string;
  saved: boolean;
  mod_reason_title: null;
  gilded: number;
  clicked: boolean;
  title: string;
  link_flair_richtext: LinkFlairRichtext[];
  subreddit_name_prefixed: string;
  hidden: boolean;
  pwls: number;
  link_flair_css_class: string;
  downs: number;
  thumbnail_height: number;
  top_awarded_type: null;
  hide_score: boolean;
  name: string;
  quarantine: boolean;
  link_flair_text_color: FlairTextColor;
  upvote_ratio: number;
  author_flair_background_color: null;
  ups: number;
  total_awards_received: number;
  media_embed: Gildings;
  thumbnail_width: number;
  author_flair_template_id: null;
  is_original_content: boolean;
  user_reports: any[];
  secure_media: null;
  is_reddit_media_domain: boolean;
  is_meta: boolean;
  category: null;
  secure_media_embed: Gildings;
  link_flair_text: string;
  can_mod_post: boolean;
  score: number;
  approved_by: null;
  is_created_from_ads_ui: boolean;
  author_premium: boolean;
  thumbnail: PostHint;
  edited: boolean;
  author_flair_css_class: null;
  author_flair_richtext: any[];
  gildings: Gildings;
  post_hint: PostHint;
  content_categories: null;
  is_self: boolean;
  subreddit_type: SubredditType;
  created: number;
  link_flair_type: string;
  wls: number;
  removed_by_category: null;
  banned_by: null;
  author_flair_type: AuthorFlairType;
  domain: Domain;
  allow_live_comments: boolean;
  selftext_html: null;
  likes: null;
  suggested_sort: null;
  banned_at_utc: null;
  url_overridden_by_dest: string;
  view_count: null;
  archived: boolean;
  no_follow: boolean;
  is_crosspostable: boolean;
  pinned: boolean;
  over_18: boolean;
  preview: CrosspostParentListPreview;
  all_awardings: any[];
  awarders: any[];
  media_only: boolean;
  link_flair_template_id: string;
  can_gild: boolean;
  spoiler: boolean;
  locked: boolean;
  author_flair_text: null;
  treatment_tags: any[];
  visited: boolean;
  removed_by: null;
  mod_note: null;
  distinguished: null;
  subreddit_id: string;
  author_is_blocked: boolean;
  mod_reason_by: null;
  num_reports: null;
  removal_reason: null;
  link_flair_background_color: string;
  id: string;
  is_robot_indexable: boolean;
  report_reasons: null;
  author: string;
  discussion_type: null;
  num_comments: number;
  send_replies: boolean;
  whitelist_status: WhitelistStatus;
  contest_mode: boolean;
  mod_reports: any[];
  author_patreon_flair: boolean;
  author_flair_text_color: null;
  permalink: string;
  parent_whitelist_status: WhitelistStatus;
  stickied: boolean;
  url: string;
  subreddit_subscribers: number;
  created_utc: number;
  num_crossposts: number;
  media: null;
  is_video: boolean;
}

export enum Domain {
  IReddIt = "i.redd.it",
}

export interface Gildings {}

export interface LinkFlairRichtext {
  e: AuthorFlairType;
  t: string;
}

export enum WhitelistStatus {
  AllAds = "all_ads",
}

export enum PostHint {
  Image = "image",
}

export interface CrosspostParentListPreview {
  images: PurpleImage[];
  enabled: boolean;
}

export interface PurpleImage {
  source: Source;
  resolutions: Source[];
  variants: Gildings;
  id: string;
}

export interface Source {
  url: string;
  width: number;
  height: number;
}

export enum SubredditType {
  Public = "public",
}

export interface DataPreview {
  images: FluffyImage[];
  enabled: boolean;
}

export interface FluffyImage {
  source: Source;
  resolutions: Source[];
  variants: Variants;
  id: string;
}

export interface Variants {
  gif?: GIF;
  mp4?: GIF;
}

export interface GIF {
  source: Source;
  resolutions: Source[];
}

export enum Subreddit {
  Softwaregore = "softwaregore",
}

export enum SubredditID {
  T52W2Ea = "t5_2w2ea",
}

export enum SubredditNamePrefixed {
  RSoftwaregore = "r/softwaregore",
}

export enum Kind {
  T3 = "t3",
}

/**
 * Users API Response
 */

export interface RedditUserResponse {
  kind: string;
  data: Data;
}

export interface Data {
  is_employee: boolean;
  is_friend: boolean;
  subreddit: Subreddit;
  snoovatar_size: number[];
  awardee_karma: number;
  id: string;
  verified: boolean;
  is_gold: boolean;
  is_mod: boolean;
  awarder_karma: number;
  has_verified_email: boolean;
  icon_img: string;
  hide_from_robots: boolean;
  link_karma: number;
  is_blocked: boolean;
  total_karma: number;
  pref_show_snoovatar: boolean;
  name: string;
  created: number;
  created_utc: number;
  snoovatar_img: string;
  comment_karma: number;
  accept_followers: boolean;
  has_subscribed: boolean;
}
