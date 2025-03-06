// import { NextRequest, NextResponse } from "next/server";
// import { getCurrentUser } from "./services/AuthService";


// type Role = keyof typeof roleBasedPrivateRoutes;

// const authRoutes = ["/login", "/register"];

// const roleBasedPrivateRoutes = {
//     student: [/^\/dashboard/, /^\/dashboard\/student\/booksessions/],
//     tutor: [
//         /^\/dashboard/,
//         /^\/dashboard\/tutor\/booking/,
//         /^\/dashboard\/tutor\/createsubject/,
//         /^\/dashboard\/tutor\/subjectList/,
//         /^\/dashboard\/tutor\/createBlog/,
//     ],
//     admin: [
//         /^\/dashboard/,
//         /^\/dashboard\/admin\/studentlist/,
//         /^\/dashboard\/admin\/managecategory/,
//         /^\/dashboard\/admin\/managesubject/,
//     ],
// };


// export const middleware = async (request: NextRequest) => {
//     const { pathname } = request.nextUrl

//     const userInfo = await getCurrentUser()

//     if (!userInfo) {
//         if (authRoutes.includes(pathname)) {
//             return NextResponse.next()
//         } else {
//             return NextResponse.redirect(
//                 new URL(
//                     `http://localhost:3000/login?redirectPath=${pathname}`,
//                     request.url
//                 )
//             );
//         }
//     }

//     if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
//         const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
//         if (routes.some((route) => pathname.match(route))) {
//             return NextResponse.next();
//         }
//     }
//     return NextResponse.redirect(new URL("/", request.url));

// }


// // that config works in that routes
// export const config = {
//     matcher: [
//         "/login", "/dashboard"
//     ]
// }

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  student: [/^\/dashboard(\/student\/booksessions)?$/],
  tutor: [
    /^\/dashboard$/,
    /^\/dashboard\/tutor\/booking$/,
    /^\/dashboard\/tutor\/createsubject$/,
    /^\/dashboard\/tutor\/subjectList$/,
    /^\/dashboard\/tutor\/createBlog$/,
  ],
  admin: [
    /^\/dashboard$/,
    /^\/dashboard\/admin\/studentlist$/,
    /^\/dashboard\/admin\/managecategory$/,
    /^\/dashboard\/admin\/managesubject$/,
  ],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Get the current user
  const userInfo = await getCurrentUser();

  // Public routes: Allow access without login
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // Redirect unauthenticated users to login
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }

  // Role-based access control
  if (userInfo.role && roleBasedPrivateRoutes[userInfo.role as Role]) {
    const allowedRoutes = roleBasedPrivateRoutes[userInfo.role as Role];

    // Check if the route matches any allowed route for the role
    if (allowedRoutes.some((route) => route.test(pathname))) {
      return NextResponse.next();
    }
  }

  // If no match, redirect unauthorized users to a 403 or home page
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
