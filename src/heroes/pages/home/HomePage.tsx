import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "react-router";
import { useMemo } from "react";

import { CustomJumbotron } from "@/components/ui/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/ui/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/ui/custom/CustomBreadcrumbs";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";


export const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const activeTab = searchParams.get('tab') ?? 'all';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';
    const category = searchParams.get('category') ?? 'all';

    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains'];
        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab])

    const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);

    const { data: summary } = useHeroSummary();

    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron title="Superhero Universe" description="Discover, explore, and manage your favorite superheroes and villains" />

                <CustomBreadcrumbs currentPage="Super Heroes" />

                {/* Stats Dashboard */}
                <HeroStats />

                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all" onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'all');
                            prev.set('category', 'all');
                            prev.set('page', '1');
                            return prev;
                        })}>All Characters ({summary?.totalHeroes})</TabsTrigger>
                        <TabsTrigger value="favorites" className="flex items-center gap-2" onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'favorites');
                            return prev;
                        })}>
                            Favorites (3)
                        </TabsTrigger>
                        <TabsTrigger value="heroes" onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'heroes');
                            prev.set('category', 'hero');
                            prev.set('page', '1');
                            return prev;
                        })}>Heroes ({summary?.heroCount})</TabsTrigger>
                        <TabsTrigger value="villains" onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'villains');
                            prev.set('category', 'villain');
                            prev.set('page', '1');
                            return prev;
                        })}>Villains ({summary?.villainCount})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        {/* Character Grid */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="favorites">
                        {/* Character Grid */}
                        <HeroGrid heroes={[]} />
                    </TabsContent>
                    <TabsContent value="heroes">
                        {/* Character Grid */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="villains">
                        {/* Character Grid */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                </Tabs>

                {/* Pagination */}
                <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
            </>
        </>
    )
}
