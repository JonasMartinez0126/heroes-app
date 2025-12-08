import { createBrowserRouter } from "react-router"

import { lazy } from "react"

import { HeroPage } from "@/heroes/pages/hero/HeroPage"
import { AdminPage } from "@/admin/pages/AdminPage"
import { HeroesLayout } from "@/heroes/pages/layouts/HeroesLayout"
import { AdminLayout } from "@/admin/pages/layouts/AdminLayout"
import { HomePage } from "@/heroes/pages/home/HomePage"

const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage"));

export const appRouter = createBrowserRouter([

    {
        path: '/',
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'heroes/1',
                element: <HeroPage />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            }
        ]
    },
])