import { CustomJumbotron } from "@/components/ui/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/ui/custom/CustomBreadcrumbs";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import { HeroGrid } from "@/heroes/components/HeroGrid";

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name') ?? undefined;
    const strength = searchParams.get('strength') ?? undefined;

    const { data: heroes = [] } = useQuery({
        queryKey: ['search', { name, strength }],
        queryFn: () => searchHeroesAction({ name, strength }),
        staleTime: 1000 * 60 * 5
    });


    return (
        <>
            {/* Header */}
            <CustomJumbotron title="Search a Superhero or villain" description="Discover, explore, and manage your favorite superheroes and villains" />

            <CustomBreadcrumbs currentPage="Heroes Search" breadcrumbs={[
                { label: 'Home', to: '/' },
                { label: 'Home 1', to: '/' },
                { label: 'Home 2', to: '/' },
            ]} />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Controls */}
            <SearchControls />

            {/* */}
            <HeroGrid heroes={heroes} />
        </>
    )
}

export default SearchPage;