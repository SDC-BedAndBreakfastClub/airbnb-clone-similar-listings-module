# airbnb-clone-similar-listings-module

> Project description

## Related Projects

  - https://github.com/BedandBreakfastClub/airbnb-clone-photo-module
  - https://github.com/BedandBreakfastClub/airbnb-clone-reviews-module.git
  - https://github.com/BedandBreakfastClub/airbnb-clone-booking-module.git
  - https://github.com/BedandBreakfastClub/airbnb-clone-similar-listings-module.git

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

From within the root directory:

> npm start

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node >=8.12.0
- etc

## Development

From within the root directory:

> npm run react-dev

## Seed Database

From within the root directory:

> npm run seed

### Installing Dependencies

From within the root directory:

> npm install

### API ROUTES

Direct a GET request to `/api/rooms/:listingId/similar_listings` to retrieve 12 listings similar to listing with `:listingId`

Direct a POST request to `/api/rooms/:listingId` with a listing object to add a listing to the database

Direct a PATCH request to `/api/rooms/:listingId` with altered data to edit the information of the current listing

Direct a DELETE request to `/api/rooms/:listingId` to delete the current listing from the database