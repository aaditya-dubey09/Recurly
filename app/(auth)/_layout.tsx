import { Stack, Redirect } from "expo-router";
import { useAuth } from '@clerk/expo';
import '@/global.css';

/**
 * Render an authentication-aware layout that gates child routes based on Clerk auth state.
 *
 * When authentication state is not yet loaded, nothing is rendered. If the user is signed in
 * the layout redirects to "/(tabs)". Otherwise it renders a navigation Stack with headers hidden.
 *
 * @returns `null` while auth is loading, a `Redirect` to "/(tabs)" if the user is signed in, or a `Stack` element with `headerShown: false` otherwise.
 */

export default function AuthLayout() {
    const { isSignedIn, isLoaded } = useAuth();

    // Wait for auth to load before rendering anything
    if (!isLoaded) {
        return null;
    }

    // Redirect to home if user is already signed in
    if (isSignedIn) {
        return <Redirect href="/(tabs)" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}