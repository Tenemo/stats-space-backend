export type LaunchResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Launch[];
};

export type LaunchServiceProvider = {
    id: number;
    url: string;
    name: string;
    featured: boolean;
    type: string;
    country_code: string;
    abbrev: string;
    description: string;
    administrator: null | string;
    founding_year: string;
    launchers: string;
    spacecraft: string;
    parent: null | string;
    image_url: null | string;
    logo_url: null | string;
};

export type Launch = {
    id: string;
    url: string;
    slug: string;
    name: string;
    status: Status;
    last_updated: string;
    net: string;
    window_end: string;
    window_start: string;
    probability: number;
    holdreason: string;
    failreason: string;
    hashtag: string;
    launch_service_provider: Agency;
    rocket: Rocket;
    mission: Mission;
    pad: Pad;
    webcast_live: boolean;
    image: string;
    infographic: string;
    program: unknown[];
    orbital_launch_attempt_count: number;
    location_launch_attempt_count: number;
    pad_launch_attempt_count: number;
    agency_launch_attempt_count: number;
    orbital_launch_attempt_count_year: number;
    location_launch_attempt_count_year: number;
    pad_launch_attempt_count_year: number;
    agency_launch_attempt_count_year: number;
};

export type LaunchShort = {
    id: string;
    url: string;
    slug: string;
    name: string;
    status_abbrev: string;
    window_start: string;
    launch_service_provider_name: string;
    launch_service_provider_type: string;
    launch_service_provider_country_code: string;
    launch_service_provider_country: string;
    rocket_configuration_family: string;
    mission_name: string;
    mission_description: string;
    pad_url: string;
    pad_name: string;
    pad_wiki_url: string;
    pad_map_url: string;
    pad_location_name: string;
    pad_location_country_code: string;
    pad_location_country: string;
};

export type Status = {
    id: number;
    name: string;
    abbrev: string;
    description: string;
};

export type Agency = {
    id: number;
    url: string;
    name: string;
    type: string;
};

export type Rocket = {
    id: number;
    configuration: RocketConfiguration;
};

export type RocketConfiguration = {
    id: number;
    url: string;
    name: string;
    family: string;
    full_name: string;
    variant: string;
};

export type Mission = {
    id: number;
    name: string;
    description: string;
    launch_designator: string;
    type: string;
    orbit: Orbit;
};

export type Orbit = {
    id: number;
    name: string;
    abbrev: string;
};

export type Pad = {
    id: number;
    url: string;
    agency_id: number;
    name: string;
    info_url: string;
    wiki_url: string;
    map_url: string;
    latitude: string;
    longitude: string;
    location: Location;
    map_image: string;
    total_launch_count: number;
    orbital_launch_attempt_count: number;
};

export type Location = {
    id: number;
    url: string;
    name: string;
    country_code: string;
    map_image: string;
    total_launch_count: number;
    total_landing_count: number;
};
