export type LaunchResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Launch[];
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
    probability: null;
    holdreason: string;
    failreason: string;
    hashtag: null;
    launch_service_provider: Agency;
    rocket: Rocket;
    mission: Mission;
    pad: Pad;
    webcast_live: boolean;
    image: string;
    infographic: null;
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
    launch_designator: null;
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
    agency_id: null;
    name: string;
    info_url: null;
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
