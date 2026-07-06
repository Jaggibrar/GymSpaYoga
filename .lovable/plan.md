
# GymSpaYoga Community Feed — Build Plan

This is a large feature. I'll ship it in **3 phases** so we get something real live quickly, then layer richness on top. Each phase is independently useful and testable.

---

## Phase 1 — Core Social Feed (MVP)

Goal: Users, trainers, and business owners can post text + images, like, comment, and follow. Feed is live in the app.

**New page:** `/community`

Includes:
- Feed layout (main column + right sidebar with suggested businesses/trainers)
- Tabs: **For You**, **Following**, **Trending**, **Businesses**, **Transformations**
- Create Post composer (text + up to 4 images, hashtags, optional business/trainer tag, location)
- Post card (author avatar + verified/business/trainer badge, timestamp, text, image gallery, like/comment/share/save, 3-dot menu)
- Inline comment thread (single-level replies, like on comments, edit/delete own)
- Follow / Unfollow button on author
- Save (bookmark) posts
- Profile pages: `/community/u/:userId` and `/community/b/:businessSlug` and `/community/t/:trainerSlug` with their posts, followers/following counts, bio
- "Community" link in header nav

**Uses existing auth.** Guests can read the feed and profiles; posting/liking/commenting/following requires sign-in (routes to Login).

---

## Phase 2 — Media, Discovery & Notifications

- Video uploads (single video per post, thumbnail, in-feed playback, full-screen)
- Hashtag pages: `/community/tag/:hashtag`
- Mentions with @autocomplete
- Threaded (nested) comment replies
- Notifications: like / comment / reply / follow / mention → integrated into existing `in_app_notifications`
- Discovery widgets: trending hashtags, top creators, nearby wellness posts (uses existing geolocation)
- Report post / report comment / block user
- Saved posts page: `/community/saved`

---

## Phase 3 — Moderation, Analytics & Growth Hooks

- Admin moderation panel inside existing AdminDashboard: reports queue, remove post/comment, suspend user, feature post, approve verification
- Business post analytics (impressions, engagement) on business dashboard
- Pinned posts on business/trainer profiles
- Architecture hooks (not built) for future: reactions beyond like, polls, stories, DMs, promoted posts, event RSVPs, groups

---

## Technical Details

### Database (Supabase, added in Phase 1 migration)

New tables in `public`:

- `community_posts` — `id`, `author_id` (auth.users), `author_type` ('user' | 'business' | 'trainer'), `business_id?`, `trainer_id?`, `content`, `hashtags text[]`, `location`, `visibility` ('public' | 'followers'), `like_count`, `comment_count`, `share_count`, `save_count`, `is_pinned`, `moderation_status` ('active' | 'hidden' | 'removed'), timestamps
- `community_post_media` — `id`, `post_id`, `media_type` ('image' | 'video'), `url`, `thumbnail_url`, `width`, `height`, `duration_seconds`, `sort_order`
- `community_comments` — `id`, `post_id`, `parent_comment_id?`, `author_id`, `content`, `like_count`, `moderation_status`, timestamps
- `community_likes` — `id`, `user_id`, `target_type` ('post' | 'comment'), `target_id`, `created_at` (unique on user+target)
- `community_follows` — `id`, `follower_id`, `target_type` ('user' | 'business' | 'trainer'), `target_id`, `created_at` (unique)
- `community_saves` — `id`, `user_id`, `post_id`, `created_at` (unique)
- `community_tags` (Phase 2) — `id`, `post_id`, `tagged_type`, `tagged_id`
- `community_reports` (Phase 2) — `id`, `reporter_id`, `target_type`, `target_id`, `reason`, `status`, `reviewed_by?`, timestamps

All tables get explicit `GRANT` statements and RLS:
- Public `SELECT` on posts/comments/media/likes/follows where `moderation_status = 'active'`
- Author-only `INSERT/UPDATE/DELETE` on own rows (`auth.uid() = author_id`)
- Admin override via existing `is_super_admin()`
- `service_role` full access

Counter columns kept in sync via `AFTER INSERT/DELETE` triggers on likes/comments/saves.

### Storage

Reuse existing public bucket `website-media` under a `community/` prefix, or create a new `community-media` public bucket if isolation is preferred. Images resized/optimized client-side before upload (existing `imageOptimization.ts`).

### Frontend

- New folder `src/pages/community/` (Feed, PostDetail, UserProfile, BusinessProfile, TrainerProfile, SavedPosts, HashtagPage)
- New folder `src/components/community/` (Composer, PostCard, MediaGallery, CommentThread, CommentInput, FollowButton, ProfileHeader, SuggestedSidebar, FeedTabs)
- Hooks: `useCommunityFeed`, `useCreatePost`, `useComments`, `useLike`, `useFollow`, `useSavePost`, `useProfile`
- React Query for pagination (infinite scroll, 10 posts/page — matches existing pagination memory)
- Uses existing dark cinematic emerald theme tokens (glass cards, 2xl radius, Sora/Inter). No new color system.

### Routing

Added to `src/nav-items.tsx` and `src/App.tsx`. Header gets a **Community** link.

---

## What I'll build now if you approve

**Phase 1 only** — schema migration + full MVP frontend (feed, composer, post card, comments, likes, follows, saves, profile pages). Enough to be a real, usable community.

Phase 2 and Phase 3 ship in follow-up turns after you've seen Phase 1 live.

## Questions before I start

1. **Author identity for businesses/trainers:** should a business owner post *as* their business page (posts show business logo + name), or always *as* their personal user with the business linked/tagged? LinkedIn allows both — LinkedIn-style (both) is what I'd recommend.
2. **Guest access:** guests can view feed & profiles read-only (matches your public-access memory) — confirm?
3. **Media bucket:** OK to add posts to existing `website-media` bucket under `community/`, or create a new `community-media` bucket?

Reply "go" (with any answers) and I'll start with the migration.
