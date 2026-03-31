# PostHog Analytics Integration Report

## Summary

PostHog analytics (`posthog-react-native` v4.39.1) was integrated into the Recurly app. A singleton client is initialised from `expo-constants` (reading `posthogToken` and `posthogHost` from the `app.config.js` `extra` block), then exposed to the component tree via `PostHogProvider` in `app/_layout.tsx`. Screen views are tracked automatically via `posthog.screen()` on every route change. User identity is set on successful sign-in/sign-up and cleared on sign-out.

### Files modified

| File | Changes |
|------|---------|
| `lib/posthog.ts` | Created — PostHog singleton, reads config from `expo-constants` |
| `app/_layout.tsx` | Added `PostHogProvider` wrapper and automatic screen tracking |
| `app/(auth)/sign-in.tsx` | Added sign-in events and `posthog.identify()` on completion |
| `app/(auth)/sign-up.tsx` | Added sign-up events, `posthog.identify()` on completion, and `sign_up_failed` on error |
| `app/(tabs)/index.tsx` | Added subscription card expansion event |
| `app/(tabs)/settings.tsx` | Added sign-out event and `posthog.reset()` |
| `app/subscriptions/[id].tsx` | Added subscription details view event |

---

## Tracked Events

| Event name | Description | Source file |
|------------|-------------|-------------|
| `sign_in_submitted` | User tapped "Sign In" with valid credentials | `app/(auth)/sign-in.tsx` |
| `sign_in_completed` | Sign-in succeeded and session was established | `app/(auth)/sign-in.tsx` |
| `sign_in_failed` | Sign-in attempt returned an error | `app/(auth)/sign-in.tsx` |
| `sign_up_submitted` | User tapped "Create Account" with valid form data | `app/(auth)/sign-up.tsx` |
| `sign_up_failed` | Sign-up attempt returned an error (e.g. email already in use, invalid password) | `app/(auth)/sign-up.tsx` |
| `sign_up_email_verified` | User successfully entered the email verification code | `app/(auth)/sign-up.tsx` |
| `sign_up_completed` | Sign-up flow finished and session was established | `app/(auth)/sign-up.tsx` |
| `subscription_card_expanded` | User expanded a subscription card on the home screen (property: `subscription_id`) | `app/(tabs)/index.tsx` |
| `subscription_details_viewed` | User navigated to a subscription detail page (property: `subscription_id`) | `app/subscriptions/[id].tsx` |
| `sign_out_clicked` | User tapped "Sign Out" in Settings | `app/(tabs)/settings.tsx` |

---

## PostHog Dashboard & Insights

### Dashboard

| Name | Link |
|------|------|
| Analytics basics | https://eu.posthog.com/project/150432/dashboard/595649 |

### Insights

| # | Name | Type | Link |
|---|------|------|------|
| 1 | Sign-up conversion funnel | Funnel (ordered): `sign_up_submitted` → `sign_up_email_verified` → `sign_up_completed` | https://eu.posthog.com/project/150432/insights/lxbI7sqI |
| 2 | Sign-in success vs failure | Trend (daily): `sign_in_completed` vs `sign_in_failed` | https://eu.posthog.com/project/150432/insights/9z8hi1xc |
| 3 | Subscription engagement | Trend (daily): `subscription_card_expanded` + `subscription_details_viewed` | https://eu.posthog.com/project/150432/insights/C6K6TvCv |
| 4 | Daily sign-outs (churn signal) | Trend (daily): `sign_out_clicked` | https://eu.posthog.com/project/150432/insights/6A3WBYE5 |
| 5 | New user growth (weekly) | Trend (weekly bar): `sign_up_completed` | https://eu.posthog.com/project/150432/insights/yF7LSTm5 |
| 6 | Sign-up success vs failure | Trend (daily): `sign_up_completed` vs `sign_up_failed` | https://eu.posthog.com/project/150432/insights/c8wRry2Q |
