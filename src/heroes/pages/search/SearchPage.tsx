import { CustomJumbotron } from "@/components/ui/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/ui/custom/CustomBreadcrumbs";

export const SearchPage = () => {
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
        </>
    )
}

export default SearchPage;