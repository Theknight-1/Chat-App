import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = ["/api/uploadthing"];

const isProtectedRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware((auth, req) => {
  if (!isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
