import { writeFile } from 'node:fs/promises';
import path from 'path';
import https from 'https';

import axios, { AxiosResponse } from 'axios';
import { promisify } from 'util';

import { LaunchResponse, Launch } from 'typings/space';

const request = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});

const sleep = promisify(setTimeout);

const DELAY = 240;

const savePartialData = async (
    launchData: Launch[],
    url: string,
): Promise<void> => {
    const now = new Date()
        .toISOString()
        .split('.')[0]
        .replace('T', '_')
        .replace(/:/g, '-');

    const offset = url.split('offset=')[1];
    const filename = `space_data_offset_${offset}_created_${now}.json`;
    await writeFile(
        path.join(__dirname, '/partial/', filename),
        JSON.stringify(
            {
                launchData,
            },
            null,
            4,
        ),
        'utf8',
    );
    console.log(`\nSaved partial data to: partial/${filename}`);
};

const getLaunchData = async (): Promise<Launch[]> => {
    let next: string | null =
        'https://ll.thespacedevs.com/2.2.0/launch/?limit=100&offset=0';
    let launchData: Launch[] = [];
    while (next !== null) {
        try {
            const response: AxiosResponse<LaunchResponse> =
                await request.get<LaunchResponse>(next);
            await savePartialData(response.data.results, next);
            next = response.data.next;
            launchData = launchData.concat(response.data.results);
            if (next) {
                console.log(`\nFetching next batch of launches from ${next}`);
                console.log(`Total launches fetched: ${launchData.length}.`);
                console.log(
                    `Launches left to fetch: ${
                        response.data.count - launchData.length
                    }`,
                );
                console.log(`Waiting ${DELAY} seconds...\n`);
                await sleep(DELAY * 1000);
            } else {
                console.log(
                    `\nFinished fetching all launches. Total launches fetched: ${launchData.length}.`,
                );
            }
        } catch (error) {
            console.error(`\nError fetching launch data from ${next ?? ''}\n`);
            throw error;
        }
    }
    return launchData;
};

void (async () => {
    const startTime = performance.now();

    const now = new Date()
        .toISOString()
        .split('.')[0]
        .replace('T', '_')
        .replace(/:/g, '-'); // current date + time without milliseconds

    const launchData = await getLaunchData();

    const filename = `space_data_created_${now}.json`;
    await writeFile(
        path.join(__dirname, '/output/', filename),
        JSON.stringify(
            {
                launchData,
            },
            null,
            4,
        ),
        'utf8',
    );
    console.log(`\nSpace data in JSON saved to: output/${filename}`);
    console.log(
        `\nTook ${((performance.now() - startTime) / 1000).toFixed(
            2,
        )} seconds in total.`,
    );
})();
